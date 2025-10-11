import type { EntityDto } from '@abp/ng.core';
import type { InstructionDto } from '../instructions/models';
import type { CrudRecipeIngredientDto } from '../recipe-ingredients/models';
import type { CategoryDto } from '../categories/models';

export interface CrudRecipeDto extends EntityDto<number> {
  name?: string;
  description?: string;
  instructions: InstructionDto[];
  categoryIds: number[];
  recipeIngredients: CrudRecipeIngredientDto[];
}

export interface RecipeDto extends EntityDto<number> {
  name?: string;
  description?: string;
  instructions: InstructionDto[];
  categories: CategoryDto[];
  recipeIngredients: CrudRecipeIngredientDto[];
}
