import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructionAdminService, InstructionDto } from '@proxy/instructions';

@Component({
  selector: 'app-crud-instruction',
  templateUrl: './crud-instruction.component.html',
  styleUrls: ['./crud-instruction.component.scss']
})
export class CrudInstructionComponent implements OnInit {
  formGroup: FormGroup;
  id: number | null = null;
  recipeId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private instructionAdminSvc: InstructionAdminService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('CrudInstructionComponent > ngOnInit')
    this.buildFrom();
    this.patchIfEditMode();
  }

  private buildFrom() {
    this.formGroup = this.fb.group({
      recipeId: ['', [Validators.required, Validators.minLength(1)]],
      order: ['', [Validators.required, Validators.minLength(1)]],
      text: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  private patchIfEditMode() {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam) return;
      this.setEditMode(idParam);
      this.fetchAndPatch();
    });
  }

  cancel(): void {
    this.router.navigate(["/instructions/list"]);
  }

  save(): void {
    if (this.formGroup.invalid) {
      alert("some Fields are not valid.")
      return;
    }
    if (this.isEditMode) {
      this.update();
    } else {
      this.create();
    }
  }

  //#region Sub Functions 

  private setEditMode(idParam: string) {
    this.id = Number(idParam);
    this.isEditMode = true;
  }

  private fetchAndPatch() {
    this.instructionAdminSvc.get(this.id).subscribe(response => {
      this.patch(response);
    });
  }

  private patch(instruction: InstructionDto) {
    this.formGroup.patchValue({
      recipeId: instruction.recipeId,
      order: instruction.order,
      text: instruction.text,
    });
  }

  private update() {
    this.instructionAdminSvc.update(this.id, this.formGroup.value).subscribe((instruction) => {
      console.log('Instruction updated successfully', instruction);
      this.router.navigate(["/instructions/list"]);
    });
  }

  private create() {
    this.instructionAdminSvc.create(this.formGroup.value).subscribe((instruction) => {
      console.log('Instruction created successfully', instruction);
      this.router.navigate(["/instructions/list"]);
    });
  }

  //#endregion

}
