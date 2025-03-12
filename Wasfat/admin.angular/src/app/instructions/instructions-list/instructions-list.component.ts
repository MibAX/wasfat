import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructionAdminService, InstructionDto } from '@proxy/instructions';

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
    private activatedRoute: ActivatedRoute) {
    console.log('InstructionsListComponent > constructor');
  }

  ngOnInit(): void {
    console.log('InstructionsListComponent > ngOnInit');
    this.fetch();
  }

  private fetch() {
    const recipeId = this.activatedRoute.snapshot.queryParamMap.get('recipeId');
    if (recipeId) {
      this.fetchRecipeInstructions(recipeId);
    } else {
      this.fetchAllInstructions();
    }
  }

  newInstruction(): void {
    this.router.navigate(["/instructions/create"]);
  }

  editInstruction(id: number): void {
    this.router.navigate(["/instructions/edit", id]);
  }

  //#region Sub Functions 

  private fetchRecipeInstructions(recipeId: string) {
    this.instructionAdminSvc.getRecipeInstructions(Number(recipeId)).subscribe(instructions => this.instructions = instructions);
  }

  private fetchAllInstructions() {
    this.instructionAdminSvc.getAllInstructions().subscribe(instructions => this.instructions = instructions);
  }

  //#endregion
}