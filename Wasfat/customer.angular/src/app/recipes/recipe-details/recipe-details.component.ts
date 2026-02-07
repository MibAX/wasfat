import { EnvironmentService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupDto } from '@proxy/common';
import { IngredientAdminService } from '@proxy/ingredients';
import { measurementUnitOptions } from '@proxy/recipe-ingredients';
import { RecipeDto, RecipeAdminService } from '@proxy/recipes';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  apiUrl: string;
  recipe: RecipeDto;
  ingredientLookups: LookupDto[];
  measurementUnitOptions = measurementUnitOptions;
  
  constructor(
    private recipeSvc: RecipeAdminService, 
    private ingredientSvc: IngredientAdminService,
    private activatedRoute: ActivatedRoute,
    private environmentSvc: EnvironmentService
  ) {
    console.log('RecipeDetailsComponent > constructor');
  }

  ngOnInit(): void {
    this.getApiUrl();
    this.getRecipe();
    this.getIngredientLookups();
  }

  private getApiUrl(): void {
    this.apiUrl = this.environmentSvc.getApiUrl('default');
  }

  private getRecipe(): void {
    const idParam = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.recipeSvc.get(idParam).subscribe(response => this.recipe = response);
  }

  private getIngredientLookups(): void {
    this.ingredientSvc.getLookups().subscribe(response => this.ingredientLookups = response);
  }

  getIngredientLabel(ingredientId: number): string {
    return this.ingredientLookups?.find(c => c.id === ingredientId).displayName;
  }

  getMeasurementUnitName(value: number): string {
  return this.measurementUnitOptions.find(o => o.value === value)?.key ?? '';
}
}
