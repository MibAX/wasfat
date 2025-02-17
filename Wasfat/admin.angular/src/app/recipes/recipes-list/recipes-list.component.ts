import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router) {
    console.log('RecipesListComponent > constructor');

  }

  ngOnInit(): void {
    console.log('RecipesListComponent > ngOnInit');

    this.recipeAdminSvc.getAllRecipes().subscribe(data => this.recipes = data);


  }

  newRecipe(): void {
    this.router.navigate(["/recipes/create"]);
  }

  editRecipe(id: number): void {
    this.router.navigate(["/recipes/edit", id]);
  }

}
