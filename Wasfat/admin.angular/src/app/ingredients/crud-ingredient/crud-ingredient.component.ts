import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(): void {
    console.log('CrudIngredientComponent > ngOnInit!')
    this.buildForm();
  }

  private buildForm(): void {
    this.ingredientFormGroup = this.fb.group({
      name: ['', Validators.required]
    })
  }

  save(): void {
    if (this.ingredientFormGroup.invalid) {
      alert("Some fields are not valid.")
      return;
    }

    // Mapping form values to ingredient variable

    // Creating the ingredient in the backend
  }
}
