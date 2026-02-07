import { eLayoutType } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { LookupDto } from '@proxy/common';
import { RecipeAdminService } from '@proxy/recipes';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-custom-layout',
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss']
})
export class CustomLayoutComponent implements OnInit {

  static type = eLayoutType.application;

  isCollapsed = true;
  searchForm: FormGroup;
  suggestedRecipes$: Observable<LookupDto[]>;
  
  get recipeAutoCompleteControl(): FormControl { return this.searchForm.get('recipeAutoCompleteControl') as FormControl }

  constructor(
    private recipeSvc: RecipeAdminService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.initAutoCompleteStream();
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
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