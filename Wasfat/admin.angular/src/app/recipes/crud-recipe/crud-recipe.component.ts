import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  get instructionsArray(): FormArray { return this.form.get('instructions') as FormArray };

  constructor(
    private recipeAdminSvc: RecipeAdminService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('CrudRecipeComponent > ngOnInit')
    this.buildFrom();
    this.recipeId = this.getRouteId();
    if(this.recipeId) {
      this.isEditMode = true;
      this.fetchAndPatch();
    }
  }

  private buildFrom() {
    this.form = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      instructions: this.fb.array([])
    });
  }

  private getRouteId(): number | null {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    return idParam && !isNaN(Number(idParam)) ? Number(idParam) : null;
  }

  cancel(): void {
    this.router.navigate(["/recipes"]);
  }

  save(): void {
    if (this.form.invalid) {
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

  private fetchAndPatch() {
    this.recipeAdminSvc.get(this.recipeId).subscribe(response => {
      this.patchForm(response);
    })
  }

  private patchForm(recipe: RecipeDto) {
    this.form.patchValue({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
    })

    this.instructionsArray.clear();
    if (recipe.instructions?.length) {
      recipe.instructions.forEach((instruction) => {
        this.instructionsArray.push(
          this.fb.group({
            id: [instruction.id],
            text: [instruction.text, [Validators.required, Validators.minLength(8)]],
            order: [instruction.order, Validators.required],
            recipeId: [instruction.recipeId]
          })
        )
      })
    }
  }

  private update() {
    this.recipeAdminSvc.update(this.recipeId, this.form.value).subscribe((recipe) => {
      console.log('Recipe updated successfully', recipe);
      this.router.navigate(["/recipes"]);
    });
  }

  private create() {
    this.recipeAdminSvc.create(this.form.value).subscribe((recipe) => {
      console.log('Recipe created successfully', recipe);
      this.router.navigate(["/recipes"]);
    });
  }

  //#endregion
}
