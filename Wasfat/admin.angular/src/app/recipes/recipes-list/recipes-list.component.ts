import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAllRecipesInputDto, RecipeAdminService, RecipeDto } from '@proxy/recipes';
import { RECIPE_QUERY_PARAMS } from 'src/app/shared/constants/query-params.constants';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  recipes: RecipeDto[] = [];
  
  constructor(
    private recipeAdminSvc: RecipeAdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    console.log('RecipesListComponent > constructor');

  }

  ngOnInit(): void {
    console.log('RecipesListComponent > ngOnInit');

    this.recipeAdminSvc.getAllRecipes(this.getApiParamsFromRoute()).subscribe(data => this.recipes = data);
  }

  hasQueryParams(): boolean {
    return this.activatedRoute.snapshot.queryParamMap.keys.length > 0;
  }

  private getApiParamsFromRoute(): GetAllRecipesInputDto {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    const categoryId = queryParams.get(RECIPE_QUERY_PARAMS.CATEGORY_ID);

    if (categoryId) {
      return { categoryId: Number(categoryId) };
    }
    return {};
  }

  getAllRecipes(): void {
    this.recipeAdminSvc.getAllRecipes({}).subscribe(data => this.recipes = data);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {}, // empty object
    });
  }

  newRecipe(): void {
    this.router.navigate(["/recipes/create"]);
  }

  editRecipe(id: number): void {
    this.router.navigate(["/recipes/edit", id]);
  }

}
