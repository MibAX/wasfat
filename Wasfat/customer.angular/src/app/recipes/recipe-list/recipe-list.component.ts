import { EnvironmentService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RecipeDto, RecipeAdminService } from '@proxy/recipes';
import { CategoryAdminService } from '@proxy/categories';
import { LookupDto } from '@proxy/common';
import { startWith, debounceTime } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  apiUrl: string;
  searchForm: FormGroup;
  recipes: RecipeDto[];
  filteredRecipes: RecipeDto[];
  categories: LookupDto[];
  selectedCategoryId: number | null = null;

  get recipeNameControl(): FormControl {
    return this.searchForm.get('recipeName') as FormControl;
  }

  constructor(
    private recipeSvc: RecipeAdminService,
    private categorySvc: CategoryAdminService,
    private fb: FormBuilder,
    private environmentSvc: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.getApiUrl();
    this.buildForm();
    this.setupFiltering();
    this.getRecipes();
    this.getCategories();
  }

  private getApiUrl(): void {
    this.apiUrl = this.environmentSvc.getApiUrl('default');
  }

  private buildForm(): void {
    this.searchForm = this.fb.group({
      recipeName: ['']
    });
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

  private setupFiltering(): void {
    this.recipeNameControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300)
    ).subscribe(() => {
      this.applyFilters();
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

    // Filter by search text
    const searchKey = this.recipeNameControl.value;
    if (searchKey && searchKey.trim()) {
      const key = searchKey.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.name?.toLowerCase().includes(key)
      );
    }

    this.filteredRecipes = filtered;
  }
}