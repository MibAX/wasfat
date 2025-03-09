import type { EntityDto } from '@abp/ng.core';
import type { InstructionDto } from '../instructions/models';

export interface RecipeDto extends EntityDto<number> {
  instructions: InstructionDto[];
  name?: string;
  description?: string;
}
