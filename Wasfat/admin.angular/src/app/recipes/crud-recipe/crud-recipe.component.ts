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
  get instructionsFormArray(): FormArray { return this.formGroup.get('instructions') as FormArray; }  //Enables me to call this.instructions
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
    moveItemInArray(this.instructionsFormArray.controls, event.previousIndex, event.currentIndex);

    // Update the order field for each instruction
    this.instructionsFormArray.controls.forEach((control, index) => {
      control.get('order').setValue(index + 1);
    });
  }

  addInstruction() {
    this.instructionsFormArray.push(this.fb.group({
      id: [0], // New instructions have Zero ID, backend will assign a new ID
      order: [this.instructionsFormArray.length + 1],
      text: ['', Validators.required],
    }));
  }

  removeInstruction(index: number) {
    this.instructionsFormArray.removeAt(index);
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

    this.instructionsFormArray.clear();

    this.patchInstructionsFormArray(recipe);
  }

  private patchInstructionsFormArray(recipe: RecipeDto) {
    recipe.instructions.forEach(instruction => {
      this.instructionsFormArray.push(this.fb.group({
        id: [instruction.id],
        order: [instruction.order],
        text: [instruction.text, Validators.required]
      }));
    });
  }

  private update() {
    this.syncRecipeWithFormValues();

    this.recipeAdminSvc.update(this.id, this.recipe).subscribe(recipe => {
      console.log('Recipe updated successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }

  private create() {
    this.recipe = {} as RecipeDto;

    this.syncRecipeWithFormValues();

    this.recipeAdminSvc.create(this.recipe).subscribe(recipe => {
      console.log('Recipe created successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }

  private syncRecipeWithFormValues() {

    this.recipe.name = this.formGroup.value.name;
    this.recipe.description = this.formGroup.value.description;


    this.recipe.instructions = this.instructionsFormArray.controls.map(control => {
      return {
        id: control.value.id,
        order: control.value.order,
        text: control.value.text,
      } as InstructionDto;
    })
  }

  // #endregion
}
