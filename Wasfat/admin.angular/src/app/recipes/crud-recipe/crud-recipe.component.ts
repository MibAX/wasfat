import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';
import { InstructionDto } from '@proxy/instructions/models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-crud-recipe',
  templateUrl: './crud-recipe.component.html',
  styleUrls: ['./crud-recipe.component.scss']
})
export class CrudRecipeComponent implements OnInit {
  formGroup: FormGroup;
  id: number | null = null;
  isEditMode: boolean = false;
  recipe: RecipeDto | null = null;
  isDragEnabled = false;

  constructor(
    private recipeAdminSvc: RecipeAdminService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('CrudRecipeComponent > ngOnInit')
    this.buildForm();
    this.patchIfEditMode();
  }

  private buildForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      instructions: this.fb.array([]) // Initialize the form array for instructions
    });
  }

  get instructions(): FormArray {
    return this.formGroup.get('instructions') as FormArray;
  }

  addInstruction() {
    this.instructions.push(this.fb.group({
      id: [null], // New instructions have null ID
      text: ['', Validators.required],
      order: [this.instructions.length + 1]
    }));
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  private patchIfEditMode() {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam) return;
      this.setEditMode(idParam);
      this.fetchAndPatch();
    });
  }

  private setEditMode(idParam: string) {
    this.id = Number(idParam);
    this.isEditMode = true;
  }

  private fetchAndPatch() {
    this.recipeAdminSvc.get(this.id).subscribe(response => {
      this.recipe = response;
      this.patch(response);
    });
  }

  private patch(recipe: RecipeDto) {
    this.formGroup.patchValue({
      name: recipe.name,
      description: recipe.description
    });

    // Clear existing instructions before adding new ones
    this.instructions.clear();

    // Patch instructions into the form array - including the ID
    recipe.instructions.forEach(instr => {
      this.instructions.push(this.fb.group({
        id: [instr.id], // Include the ID for existing instructions
        text: [instr.text, Validators.required],
        order: [instr.order]
      }));
    });
  }


  cancel(): void {
    this.router.navigate(["/recipes/list"]);
  }

  save(): void {
    if (this.formGroup.invalid) {
      alert("Some fields are not valid.");
      return;
    }
    if (this.isEditMode) {
      this.update();
    } else {
      this.create();
    }
  }

  private update() {
    // Create a properly structured update object
    const recipeToUpdate: RecipeDto = {
      id: this.id,
      name: this.formGroup.get('name').value,
      description: this.formGroup.get('description').value,
      instructions: this.instructions.controls.map(control => {
        const instructionId = control.get('id').value;

        return {
          // For new instructions, send 0 instead of null to the backend
          id: instructionId !== null ? instructionId : 0,
          text: control.get('text').value,
          order: control.get('order').value
        } as InstructionDto;
      })
    };

    // Filter out any instructions with empty text
    recipeToUpdate.instructions = recipeToUpdate.instructions.filter(
      instruction => instruction.text && instruction.text.trim() !== ''
    );

    this.recipeAdminSvc.update(this.id, recipeToUpdate).subscribe(recipe => {
      console.log('Recipe updated successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }

  private create() {
    const newRecipe: RecipeDto = {
      name: this.formGroup.get('name').value,
      description: this.formGroup.get('description').value,
      instructions: this.instructions.controls.map((control, index) => {
        return {
          id: 0, // Use 0 instead of null for new instructions
          text: control.get('text').value,
          order: index + 1
        } as InstructionDto;
      })
    };

    // Filter out any instructions with empty text
    newRecipe.instructions = newRecipe.instructions.filter(
      instruction => instruction.text && instruction.text.trim() !== ''
    );

    this.recipeAdminSvc.create(newRecipe).subscribe(recipe => {
      console.log('Recipe created successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }

  drop(event: CdkDragDrop<string[]>) {

    if (!this.isDragEnabled) return;
    // Reorder the form array controls  
    moveItemInArray(this.instructions.controls, event.previousIndex, event.currentIndex);

    // Update the order field for each instruction
    this.instructions.controls.forEach((control, index) => {
      control.get('order').setValue(index + 1);
    });
  }

  toggleDragDrop() {
    this.isDragEnabled = !this.isDragEnabled;
  }
}
