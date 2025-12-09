import type { EntityDto } from '@abp/ng.core';
import type { InstructionDto } from '../instructions/models';
import type { CategoryDto } from '../categories/models';

export interface RecipeDto extends EntityDto<number> {
  name?: string;
  description?: string;
  instructions: InstructionDto[];
  categories: CategoryDto[];
}
