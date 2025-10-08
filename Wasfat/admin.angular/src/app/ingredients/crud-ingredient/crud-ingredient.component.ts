import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-ingredient',
  templateUrl: './crud-ingredient.component.html',
  styleUrls: ['./crud-ingredient.component.scss']
})
export class CrudIngredientComponent implements OnInit {
  ingredientId: number | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ingredientId = data.ingredientId
  }

  ngOnInit(): void {

  }
}
