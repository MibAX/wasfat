import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  recipes: RecipeDto[] = [];

  constructor(
    private recipeAdminSvc: RecipeAdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    console.log('RecipesListComponent > constructor');

  }

  ngOnInit(): void {
    console.log('RecipesListComponent > ngOnInit');

    this.initialFetch();
  }

  private initialFetch(): void {
    const categoryId = Number(this.activatedRoute.snapshot.queryParamMap.get('categoryId'));
    if (categoryId) {
      this.getFilteredRecipes(categoryId);
    }
    else {
      this.getAllRecipes();
    }
  }

  private getAllRecipes(): void {
    this.recipeAdminSvc.getAllRecipes().subscribe(data => this.recipes = data);
  }

  private getFilteredRecipes(categoryId: number): void {
    this.recipeAdminSvc.getFiltered(categoryId).subscribe(data => this.recipes = data)
  }

  hasQueryParams(): boolean {
    return this.activatedRoute.snapshot.queryParamMap.keys.length > 0;
  }

  resetFilters(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {}, // Empty object
    });

    this.getAllRecipes();
  }

  newRecipe(): void {
    this.router.navigate(["/recipes/create"]);
  }

  editRecipe(id: number): void {
    this.router.navigate(["/recipes/edit", id]);
  }

}
