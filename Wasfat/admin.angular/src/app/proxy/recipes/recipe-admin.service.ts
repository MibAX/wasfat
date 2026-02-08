import type { RecipeDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../common/models';

@Injectable({
  providedIn: 'root',
})
export class RecipeAdminService {
  apiName = 'Default';
  

  create = (input: RecipeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RecipeDto>({
      method: 'POST',
      url: '/api/app/recipe-admin',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/recipe-admin/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RecipeDto>({
      method: 'GET',
      url: `/api/app/recipe-admin/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllRecipes = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, RecipeDto[]>({
      method: 'GET',
      url: '/api/app/recipe-admin/recipes',
    },
    { apiName: this.apiName,...config });
  

  getAutoComplete = (searchKey: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/recipe-admin/auto-complete',
      params: { searchKey },
    },
    { apiName: this.apiName,...config });
  

  getFeatured = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, RecipeDto[]>({
      method: 'GET',
      url: '/api/app/recipe-admin/featured',
    },
    { apiName: this.apiName,...config });
  

  getFiltered = (categoryId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RecipeDto[]>({
      method: 'GET',
      url: `/api/app/recipe-admin/filtered/${categoryId}`,
    },
    { apiName: this.apiName,...config });
  

  getHeroDisplayed = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, RecipeDto[]>({
      method: 'GET',
      url: '/api/app/recipe-admin/hero-displayed',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<RecipeDto>>({
      method: 'GET',
      url: '/api/app/recipe-admin',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getRecent = (count: number = 3, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RecipeDto[]>({
      method: 'GET',
      url: '/api/app/recipe-admin/recent',
      params: { count },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: RecipeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, RecipeDto>({
      method: 'PUT',
      url: `/api/app/recipe-admin/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
