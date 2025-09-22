import type { EntityDto } from '@abp/ng.core';

export interface CategoryDto extends EntityDto<number> {
  name?: string;
  recipesCount: number;
}
