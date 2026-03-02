import { EnvironmentService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupDto } from '@proxy/common';
import { IngredientAdminService } from '@proxy/ingredients';
import { measurementUnitOptions } from '@proxy/recipe-ingredients';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';

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
  ) {}

  ngOnInit(): void {
    this.getApiUrl();
    this.getRecipe();
    this.getIngredientLookups();
  }

  private getApiUrl(): void {
    this.apiUrl = this.environmentSvc.getApiUrl('default');
  }

  private getRecipe(): void {
    const ID_PARAM = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.recipeSvc.get(ID_PARAM).subscribe(result => this.recipe = result);
  }

  private getIngredientLookups(): void {
    this.ingredientSvc.getLookups().subscribe(result => this.ingredientLookups = result);
  }

  getIngredientLabel(ingredientId: number): string {
    let ingredientName = this.ingredientLookups?.find(ingredient => ingredient.id === ingredientId).displayName;
    return ingredientName;
  }

  getMeasurementUnitKey(unitValue: number): string {
    let measurementUnitKey = this.measurementUnitOptions.find(option => option.value === unitValue).key;
    return measurementUnitKey;
  }
}
