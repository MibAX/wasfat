import { EnvironmentService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  apiUrl: string;
  recipes: RecipeDto[];

  constructor(
    private recipeSvc: RecipeAdminService,
    private environmentSvc: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.getApiUrl();
    this.getRecipes();
  }
  
  private getApiUrl(): void {
    this.apiUrl = this.environmentSvc.getApiUrl("default");
  }

  private getRecipes(): void {
    this.recipeSvc.getAllRecipes().subscribe(result => this.recipes = result);
  }
}
