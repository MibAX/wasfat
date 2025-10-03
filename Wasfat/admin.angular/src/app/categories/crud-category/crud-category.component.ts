import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-category',
  templateUrl: './crud-category.component.html',
  styleUrls: ['./crud-category.component.scss']
})
export class CrudCategoryComponent implements OnInit {
  categoryId: number | null = null;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryId = data.categoryId
  }
  
  ngOnInit(): void {
    
  }
}
