import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryAdminService } from '@proxy/categories';

@Component({
  selector: 'app-crud-category',
  templateUrl: './crud-category.component.html',
  styleUrls: ['./crud-category.component.scss']
})
export class CrudCategoryComponent {
  categoryFormGroup: FormGroup;

  constructor(
    private categoryAdminSvc: CategoryAdminService,
    private fb: FormBuilder
  ) {
    console.log('CrudCategoryComponent > constructor')
  }
}
