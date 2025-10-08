import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientAdminService, IngredientDto } from '@proxy/ingredients';

@Component({
  selector: 'app-crud-ingredient',
  templateUrl: './crud-ingredient.component.html',
  styleUrls: ['./crud-ingredient.component.scss']
})
export class CrudIngredientComponent implements OnInit {
  form: FormGroup;
  ingredientId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private ingredientAdminSvc: IngredientAdminService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ingredientId = data.ingredientId
  }

  ngOnInit(): void {
    this.buildForm();
    this.patchIfEditMode();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    })
  }

  private patchIfEditMode() {
    if (this.ingredientId) {
      this.isEditMode = true;
      this.fetchAndPatch();
    }
  }

  private fetchAndPatch(): void {
    this.ingredientAdminSvc.get(this.ingredientId).subscribe(response => {
      this.patchForm(response);
    });
  }

  private patchForm(ingredient: IngredientDto): void {
    this.form.patchValue({
      name: ingredient.name
    })
  }

  save(): void {
    if (this.form.invalid) {
      alert("some Fields are not valid.")
      return;
    }

    const ingredient: IngredientDto = this.mapFormToIngredient()
    if (this.isEditMode) {
      this.update(ingredient);
    } else {
      this.create(ingredient);
    }
  }

  private mapFormToIngredient(): IngredientDto {
    const formValue = this.form.value;
    return {
      name: formValue.name,
    };
  }

  private update(ingredient: IngredientDto) {
    this.ingredientAdminSvc.update(this.ingredientId, ingredient).subscribe((ingredient) => {
      console.log('Ingredient updated successfully', ingredient);
    });
  }

  private create(ingredient: IngredientDto) {
    this.ingredientAdminSvc.create(ingredient).subscribe((ingredient) => {
      console.log('Ingredient created successfully', ingredient);
    });
  }
}
