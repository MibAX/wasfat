import type { IngredientDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientAdminService {
  apiName = 'Default';
  

  create = (input: IngredientDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IngredientDto>({
      method: 'POST',
      url: '/api/app/ingredient-admin',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/ingredient-admin/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IngredientDto>({
      method: 'GET',
      url: `/api/app/ingredient-admin/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<IngredientDto>>({
      method: 'GET',
      url: '/api/app/ingredient-admin',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: IngredientDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IngredientDto>({
      method: 'PUT',
      url: `/api/app/ingredient-admin/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
