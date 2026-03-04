import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomLayoutComponent } from './custom-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    CustomLayoutComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ThemeSharedModule,
    ThemeBasicModule
  ]
})
export class CustomLayoutModule { }
