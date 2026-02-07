import type { EntityDto } from '@abp/ng.core';

export interface InstructionDto extends EntityDto<number> {
  text?: string;
  order: number;
  recipeId: number;
}
