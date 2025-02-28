import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeAdminService, RecipeDto } from '@proxy/recipes';

@Component({
  selector: 'app-crud-recipe',
  templateUrl: './crud-recipe.component.html',
  styleUrls: ['./crud-recipe.component.scss']
})
export class CrudRecipeComponent implements OnInit {
  recipeFormGroup: FormGroup;
  recipeId: number | null = null;
  isEditMode: boolean = false;
  instructions: { order: number; text: string }[] = [];

  constructor(
    private recipeAdminSvc: RecipeAdminService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('CrudRecipeComponent > ngOnInit');
    this.buildForm();

    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam) return;

      this.recipeId = Number(idParam);
      this.isEditMode = true;

      this.recipeAdminSvc.get(this.recipeId).subscribe((response: RecipeDto) => {
        this.recipeFormGroup.patchValue({
          name: response.name,
          description: response.description
        });

        if (response.instructions) {
          this.instructions = response.instructions.map((i, index) => ({
            order: index + 1,
            text: i.text
          }));
        }
      });
    });
  }

  private buildForm() {
    this.recipeFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  cancel(): void {
    this.router.navigate(['/recipes/list']);
  }

  saveRecipe(): void {
    if (this.recipeFormGroup.invalid) {
      alert('Some fields are not valid.');
      return;
    }

    const recipeData = {
      ...this.recipeFormGroup.value,
      instructions: this.instructions.map((i, index) => ({
        order: index + 1,
        text: i.text
      }))
    };




    if (this.isEditMode && this.recipeId) {
      this.recipeAdminSvc.update(this.recipeId, recipeData).subscribe(response => {
        console.log('Recipe updated successfully', response);
        this.router.navigate(['/recipes/list']);
      });
    } else {
      this.recipeAdminSvc.create(recipeData).subscribe(response => {
        console.log('Recipe created successfully', response);
        this.router.navigate(['/recipes/list']);
      });
    }
  }

  addInstruction(): void {
    this.instructions.push({ order: this.instructions.length + 1, text: '' });
  }

  removeInstruction(index: number): void {
    this.instructions.splice(index, 1);
    this.reorderInstructions();
  }

  private reorderInstructions(): void {
    this.instructions.forEach((instruction, index) => {
      instruction.order = index + 1;
    });
  }
}
