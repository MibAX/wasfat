import type { EntityDto } from '@abp/ng.core';

export interface CategoryDto extends EntityDto<number> {
  name?: string;
  recipesCount: number;
}

export interface CrudCategoryDto extends EntityDto {
  name?: string;
}
