import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/recipes/list',
        name: '::Menu:Recipes',
        iconClass: 'fas fa-utensils',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '',
        name: '::Menu:Instructions',
        iconClass: 'fas fa-home',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/instructions/list',
        name: '::Menu:InstructionsList',
        parentName: '::Menu:Instructions',
        iconClass: 'fas fa-bars',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/instructions/crud',
        name: '::Menu:CrudInstruction',
        parentName: '::Menu:Instructions',
        iconClass: 'fas fa-edit',
        order: 2,
        layout: eLayoutType.application,
      },
    ]);
  };
}
