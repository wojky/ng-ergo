import { Component, inject, signal } from '@angular/core';
import { CreateCharacterFormService } from './create-character.form.service';

export enum CreateCharacterSteps {
  BasicInfo = 1,
  Location,
  Episodes,
  // Image,
}

@Component({
  selector: 'app-create-character-container',
  imports: [],
  providers: [CreateCharacterFormService],
  template: `
    <progress [value]="currentStep()" [max]="CreateCharacterSteps.Episodes"></progress>

    <section>
      <h2>Step {{ currentStep() }} of {{ CreateCharacterSteps.Episodes }}</h2>
      @switch (currentStep()) {
        @case (CreateCharacterSteps.BasicInfo) {
          <p>Basic Info Form</p>
        }
        @case (CreateCharacterSteps.Location) {
          <p>Location Form</p>
        }
        @case (CreateCharacterSteps.Episodes) {
          <p>Episodes Form</p>
        }
        <!-- @case (CreateCharacterSteps.Image) {
          <p>Image Form</p>
        } -->
        @default {}
      }
    </section>

    <footer style="display: flex; gap: 1rem">
      <button (click)="back()" [disabled]="currentStep() === CreateCharacterSteps.BasicInfo">
        Back
      </button>
      @if (currentStep() === CreateCharacterSteps.Episodes) {
        <button>Submit</button>
      } @else {
        <button (click)="next()">Next</button>
      }
    </footer>
  `,
  styles: ``,
})
export class CreateCharacterContainer {
  service = inject(CreateCharacterFormService);

  CreateCharacterSteps = CreateCharacterSteps;

  currentStep = signal(CreateCharacterSteps.BasicInfo);

  back() {
    this.currentStep.set(this.currentStep() - 1);
  }

  next() {
    this.currentStep.set(this.currentStep() + 1);
  }
}
