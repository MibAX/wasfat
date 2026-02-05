import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { RecipeAdminService, RecipeDto } from '@proxy/wasfat/recipes';
import { EnvironmentService } from '@abp/ng.core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  animations: [
    trigger('cardAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })
    )
  ])
])
  ]
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
