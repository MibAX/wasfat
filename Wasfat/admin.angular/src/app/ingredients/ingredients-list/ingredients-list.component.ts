import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientAdminService, IngredientDto } from '@proxy/ingredients';
import { CrudIngredientComponent } from '../crud-ingredient/crud-ingredient.component';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {
  ingredients: IngredientDto[] = [];

  constructor(
    private ingredientAdminSvc: IngredientAdminService,
    private dialog: MatDialog
  ) {
    console.log('IngredientsListComponent > constructor')
  }
  
  ngOnInit(): void {
    console.log('IngredientsListComponent > ngOnInit!')

    this.getAllIngredients();
  }

  private getAllIngredients(): void {
    this.ingredientAdminSvc.getAllIngredients().subscribe(data => this.ingredients = data);
  }

  openDialog(ingredientId?: number): void {
    const dialogRef = this.dialog.open(CrudIngredientComponent, {
      width: '20rem',
      disableClose: true,
      data: { ingredientId: ingredientId }
    })

    dialogRef.afterClosed().subscribe(() => this.getAllIngredients())
  }
}
