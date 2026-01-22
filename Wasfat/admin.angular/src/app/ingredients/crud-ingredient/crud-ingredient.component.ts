import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IngredientAdminService } from '@proxy/ingredients';

@Component({
  selector: 'app-crud-ingredient',
  templateUrl: './crud-ingredient.component.html',
  styleUrls: ['./crud-ingredient.component.scss']
})
export class CrudIngredientComponent {
  ingredientFormGroup: FormGroup;
  
  constructor(
    private ingredientAdminSvc: IngredientAdminService,
    private fb: FormBuilder
  ) {
    console.log('CrudIngredientComponent > constructor')
  }
}
