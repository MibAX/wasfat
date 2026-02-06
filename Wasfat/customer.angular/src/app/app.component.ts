import { ReplaceableComponentsService } from '@abp/ng.core';
import { eThemeBasicComponents } from '@abp/ng.theme.basic';
import { Component, inject } from '@angular/core';
import { CustomLayoutComponent } from './layout/custom-layout/custom-layout.component';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {
  private replaceableComponents = inject(ReplaceableComponentsService);

  constructor() {
    this.replaceableComponents.add({
      key: eThemeBasicComponents.ApplicationLayout,
      component: CustomLayoutComponent,
    });
  }
}
