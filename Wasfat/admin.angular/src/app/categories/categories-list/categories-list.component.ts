import { Component } from '@angular/core';
import { CategoryDto } from '@proxy/categories';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {
  categories: CategoryDto[] = [];
}
