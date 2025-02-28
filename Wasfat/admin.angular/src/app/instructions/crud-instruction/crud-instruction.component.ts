import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  recipeId: number;

  constructor(
    private instructionAdminSvc: InstructionAdminService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrudInstructionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;
    this.instructionId = data.instructionId;
    this.recipeId = data.recipeId;
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.isEditMode && this.instructionId) {
      this.loadInstruction();
    } else {
      this.setOrderForNextInstruction();
    }
  }

  private buildForm() {
    this.instructionFormGroup = this.fb.group({
      recipeId: [this.recipeId],
      order: [0, [Validators.required, Validators.min(1)]],
      text: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  private loadInstruction() {
    this.instructionAdminSvc.get(this.instructionId).subscribe(instruction => {
      if (instruction) {
        this.instructionFormGroup.patchValue(instruction);
      }
    });
  }

  private setOrderForNextInstruction() {
    this.instructionAdminSvc.getNextInstructionOrder(this.recipeId).subscribe(order => {
      this.instructionFormGroup.patchValue({ order });
    });
  }

  saveInstruction(): void {
    if (this.instructionFormGroup.invalid) {
      alert('Some fields are not valid.');
      return;
    }

    const instructionData = {
      ...this.instructionFormGroup.getRawValue(),
      recipeId: this.recipeId
    };

    if (this.isEditMode && this.instructionId) {
      // update 
      this.instructionAdminSvc.update(this.instructionId, instructionData).subscribe(response => {
        console.log('Instruction updated successfully', response);
        this.dialogRef.close(true);
      }, error => {
        console.error('Error updating instruction:', error);
      });
    } else {
      //create
      this.instructionAdminSvc.create(instructionData).subscribe(response => {
        console.log('Instruction created successfully', response);
        this.dialogRef.close(true);
      }, error => {
        console.error('Error creating instruction:', error);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
