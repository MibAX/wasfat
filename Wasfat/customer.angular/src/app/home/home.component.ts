import { AuthService, EnvironmentService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  apiUrl: string;
  recipes: RecipeDto[];
  
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(
    private authService: AuthService,
    private recipeSvc: RecipeAdminService,
    private environmentSvc: EnvironmentService
  ) {}

  login() {
    this.authService.navigateToLogin();
  }

  ngOnInit(): void {
    this.getApiUrl();
    this.getRecipes();
  }

  private getApiUrl(): void {
    this.apiUrl = this.environmentSvc.getApiUrl('default');
  }

  private getRecipes(): void {
    this.recipeSvc.getAllRecipes().subscribe(result => this.recipes = result);
  }
}
