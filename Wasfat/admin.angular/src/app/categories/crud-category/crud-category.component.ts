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
  form: FormGroup;
  categoryId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private categoryAdminSvc: CategoryAdminService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryId = data.categoryId
  }

  ngOnInit(): void {
    this.buildForm();
    this.patchIfEditMode();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    })
  }

  private patchIfEditMode() {
    if (this.categoryId) {
      this.isEditMode = true;
      this.fetchAndPatch();
    }
  }

  private fetchAndPatch(): void {
    this.categoryAdminSvc.get(this.categoryId).subscribe(response => {
      this.patchForm(response);
    });
  }

  private patchForm(category: CategoryDto): void {
    this.form.patchValue({
      name: category.name
    })
  }

  save(): void {
    if (this.form.invalid) {
      alert("some Fields are not valid.")
      return;
    }

    const category: CategoryDto = this.mapFormToCategory()
    if (this.isEditMode) {
      this.update(category);
    } else {
      this.create(category);
    }
  }

  private mapFormToCategory(): CategoryDto {
    const formValue = this.form.value;
    return {
      name: formValue.name,
    };
  }

  private update(category: CategoryDto) {
    this.categoryAdminSvc.update(this.categoryId, category).subscribe((category) => {
      console.log('Category updated successfully', category);
    });
  }

  private create(category: CategoryDto) {
    this.categoryAdminSvc.create(category).subscribe((category) => {
      console.log('Category created successfully', category);
    });
  }
}
