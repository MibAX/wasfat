import type { EntityDto } from '@abp/ng.core';
import type { InstructionDto } from '../instructions/models';

export interface RecipeDto extends EntityDto<number> {
  name?: string;
  description?: string;
  instructions: InstructionDto[];
}
