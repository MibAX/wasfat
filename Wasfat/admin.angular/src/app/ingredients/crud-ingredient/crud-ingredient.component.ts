import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientAdminService, IngredientDto } from '@proxy/ingredients';

@Component({
  selector: 'app-crud-ingredient',
  templateUrl: './crud-ingredient.component.html',
  styleUrls: ['./crud-ingredient.component.scss']
})
export class CrudIngredientComponent {
  ingredientFormGroup: FormGroup;
  ingredientId: number | null = null;
  isEditMode: boolean = false;
  
  constructor(
    private ingredientAdminSvc: IngredientAdminService,
    private fb: FormBuilder,
    @Inject (MAT_DIALOG_DATA) data: any
  ) {
    console.log('CrudIngredientComponent > constructor')
    this.ingredientId = data.ingredientId
  }

  ngOnInit(): void {
    console.log('CrudIngredientComponent > ngOnInit!')
    this.buildForm();

    if(this.ingredientId) {
      this.isEditMode = true

      this.ingredientAdminSvc.get(this.ingredientId).subscribe((response) => {
        // Patching form values
      })
    }
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

    const ingredient: IngredientDto = {
      name: this.ingredientFormGroup.value.name,
      recipeIngredients: []
    }

    this.ingredientAdminSvc.create(ingredient).subscribe((ingredient) => {
      console.log('Ingredient created successfully', ingredient);
    });
  }
}
