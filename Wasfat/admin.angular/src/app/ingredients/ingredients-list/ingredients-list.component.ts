import { Component } from '@angular/core';
import { IngredientDto } from '@proxy/ingredients';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent {
  ingredients: IngredientDto[] = [];
}
