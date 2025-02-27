import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInstructionComponent } from './crud-instruction.component';

describe('CrudInstructionComponent', () => {
  let component: CrudInstructionComponent;
  let fixture: ComponentFixture<CrudInstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudInstructionComponent]
    });
    fixture = TestBed.createComponent(CrudInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
