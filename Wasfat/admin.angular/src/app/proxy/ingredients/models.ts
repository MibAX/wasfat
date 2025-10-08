import type { EntityDto } from '@abp/ng.core';

export interface IngredientDto extends EntityDto<number> {
  name?: string;
}
