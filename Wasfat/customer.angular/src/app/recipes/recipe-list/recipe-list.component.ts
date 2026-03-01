import { Component, OnInit } from '@angular/core';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeDto[];

  constructor(private recipeSvc: RecipeAdminService) {}

  ngOnInit(): void {
    this.getRecipes();
  }
  
  private getRecipes(): void {
    this.recipeSvc.getAllRecipes().subscribe(result => this.recipes = result);
  }
}
