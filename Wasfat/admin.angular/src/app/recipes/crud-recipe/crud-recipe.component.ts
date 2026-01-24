import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryAdminService } from '@proxy/categories';
import { LookupDto } from '@proxy/common';
import { IngredientAdminService } from '@proxy/ingredients';
import { InstructionDto } from '@proxy/instructions';
import { MeasurementUnit, measurementUnitOptions, RecipeIngredientDto } from '@proxy/recipe-ingredients';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';

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
  categoryLookups: LookupDto[];
  ingredientLookups: LookupDto[];
  measurementUnitOptions = measurementUnitOptions;
  suggestedIngredients$: Observable<LookupDto[]>;
  ingredientAutoCompleteControl: FormControl = new FormControl<string>('');

  get instructionsArray(): FormArray { return this.form.get('instructions') as FormArray };
  get categoryIds(): FormControl { return this.form.get('categoryIds') as FormControl };
  get recipeIngredientsArray(): FormArray { return this.form.get('recipeIngredients') as FormArray };

  constructor(
    private recipeAdminSvc: RecipeAdminService,
    private categoryAdminSvc: CategoryAdminService,
    private ingredientAdminSvc: IngredientAdminService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('CrudRecipeComponent > ngOnInit')
    this.buildForm();
    this.patchIfEditMode();
    this.getCategoryLookups();
    this.getIngredientLookups();
    this.initAutoCompleteStream();
  }

  private buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      instructions: this.fb.array([]),
      categoryIds: [[]],
      recipeIngredients: this.fb.array([])
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

    this.recipeIngredientsArray.clear();
    if (recipe.recipeIngredients?.length) {
      recipe.recipeIngredients.forEach(recipeIngredient => this.recipeIngredientsArray.push(this.buildRecipeIngredientGroup(recipeIngredient)))
    }
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

  private getCategoryLookups(): void {
    this.categoryAdminSvc.getLookups().subscribe(result => this.categoryLookups = result)
  }
  
  getCategoryLabel(categoryId: number): string {
    return this.categoryLookups.find(c => c.id === categoryId).displayName;
  }

  removeCategory(categoryId: number): void {
    const currentIds = this.categoryIds.value ?? [];
    const updatedIds = currentIds.filter(id => id !== categoryId);

    this.categoryIds.patchValue(updatedIds);
  }
  
  private buildRecipeIngredientGroup(recipeIngredient?: RecipeIngredientDto, ingredientId?: number): FormGroup {
    return this.fb.group({
      recipeId: [recipeIngredient?.recipeId ?? 0],
      ingredientId: [recipeIngredient?.ingredientId ?? ingredientId],
      quantity: [recipeIngredient?.quantity ?? 0],
      unit: [recipeIngredient?.unit ?? MeasurementUnit.Gram]
    })
  }

  private getIngredientLookups(): void {
    this.ingredientAdminSvc.getLookups().subscribe(result => this.ingredientLookups = result)
  }

  getIngredientLabel(ingredientId: number): string {
    return this.ingredientLookups.find(i => i.id === ingredientId).displayName;
  }

  private initAutoCompleteStream(): void {
    this.suggestedIngredients$ = this.ingredientAutoCompleteControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchKey => {
        const selectedIngredientsIds = this.recipeIngredientsArray.controls.map((ctrl: FormGroup) => ctrl.get('ingredientId')?.value);
        return this.ingredientAdminSvc.getAutoComplete(searchKey, selectedIngredientsIds);;
      })
    );
  }

  addRecipeIngredient(event: MatAutocompleteSelectedEvent): void {
    this.recipeIngredientsArray.push(this.buildRecipeIngredientGroup(null, event.option.value))
    this.ingredientAutoCompleteControl.setValue('');
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
      categories: [],
      categoryIds: formValue.categoryIds,
      recipeIngredients: formValue.recipeIngredients.map((recipeIngredient: RecipeIngredientDto) => ({
        recipeId: recipeIngredient.recipeId,
        ingredientId: recipeIngredient.ingredientId,
        quantity: recipeIngredient.quantity,
        unit: recipeIngredient.unit
      }))
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
