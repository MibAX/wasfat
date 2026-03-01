import type { EntityDto } from '@abp/ng.core';
import type { RecipeDto } from '../recipes/models';

export interface CategoryDto extends EntityDto<number> {
  name?: string;
  recipes: RecipeDto[];
}
