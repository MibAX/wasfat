import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryAdminService } from '@proxy/categories';

@Component({
  selector: 'app-crud-category',
  templateUrl: './crud-category.component.html',
  styleUrls: ['./crud-category.component.scss']
})
export class CrudCategoryComponent implements OnInit {
  categoryFormGroup: FormGroup;

  constructor(
    private categoryAdminSvc: CategoryAdminService,
    private fb: FormBuilder
  ) {
    console.log('CrudCategoryComponent > constructor')
  }

  ngOnInit(): void {
    console.log('CrudCategoryComponent > ngOnInit!')

    this.buildForm()
  }

  private buildForm(): void {
    this.categoryFormGroup = this.fb.group({
      name: ['', Validators.required]
    })
  }

  save(): void {
    if (this.categoryFormGroup.invalid) {
      alert("Some fields are not valid.")
      return;
    }

    // Mapping form values to category variable

    // Creating the category in the backend
  }
}
