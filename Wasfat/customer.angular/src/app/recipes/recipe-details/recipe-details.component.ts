import { EnvironmentService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeAdminService, RecipeDto } from '@proxy/wasfat/recipes';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  apiUrl: string;
  recipe: RecipeDto;

  constructor(
    private recipeSvc: RecipeAdminService, 
    private activatedRoute: ActivatedRoute,
    private environmentSvc: EnvironmentService
  ) {
    console.log('RecipeDetailsComponent > constructor');
  }

  ngOnInit(): void {
    this.getApiUrl();
    this.getRecipe();
  }

  private getApiUrl(): void {
    this.apiUrl = this.environmentSvc.getApiUrl('default');
    console.log(this.apiUrl)
  }

  private getRecipe(): void {
    const idParam = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.recipeSvc.get(idParam).subscribe(response => this.recipe = response);
  }
}
