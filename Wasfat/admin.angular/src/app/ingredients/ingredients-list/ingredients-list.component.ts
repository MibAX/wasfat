import { Component, OnInit } from '@angular/core';
import { IngredientAdminService, IngredientDto } from '@proxy/ingredients';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {
  ingredients: IngredientDto[] = [];

  constructor(private ingredientAdminSvc: IngredientAdminService) {
    console.log('IngredientsListComponent > constructor')
  }
  
  ngOnInit(): void {
    console.log('IngredientsListComponent > ngOnInit!')

    this.ingredientAdminSvc.getAllIngredients().subscribe(data => this.ingredients = data);
  }
}
