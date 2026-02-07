import { EnvironmentService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RecipeDto, RecipeAdminService } from '@proxy/recipes';
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

  get recipeNameControl(): FormControl {
    return this.searchForm.get('recipeName') as FormControl;
  }

  constructor(
    private recipeSvc: RecipeAdminService,
    private fb: FormBuilder,
    private environmentSvc: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.getApiUrl();
    this.buildForm();
    this.setupFiltering();
    this.getRecipes();
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
    });
  }

  private setupFiltering(): void {
    this.recipeNameControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300)
    ).subscribe(searchKey => {

      if (!searchKey || !searchKey.trim()) {
        this.filteredRecipes = this.recipes;
        return;
      }

      const key = searchKey.toLowerCase();

      this.filteredRecipes = this.recipes.filter(recipe =>
        recipe.name?.toLowerCase().includes(key)
      );
    });
  }
}