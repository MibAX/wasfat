import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsListComponent } from './instructions-list.component';

describe('InstructionsListComponent', () => {
  let component: InstructionsListComponent;
  let fixture: ComponentFixture<InstructionsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructionsListComponent]
    });
    fixture = TestBed.createComponent(InstructionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
