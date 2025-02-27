import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InstructionAdminService, InstructionDto } from '@proxy/instructions';
import { CrudInstructionComponent } from '../crud-instruction/crud-instruction.component';

@Component({
  selector: 'app-instructions-list',
  templateUrl: './instructions-list.component.html',
  styleUrls: ['./instructions-list.component.scss']
})
export class InstructionsListComponent implements OnInit {

  instructions: InstructionDto[] = [];

  constructor(
    private instructionAdminSvc: InstructionAdminService,
    private router: Router,
    private dialog: MatDialog) {
    console.log('InstructionsListComponent > constructor');
  }

  ngOnInit(): void {
    console.log('InstructionsListComponent > ngOnInit');
    this.instructionAdminSvc.getAllInstructions().subscribe(data => this.instructions = data);
  }

  newInstruction(): void {
    const dialogRef = this.dialog.open(CrudInstructionComponent, {
      width: '400px',
      data: { isEditMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.instructionAdminSvc.getAllInstructions().subscribe(data => this.instructions = data);
      }
    });
  }

  editInstruction(id: number): void {
    const dialogRef = this.dialog.open(CrudInstructionComponent, {
      width: '400px',
      data: { isEditMode: true, instructionId: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.instructionAdminSvc.getAllInstructions().subscribe(data => this.instructions = data);
      }
    });
  }
}
