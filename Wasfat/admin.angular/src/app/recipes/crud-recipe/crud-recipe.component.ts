import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    console.log('CrudRecipeComponent > ngOnInit')
    this.buildFrom();

    this.activatedRoute.paramMap.subscribe(params => {

      const idParam = params.get('id');

      if (!idParam) {
        return;
      }

      this.recipeId = Number(idParam);

      this.isEditMode = true;

      // load recipe from backend
      this.recipeAdminSvc.get(this.recipeId).subscribe(response => {
        // Populate the form with the retrieved recipe data
        this.recipeFormGroup.patchValue({
          name: response.name,
          description: response.description
        });

      });


    })
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










}
