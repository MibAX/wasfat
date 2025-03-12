import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructionAdminService, InstructionDto } from '@proxy/instructions';

@Component({
  selector: 'app-instructions-list',
  templateUrl: './instructions-list.component.html',
  styleUrls: ['./instructions-list.component.scss']
})
export class InstructionsListComponent implements OnInit {

  recipeId: number | null = null;
  instructions: InstructionDto[] = [];

  constructor(
    private instructionAdminSvc: InstructionAdminService,
    private router: Router,
    private route: ActivatedRoute) {
    console.log('InstructionsListComponent > constructor');

  }

  ngOnInit(): void {
    console.log('InstructionsListComponent > ngOnInit');
    this.fetch();
  }

  private fetch() {
    this.recipeId = Number(this.route.snapshot.queryParamMap.get('recipeId'));
    if (this.recipeId) {
      this.fetchRecipeInstructions();
    } else {
      this.fetchAll();
    }
  }

  newInstruction(): void {
    this.router.navigate(["/instructions/create"]);
  }

  editInstruction(id: number): void {
    this.router.navigate(["/instructions/edit", id]);
  }

  //#region Sub Functions 

  private fetchRecipeInstructions() {
    this.instructionAdminSvc.getRecipeInstructions(this.recipeId).subscribe(instructions => this.instructions = instructions);
  }

  private fetchAll() {
    this.instructionAdminSvc.getAllInstructions().subscribe(instructions => this.instructions = instructions);
  }

  //#endregion
}
