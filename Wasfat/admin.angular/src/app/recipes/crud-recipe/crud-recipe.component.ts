import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';

@Component({
  selector: 'app-crud-recipe',
  templateUrl: './crud-recipe.component.html',
  styleUrls: ['./crud-recipe.component.scss']
})
export class CrudRecipeComponent implements OnInit {
  recipeFormGroup: FormGroup;
  recipeId: number | null = null;
  isEditMode: boolean = false;


  constructor(
    private recipeAdminSvc: RecipeAdminService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    console.log('CrudRecipeComponent > ngOnInit')
    this.buildFrom();
    this.populateFromIfEditing();
  }

  cancel(): void {
    this.router.navigate(["/recipes/list"]);
  }

  saveRecipe(): void {

    if (this.recipeFormGroup.invalid) {
      alert("some Fields are not valid.")
      return;
    }

    if (this.isEditMode && this.recipeId) {
      // update
      this.recipeAdminSvc.update(this.recipeId, this.recipeFormGroup.value).subscribe((response) => {
        console.log('Recipe updated successfully', response);
        this.router.navigate(["/recipes/list"]);
      });
    } else {
      // create
      this.recipeAdminSvc.create(this.recipeFormGroup.value).subscribe((response) => {
        console.log('Recipe created successfully', response);
        this.router.navigate(["/recipes/list"]);
      });
    }



  }

  //#region Sub-Functions

  private buildFrom() {
    this.recipeFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  private populateFromIfEditing() {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = this.getId(params);
      if (this.isNotEditing(idParam)) {
        return;
      }
      this.setEditingParams(idParam);
      this.loadRecipe();
    });
  }

  private getId(params) {
    return params.get('id');
  }

  private isNotEditing(idParam: number) {
    return !idParam;
  }
  private setEditingParams(idParam: string) {
    this.recipeId = Number(idParam);
    this.isEditMode = true;
  }

  private loadRecipe() {
    this.recipeAdminSvc.get(this.recipeId).subscribe(response => {
      this.populateForm(response);
    });
  }

  private populateForm(response: RecipeDto) {
    this.recipeFormGroup.patchValue({
      name: response.name,
      description: response.description
    });
  }

  //#endregion









}
