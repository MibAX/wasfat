import type { EntityDto } from '@abp/ng.core';
import type { RecipeDto } from '../recipes/models';

export interface InstructionDto extends EntityDto<number> {
  recipeId: number;
  recipe: RecipeDto;
  order: number;
  text?: string;
}
