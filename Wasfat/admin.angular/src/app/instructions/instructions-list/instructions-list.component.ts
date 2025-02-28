import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  recipeId: number | null = null;

  constructor(
    private instructionAdminSvc: InstructionAdminService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    console.log('InstructionsListComponent > constructor');
  }

  ngOnInit(): void {
    console.log('InstructionsListComponent > ngOnInit');
    this.route.paramMap.subscribe(params => {
      const recipeIdParam = params.get('id');
      this.recipeId = recipeIdParam ? Number(recipeIdParam) : null;
      console.log('InstructionsListComponent > ngOnInit > recipeId', this.recipeId);
      this.loadInstructions();
    });
  }

  loadInstructions(): void {
    if (this.recipeId !== null) {
      this.instructionAdminSvc.getRecipeInstructions(this.recipeId).subscribe(data => this.instructions = data);
    } else {
      this.instructionAdminSvc.getAllInstructions().subscribe(data => this.instructions = data);
    }
  }

  newInstruction(): void {
    const dialogRef = this.dialog.open(CrudInstructionComponent, {
      width: '50vw',
      height: '60vh',
      data: { isEditMode: false, recipeId: this.recipeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInstructions();
      }
    });
  }

  editInstruction(id: number): void {
    const dialogRef = this.dialog.open(CrudInstructionComponent, {
      width: '50vw',
      height: '60vh',
      data: { isEditMode: true, instructionId: id, recipeId: this.recipeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInstructions();
      }
    });
  }
}
