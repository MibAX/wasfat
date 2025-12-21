import type { EntityDto } from '@abp/ng.core';

export interface LookupDto extends EntityDto<number> {
  displayName?: string;
}
