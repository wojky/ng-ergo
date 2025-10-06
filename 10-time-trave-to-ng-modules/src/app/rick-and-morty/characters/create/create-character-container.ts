import { Component, inject, signal } from '@angular/core';
import { CreateCharacterFormService } from './create-character.form.service';
import {
  FormBuilder,
  UntypedFormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';

export enum CreateCharacterSteps {
  BasicInfo = 1,
  Location,
  Episodes,
}

@Component({
  selector: 'app-create-character-container',
  providers: [CreateCharacterFormService],
  standalone: false,
  template: `
    <progress [value]="currentStep()" [max]="CreateCharacterSteps.Episodes"></progress>

    <section>
      <h2>Step {{ currentStep() }} of {{ CreateCharacterSteps.Episodes }}</h2>
      <form [formGroup]="createCharacterForm">
        @switch (currentStep()) {
          @case (CreateCharacterSteps.BasicInfo) {
            <p>Basic Info Form</p>

            @let nameCtrl = createCharacterForm.controls['name'];

            <div>
              <label>Name: <input formControlName="name" /></label>
              @if (nameCtrl.touched && nameCtrl.errors) {
                <p style="color: red">Name is required. Min. {{ nameMinLength }} characters</p>
              }
            </div>

            <div>
              <label
                >Status:

                <div>
                  <input type="radio" formControlName="status" value="Alive" /> Alive <br />
                  <input type="radio" formControlName="status" value="Dead" /> Dead <br />
                  <input type="radio" formControlName="status" value="Unknown" /> Unknown
                </div>
              </label>
            </div>

            <div>
              <label>Species: <input formControlName="species" /></label>
            </div>
          }
          @case (CreateCharacterSteps.Location) {
            <p>Location Form</p>
          }
          @case (CreateCharacterSteps.Episodes) {
            <p>Episodes Form</p>
          }

          @default {}
        }
      </form>
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
  createCharacterForm!: FormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    public createCharacterFormService: CreateCharacterFormService,
  ) {}
  nameMinLength = 2;

  ngOnInit() {
    this.createCharacterForm = this.formBuilder.group({
      name: this.formBuilder.control({ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(this.nameMinLength),
      ]),
      status: this.formBuilder.control(
        {
          value: 'Alive',
          disabled: false,
        },
        [Validators.required],
      ),
      species: this.formBuilder.control('', [Validators.required]),
    });

    this.createCharacterForm.controls['name'].valueChanges.subscribe((value) => {
      console.log(value);

      if (value?.length === 0) {
        this.createCharacterForm.controls['species'].disable();
      } else {
        this.createCharacterForm.controls['species'].enable();
      }
    });
  }

  CreateCharacterSteps = CreateCharacterSteps;

  currentStep = signal(CreateCharacterSteps.BasicInfo);

  submit() {
    if (this.createCharacterForm.valid) {
      // send request
    }
  }

  back() {
    this.currentStep.set(this.currentStep() - 1);
  }

  next() {
    this.currentStep.set(this.currentStep() + 1);
  }
}
