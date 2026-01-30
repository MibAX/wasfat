import type { EntityDto } from '@abp/ng.core';
import type { InstructionDto } from '../instructions/models';
import type { CategoryDto } from '../categories/models';
import type { RecipeIngredientDto } from '../recipe-ingredients/models';

export interface RecipeDto extends EntityDto<number> {
  name?: string;
  description?: string;
  imageUrl?: string;
  isFeatured: boolean;
  isDisplayedInHero: boolean;
  instructions: InstructionDto[];
  categories: CategoryDto[];
  categoryIds: number[];
  recipeIngredients: RecipeIngredientDto[];
}
