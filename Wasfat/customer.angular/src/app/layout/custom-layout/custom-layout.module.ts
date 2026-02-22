import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule,
    ThemeSharedModule,
    ThemeBasicModule
  ]
})
export class CustomLayoutModule { }
