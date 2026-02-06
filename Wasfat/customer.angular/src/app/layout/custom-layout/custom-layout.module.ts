import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLayoutComponent } from './custom-layout.component';
import { CoreModule } from '@abp/ng.core';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CustomLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    ThemeSharedModule,
    ThemeBasicModule,
  ]
})
export class CustomLayoutModule { }
