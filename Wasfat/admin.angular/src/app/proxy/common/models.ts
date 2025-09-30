import type { EntityDto } from '@abp/ng.core';

export interface LookupDto<TKey> extends EntityDto<TKey> {
  displayName?: string;
}
