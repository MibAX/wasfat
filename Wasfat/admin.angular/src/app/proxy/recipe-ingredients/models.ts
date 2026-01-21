import type { EntityDto } from '@abp/ng.core';
import type { MeasurementUnit } from './measurement-unit.enum';
import type { RecipeDto } from '../recipes/models';
import type { IngredientDto } from '../ingredients/models';

export interface RecipeIngredientDto extends EntityDto {
  recipeId: number;
  ingredientId: number;
  quantity: number;
  unit: MeasurementUnit;
  recipe: RecipeDto;
  ingredient: IngredientDto;
}
