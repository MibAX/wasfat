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
  get instructions(): FormArray { return this.formGroup.get('instructions') as FormArray; }  //Enables me to call this.instructions
  id: number | null = null;
  isEditMode: boolean = false;
  recipe: RecipeDto;// = {} as RecipeDto;
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

  private patchIfEditMode() {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam) return;
      this.setEditMode(idParam);
      this.fetchAndPatch();
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

  toggleDragDrop() {
    this.isDragEnabled = !this.isDragEnabled;
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

  addInstruction() {
    this.instructions.push(this.fb.group({
      id: 0, // New instructions: Back and will create a new instruction if ID is set to null
      text: ['', Validators.required],
      order: [this.instructions.length + 1]
    }));
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  // #region Sub Functions
  private setEditMode(idParam: string) {
    this.id = Number(idParam);
    this.isEditMode = true;
  }

  private fetchAndPatch() {
    this.recipeAdminSvc.get(this.id).subscribe(recipe => {
      this.recipe = recipe;
      this.patch(recipe);
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
    recipe.instructions.forEach(instruction => {
      this.instructions.push(this.fb.group({
        id: [instruction.id],
        text: [instruction.text, Validators.required],
        order: [instruction.order]
      }));
    });
  }

  private update() {
    this.recipe = this.formGroup.value;

    this.recipeAdminSvc.update(this.id, this.recipe).subscribe(recipe => {
      console.log('Recipe updated successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }

  private create() {
    this.recipe = this.formGroup.value;
    this.recipeAdminSvc.create(this.recipe).subscribe(recipe => {
      console.log('Recipe created successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }

  // #endregion

}
