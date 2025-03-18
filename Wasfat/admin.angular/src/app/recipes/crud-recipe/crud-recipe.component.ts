import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeAdminService, RecipeDto } from "@proxy/recipes";

@Component({
  selector: "app-crud-recipe",
  templateUrl: "./crud-recipe.component.html",
  styleUrls: ["./crud-recipe.component.scss"],
})
export class CrudRecipeComponent implements OnInit {
  formGroup: FormGroup;
  recipeId: number | null = null;
  recipe: RecipeDto = {} as RecipeDto;

  isEditMode: boolean = false;

  fruits: string[] = ["Apple", "Banana", "Orange", "Mango", "Strawberry"];

  constructor(
    private recipeAdminSvc: RecipeAdminService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("CrudRecipeComponent > ngOnInit");
    console.log("fruits =", this.fruits);
    this.buildFrom();
    this.patchIfEditMode();
  }

  private buildFrom() {
    this.formGroup = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: [""],
    });
  }

  private patchIfEditMode() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idParam = params.get("id");
      if (!idParam) return;
      this.setEditMOde(idParam);
      this.fetchAndPatch();
    });
  }

  cancel(): void {
    this.router.navigate(["/recipes/list"]);
  }

  save(): void {
    if (this.formGroup.invalid) {
      alert("some fields are invalid");
      return;
    }
    if (this.isEditMode) {
      this.update();
    } else {
      this.create();
    }
  }

  //#region Sub Functions

  private setEditMOde(idParam: string) {
    this.recipeId = Number(idParam);
    this.isEditMode = true;
  }

  private fetchAndPatch() {
    this.recipeAdminSvc.get(this.recipeId).subscribe((recipe) => {
      this.recipe = recipe;
      console.log("instructions =", this.recipe.instructions);
      this.patch(recipe);
    });
  }

  private patch(response: RecipeDto) {
    this.formGroup.patchValue({
      name: response.name,
      description: response.description,
    });
  }

  private update() {
    this.recipeAdminSvc
      .update(this.recipeId, this.formGroup.value)
      .subscribe((response) => {
        console.log("Recipe updated successfully", response);
        this.router.navigate(["/recipes/list"]);
      });
  }

  private create() {
    this.recipeAdminSvc.create(this.formGroup.value).subscribe((response) => {
      console.log("Recipe created successfully", response);
      this.router.navigate(["/recipes/list"]);
    });
  }

  //#endregion
}