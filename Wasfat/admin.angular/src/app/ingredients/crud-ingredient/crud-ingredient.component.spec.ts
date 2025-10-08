import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudIngredientComponent } from './crud-ingredient.component';

describe('CrudIngredientComponent', () => {
  let component: CrudIngredientComponent;
  let fixture: ComponentFixture<CrudIngredientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudIngredientComponent]
    });
    fixture = TestBed.createComponent(CrudIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
