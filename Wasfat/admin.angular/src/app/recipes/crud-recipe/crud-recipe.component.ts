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
  formGroup: FormGroup;
  id: number | null = null;
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
    this.patchIfEditMode();
  }

  private buildFrom() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
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
      alert("some Fields are not valid.")
      return;
    }
    if (this.isEditMode) {
      this.update();
    } else {
      this.create();
    }
  }

  //#region Sub Functions 

  private setEditMode(idParam: string) {
    this.id = Number(idParam);
    this.isEditMode = true;
  }

  private fetchAndPatch() {
    this.recipeAdminSvc.get(this.id).subscribe(response => {
      this.patch(response);
    });
  }

  private patch(recipe: RecipeDto) {
    this.formGroup.patchValue({
      name: recipe.name,
      description: recipe.description
    });
  }

  private update() {
    this.recipeAdminSvc.update(this.id, this.formGroup.value).subscribe((recipe) => {
      console.log('Recipe updated successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }

  private create() {
    this.recipeAdminSvc.create(this.formGroup.value).subscribe((recipe) => {
      console.log('Recipe created successfully', recipe);
      this.router.navigate(["/recipes/list"]);
    });
  }

  //#endregion

}
