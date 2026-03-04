import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { LookupDto } from '@proxy/common';
import { RecipeAdminService } from '@proxy/recipes';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = true;
  searchForm: FormGroup;
  suggestedRecipes$: Observable<LookupDto[]>;

  get recipeAutoCompleteControl(): FormControl { return this.searchForm.get('recipeAutoCompleteControl') as FormControl }

  constructor(
    private fb: FormBuilder,
    private recipeSvc: RecipeAdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.initAutoCompleteStream();
  }

  private buildForm(): void {
    this.searchForm = this.fb.group({
      recipeAutoCompleteControl: ['']
    })
  };

  private initAutoCompleteStream(): void {
    this.suggestedRecipes$ = this.recipeAutoCompleteControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchKey => this.recipeSvc.getAutoComplete(searchKey)),
      map(results => results?.slice(0, 3) ?? [])
    )
  }

  onRecipeSelected(event: MatAutocompleteSelectedEvent): void {
    this.router.navigate(['recipes/details/', event.option.value,]);
    this.recipeAutoCompleteControl.setValue('');
  }
}
