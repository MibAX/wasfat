import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryAdminService } from '@proxy/categories';
import { LookupDto } from '@proxy/common';
import { IngredientAdminService } from '@proxy/ingredients';
import { InstructionDto } from '@proxy/instructions';
import { CrudRecipeIngredientDto, MeasurementUnit } from '@proxy/recipe-ingredients';
import { CrudRecipeDto, RecipeAdminService, RecipeDto } from '@proxy/recipes';
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

  ingredientAutocompleteControl = new FormControl<string>('', { nonNullable: true });
  suggestedIngredients$!: Observable<LookupDto[]>;
  
  measurementUnits = Object.keys(MeasurementUnit).filter(n => isNaN(Number(n))); 

  get instructionsArray(): FormArray { return this.form.get('instructions') as FormArray };
  
  get categoryIds(): FormControl { return this.form.get('categoryIds') as FormControl }
  
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
    this.initAutoCompleteStream();
    this.ingredientAdminSvc.getLookups().subscribe(response => this.ingredientLookups = response)
    console.log(Object.keys(MeasurementUnit))
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
  }

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
      categoryIds: recipe.categories.map(c => c.id)
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

  removeCategory(categoryId: number): void {
    this.categoryIds.setValue((this.categoryIds.value ?? []).filter(cId => cId !== categoryId));
  }

  getCategoryLabel(categoryId: number): string {
    return this.categoryLookups.find(c => c.id === categoryId).displayName;
  }

  private buildRecipeIngredientGroup(recipeIngredient?: CrudRecipeIngredientDto, ingredientId?: number): FormGroup {
    return this.fb.group({
      recipeId: [recipeIngredient?.recipeId ?? 0, Validators.required],
      ingredientId: [recipeIngredient?.ingredientId ?? ingredientId, Validators.required],
      quantity: [recipeIngredient?.quantity ?? 0],
      unit: [recipeIngredient?.unit ?? MeasurementUnit.Gram]
    })
  }

  addRecipeIngredient(event: MatAutocompleteSelectedEvent): void {
    this.recipeIngredientsArray.push(this.buildRecipeIngredientGroup(null, event.option.value))
    this.ingredientAutocompleteControl.setValue('');
  }

  private initAutoCompleteStream(): void {
    this.suggestedIngredients$ = this.ingredientAutocompleteControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchKey => {
      const selectedIngredientsIds = this.recipeIngredientsArray.controls.map((ctrl: FormGroup) => ctrl.get('ingredientId')?.value);
      return this.ingredientAdminSvc.getAutoComplete(searchKey, selectedIngredientsIds);;
    })
    );
  }

  getIngredientLabel(ingredientId: number): string {
    return this.ingredientLookups.find(c => c.id === ingredientId)?.displayName;
  }

  removeRecipeIngredient(index: number) {
    this.recipeIngredientsArray.removeAt(index);
  }

  cancel(): void {
    this.router.navigate(["/recipes/list"]);
  }

  save(): void {
    if (this.form.invalid) {
      alert("some Fields are not valid.")
      return;
    }

    const recipe: CrudRecipeDto = this.mapFormToRecipe()
    if (this.isEditMode) {
      this.update(recipe);
    } else {
      this.create(recipe);
    }
  }

  private mapFormToRecipe(): CrudRecipeDto {
    const formValue = this.form.value;
    return {
      name: formValue.name,
      description: formValue.description,
      instructions: formValue.instructions.map((instr: InstructionDto) => ({
        id: instr.id,
        order: instr.order,
        text: instr.text,
      })),
      categoryIds: formValue.categoryIds,
      recipeIngredients: formValue.recipeIngredients
    };
  }

  private update(recipe: CrudRecipeDto) {
    this.recipeAdminSvc.update(this.recipeId, recipe).subscribe((recipe) => {
      console.log('Recipe updated successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }

  private create(recipe: CrudRecipeDto) {
    this.recipeAdminSvc.create(recipe).subscribe((recipe) => {
      console.log('Recipe created successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }
}
