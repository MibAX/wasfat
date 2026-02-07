import { EnvironmentService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { RecipeDto, RecipeAdminService } from '@proxy/recipes';
import { CategoryAdminService } from '@proxy/categories';
import { LookupDto } from '@proxy/common';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  apiUrl: string;
  recipes: RecipeDto[];
  filteredRecipes: RecipeDto[];
  categories: LookupDto[];
  selectedCategoryId: number | null = null;

  constructor(
    private recipeSvc: RecipeAdminService,
    private categorySvc: CategoryAdminService,
    private environmentSvc: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.getApiUrl();
    this.getRecipes();
    this.getCategories();
  }

  private getApiUrl(): void {
    this.apiUrl = this.environmentSvc.getApiUrl('default');
  }

  private getRecipes(): void {
    this.recipeSvc.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.applyFilters();
    });
  }

  private getCategories(): void {
    this.categorySvc.getLookups().subscribe(categories => {
      this.categories = categories;
    });
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.applyFilters();
  }

  private applyFilters(): void {
    if (!this.recipes) {
      return;
    }

    let filtered = this.recipes;

    // Filter by category
    if (this.selectedCategoryId !== null) {
      filtered = filtered.filter(recipe =>
        recipe.categories?.some(cat => cat.id === this.selectedCategoryId)
      );
    }

    this.filteredRecipes = filtered;
  }
}