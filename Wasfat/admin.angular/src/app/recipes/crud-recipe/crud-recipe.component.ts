import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeAdminService } from '@proxy/recipes';

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
    private router: Router) {

  }

  ngOnInit(): void {
    console.log('CrudRecipeComponent > ngOnInit')
    this.buildFrom();
  }

  private buildFrom() {
    this.recipeFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  cancel(): void {
    this.router.navigate(["/recipes/list"]);
  }

  createRecipe(): void {

    if (this.recipeFormGroup.invalid) {
      alert("some Fields are not valid.")
      return;
    }

    this.recipeAdminSvc.create(this.recipeFormGroup.value).subscribe((response) => {
      console.log('Recipe created successfully', response);
      this.router.navigate(["/recipes/list"]);
    });

  }










}
