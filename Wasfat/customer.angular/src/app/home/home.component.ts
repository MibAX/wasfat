import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { LookupDto } from '@proxy/wasfat/common';
import { RecipeAdminService, RecipeDto } from '@proxy/wasfat/recipes';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  suggestedRecipes$: Observable<LookupDto[]>;

  get recipeAutoCompleteControl(): FormControl { return this.searchForm.get('recipeAutoCompleteControl') as FormControl } 

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private recipeSvc: RecipeAdminService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.buildForm();
    this.initAutoCompleteStream();
  }

  login() {
    this.authService.navigateToLogin();
  }

  private buildForm(): void {
    this.searchForm = this.fb.group({
      recipeAutoCompleteControl: ['']
    })
  }

  private initAutoCompleteStream(): void {
    this.suggestedRecipes$ = this.recipeAutoCompleteControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchKey => this.recipeSvc.getAutoComplete(searchKey)),
      map(results => results?.slice(0, 3) ?? [])
    )
  }

  onRecipeSelected(event: MatAutocompleteSelectedEvent) {
    this.router.navigate(['recipes/details/', event.option.value,]);
    this.recipeAutoCompleteControl.setValue('');
  }
}
