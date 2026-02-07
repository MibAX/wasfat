import { CoreModule } from '@abp/ng.core';
import { NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips'
import { FirstWordsPipe } from './first-words.pipe';

@NgModule({
  declarations: [FirstWordsPipe],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    NgbCarouselModule,
    MatIconModule,
    MatChipsModule
  ],
  exports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    FirstWordsPipe,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    NgbCarouselModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: []
})
export class SharedModule {}
