import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class MaterialModule {}
