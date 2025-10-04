import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryAdminService } from '@proxy/categories';
import { LookupDto } from '@proxy/common';
import { InstructionDto } from '@proxy/instructions';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';

@Component({
  selector: 'app-crud-recipe',
  templateUrl: './crud-recipe.component.html',
  styleUrls: ['./crud-recipe.component.scss']
})
export class CrudRecipeComponent implements OnInit {
  form: FormGroup;
  recipeId: number | null = null;
  isEditMode: boolean = false;
  isDragEnabled: boolean = false;

  get instructionsArray(): FormArray { return this.form.get('instructions') as FormArray };

  categoryLookups: LookupDto[];
  get categoryIds(): FormControl { return this.form.get('categoryIds') as FormControl }

  constructor(
    private recipeAdminSvc: RecipeAdminService,
    private categoryAdminSvc: CategoryAdminService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('CrudRecipeComponent > ngOnInit')
    this.buildForm();
    this.patchIfEditMode();

    this.getCategoryLookups();
  }

  private buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      instructions: this.fb.array([]),
      categoryIds: [[]]
    });
  }

  private patchIfEditMode() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (!idParam) return;
    this.setEditMode(idParam);
    this.fetchAndPatch();
  };

  private setEditMode(idParam: string) {
    this.recipeId = Number(idParam);
    this.isEditMode = true;
  }

  private fetchAndPatch() {
    this.recipeAdminSvc.get(this.recipeId).subscribe(response => {
      this.patchForm(response);
    });
  }

  private patchForm(recipe: RecipeDto) {
    this.form.patchValue({
      name: recipe.name,
      description: recipe.description,
      categoryIds: recipe.categoryIds
    })

    this.instructionsArray.clear();
    if (recipe.instructions?.length) {
      recipe.instructions.forEach(instruction => this.instructionsArray.push(this.buildInstructionGroup(instruction)))
    }
  }

  private getCategoryLookups() {
    this.categoryAdminSvc.getLookups().subscribe(data => this.categoryLookups = data)
  }

  private buildInstructionGroup(instruction?: InstructionDto): FormGroup {
    return this.fb.group({
      id: [instruction?.id ?? 0],
      text: [instruction?.text ?? '', Validators.required],
      order: [instruction?.order ?? this.instructionsArray.length + 1, Validators.required],
    })
  }

  addInstruction(): void {
    this.instructionsArray.push(this.buildInstructionGroup());
  }

  removeInstruction(index: number): void {
    this.instructionsArray.removeAt(index);
    this.updateInstructionsOrder();
    if (this.instructionsArray.length < 2) {
      this.isDragEnabled = false;
    }
  }

  private updateInstructionsOrder(): void {
    this.instructionsArray.controls.forEach((instr, index) => {
      instr.patchValue({ order: index + 1 });
    });
  }

  toggleDragDrop(event: MatSlideToggleChange): void {
    this.isDragEnabled = event.checked;
  }

  drop(event: CdkDragDrop<unknown>): void {
    moveItemInArray(this.instructionsArray.controls, event.previousIndex, event.currentIndex);
    this.updateInstructionsOrder();
  }

  getCategoryLabel(categoryId: number): string {
    return this.categoryLookups.find(c => c.id === categoryId).displayName;
  }
  
  cancel(): void {
    this.router.navigate(["/recipes/list"]);
  }

  save(): void {
    if (this.form.invalid) {
      alert("some Fields are not valid.")
      return;
    }

    const recipe: RecipeDto = this.mapFormToRecipe()
    if (this.isEditMode) {
      this.update(recipe);
    } else {
      this.create(recipe);
    }
  }

  private mapFormToRecipe(): RecipeDto {
    const formValue = this.form.value;
    return {
      name: formValue.name,
      description: formValue.description,
      instructions: formValue.instructions.map((instr: InstructionDto) => ({
        id: instr.id,
        order: instr.order,
        text: instr.text,
      })),
      categoryIds: formValue.categoryIds
    };
  }

  private update(recipe: RecipeDto) {
    this.recipeAdminSvc.update(this.recipeId, recipe).subscribe((recipe) => {
      console.log('Recipe updated successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }

  private create(recipe: RecipeDto) {
    this.recipeAdminSvc.create(recipe).subscribe((recipe) => {
      console.log('Recipe created successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }
}
