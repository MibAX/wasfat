import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud-recipe',
  templateUrl: './crud-recipe.component.html',
  styleUrls: ['./crud-recipe.component.scss']
})
export class CrudRecipeComponent {
  recipeFormGroup: FormGroup;

}
