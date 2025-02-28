import type { EntityDto } from '@abp/ng.core';

export interface InstructionDto extends EntityDto<number> {
  recipeId: number;
  order: number;
  text?: string;
}
