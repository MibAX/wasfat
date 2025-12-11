import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryAdminService, CategoryDto } from '@proxy/categories';

@Component({
  selector: 'app-crud-category',
  templateUrl: './crud-category.component.html',
  styleUrls: ['./crud-category.component.scss']
})
export class CrudCategoryComponent implements OnInit {
  categoryFormGroup: FormGroup;
  categoryId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private categoryAdminSvc: CategoryAdminService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    console.log('CrudCategoryComponent > constructor')
    this.categoryId = data.categoryId
  }

  ngOnInit(): void {
    console.log('CrudCategoryComponent > ngOnInit!')

    this.buildForm()
    
    if(this.categoryId) {
      this.isEditMode = true

      this.categoryAdminSvc.get(this.categoryId).subscribe((response) => {
        this.categoryFormGroup.patchValue({
          name: response.name
        })
      })
    }
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

    const category: CategoryDto = {
      name: this.categoryFormGroup.value.name
    }

    this.categoryAdminSvc.create(category).subscribe((category) => {
      console.log('Category created successfully', category);
    });
  }
}
