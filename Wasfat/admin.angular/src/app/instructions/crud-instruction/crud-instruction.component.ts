import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InstructionAdminService, InstructionDto } from '@proxy/instructions';

@Component({
  selector: 'app-crud-instruction',
  templateUrl: './crud-instruction.component.html',
  styleUrls: ['./crud-instruction.component.scss']
})
export class CrudInstructionComponent implements OnInit {
  instructionFormGroup: FormGroup;
  instructionId: number | null = null;
  isEditMode: boolean = false;
  recipeId: number = 27; // Hardcoded recipeId

  constructor(
    private instructionAdminSvc: InstructionAdminService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrudInstructionComponent>
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.instructionFormGroup = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  saveInstruction(): void {
    if (this.instructionFormGroup.invalid) {
      alert('Some fields are not valid.');
      return;
    }

    const instructionData = {
      ...this.instructionFormGroup.value,
      recipeId: this.recipeId // Include the hardcoded recipeId
    };

    if (this.isEditMode && this.instructionId) {
      this.instructionAdminSvc.update(this.instructionId, instructionData).subscribe(response => {
        console.log('Instruction updated successfully', response);
        this.dialogRef.close(true);
      });
    } else {
      this.instructionAdminSvc.create(instructionData).subscribe(response => {
        console.log('Instruction created successfully', response);
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
