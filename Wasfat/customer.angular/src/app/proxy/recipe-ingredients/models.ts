import type { EntityDto } from '@abp/ng.core';
import type { MeasurementUnit } from './measurement-unit.enum';

export interface RecipeIngredientDto extends EntityDto {
  recipeId: number;
  ingredientId: number;
  quantity: number;
  unit: MeasurementUnit;
}
