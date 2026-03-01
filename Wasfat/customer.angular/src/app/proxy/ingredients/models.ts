import type { EntityDto } from '@abp/ng.core';
import type { RecipeIngredientDto } from '../recipe-ingredients/models';

export interface IngredientDto extends EntityDto<number> {
  name?: string;
  recipeIngredients: RecipeIngredientDto[];
}
