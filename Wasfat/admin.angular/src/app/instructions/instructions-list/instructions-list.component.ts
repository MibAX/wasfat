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

    this.recipeId = Number(this.route.snapshot.queryParamMap.get('recipeId'))


    this.instructionAdminSvc.getAllInstructions().subscribe(data => this.instructions = data);


  }

  newInstruction(): void {
    this.router.navigate(["/instructions/create"]);
  }

  editInstruction(id: number): void {
    this.router.navigate(["/instructions/edit", id]);
  }

}
