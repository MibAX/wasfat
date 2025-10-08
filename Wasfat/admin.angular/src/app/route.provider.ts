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
        path: '/categories/list',
        name: '::Menu:Categories',
        iconClass: 'fas fa-layer-group',
        order: 3,
        layout: eLayoutType.application,
      },
      {
        path: '/ingredients/list',
        name: '::Menu:Ingredients',
        iconClass: 'fas fa-lemon',
        order: 4,
        layout: eLayoutType.application,
      }
    ]);
  };
}
