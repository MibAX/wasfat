import type { InstructionDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InstructionAdminService {
  apiName = 'Default';
  

  create = (input: InstructionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InstructionDto>({
      method: 'POST',
      url: '/api/app/instruction-admin',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/instruction-admin/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InstructionDto>({
      method: 'GET',
      url: `/api/app/instruction-admin/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllInstructions = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, InstructionDto[]>({
      method: 'GET',
      url: '/api/app/instruction-admin/instructions',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InstructionDto>>({
      method: 'GET',
      url: '/api/app/instruction-admin',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getRecent = (count: number = 3, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InstructionDto[]>({
      method: 'GET',
      url: '/api/app/instruction-admin/recent',
      params: { count },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: InstructionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, InstructionDto>({
      method: 'PUT',
      url: `/api/app/instruction-admin/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
