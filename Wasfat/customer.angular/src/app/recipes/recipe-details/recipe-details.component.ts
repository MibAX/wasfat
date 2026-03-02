import { EnvironmentService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';

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
  ) {}

  ngOnInit(): void {
    this.getApiUrl();
    this.getRecipe();
  }

  private getApiUrl(): void {
    this.apiUrl = this.environmentSvc.getApiUrl('default');
  }

  private getRecipe(): void {
    const ID_PARAM = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.recipeSvc.get(ID_PARAM).subscribe(result => this.recipe = result);
  }
}
