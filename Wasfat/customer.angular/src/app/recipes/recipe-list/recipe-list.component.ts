import { EnvironmentService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { CategoryAdminService } from '@proxy/categories';
import { LookupDto } from '@proxy/common';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  apiUrl: string;
  recipes: RecipeDto[];
  filteredRecipes: RecipeDto[];
  categoryLookups: LookupDto[];
  selectedCategoryId: number | null = null;

  constructor(
    private recipeSvc: RecipeAdminService,
    private categorySvc: CategoryAdminService,
    private environmentSvc: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.getApiUrl();
    this.getRecipes();
    this.getCategoryLookups();
  }
  
  private getApiUrl(): void {
    this.apiUrl = this.environmentSvc.getApiUrl("default");
  }

  private getRecipes(): void {
    this.recipeSvc.getAllRecipes().subscribe(result => {
      this.recipes = result;
      this.applyFilters();
    });
  }

  private getCategoryLookups(): void {
    this.categorySvc.getLookups().subscribe(result => this.categoryLookups = result);
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.applyFilters()
  }

  private applyFilters(): void {
    if(this.selectedCategoryId) {
      this.filteredRecipes = this.recipes.filter(recipe =>
        recipe.categories?.some(category => category.id === this.selectedCategoryId)
      );
    }
    else {
      this.filteredRecipes = this.recipes;
    }
  }
}
