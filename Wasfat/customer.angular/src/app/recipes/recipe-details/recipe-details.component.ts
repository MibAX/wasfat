import { EnvironmentService } from '@abp/ng.core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupDto } from '@proxy/wasfat/common';
import { IngredientAdminService } from '@proxy/wasfat/ingredients';
import { measurementUnitOptions } from '@proxy/wasfat/recipe-ingredients';
import { RecipeAdminService, RecipeDto } from '@proxy/wasfat/recipes';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.97)' }),
        animate(
          '320ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({ opacity: 1, transform: 'scale(1)' })
        )
      ])
    ]),

    trigger('staggerContent', [
      transition(':enter', [
        query('.anim-section', [
          style({ opacity: 0, transform: 'translateY(18px)' }),
          stagger('80ms', [
            animate(
              '380ms cubic-bezier(0.35, 0.8, 0.25, 1)',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
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
