import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@abp/ng.core';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CustomLayoutComponent } from './custom-layout.component';

@NgModule({
  declarations: [CustomLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    ThemeSharedModule,
    ThemeBasicModule,
  ],
  exports: [CustomLayoutComponent],
})
export class CustomLayoutModule {}
