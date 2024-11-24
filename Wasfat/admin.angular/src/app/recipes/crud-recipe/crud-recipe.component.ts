import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeAdminService } from '@proxy/recipes';

@Component({
  selector: 'app-crud-recipe',
  templateUrl: './crud-recipe.component.html',
  styleUrls: ['./crud-recipe.component.scss']
})
export class CrudRecipeComponent implements OnInit {
  recipeFormGroup: FormGroup;

  constructor(
    private recipeAdminSvc: RecipeAdminService,
    private fb: FormBuilder,
    private router: Router) {

  }

  ngOnInit(): void {
    console.log('CrudRecipeComponent > ngOnInit')

    this.recipeFormGroup = this.fb.group({
      name: [''],
      description: ['']
    });
  }








}
