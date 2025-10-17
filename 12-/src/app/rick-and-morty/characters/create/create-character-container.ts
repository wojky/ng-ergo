import { Component, inject, signal } from '@angular/core';
import { CreateCharacterFormService } from './create-character.form.service';
import {
  AsyncValidatorFn,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, map, of, switchMap, take, timer } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CharacterApiResponse } from '../character.contract';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export enum CreateCharacterSteps {
  BasicInfo = 1,
  Location,
  Episodes,
}

const nameExistenceAsyncValidator: (http: HttpClient) => AsyncValidatorFn = (http) => {
  return (control) => {
    console.log('Checking name existence for', control.value);

    const value = control.value ?? '';
    const params = new HttpParams().set('name', value.trim().toLowerCase());

    return timer(300).pipe(
      switchMap(() => {
        return http
          .get<CharacterApiResponse>(`https://rickandmortyapi.com/api/character/`, { params })
          .pipe(
            take(1),
            map((response) => {
              const nameExists = response.results.some(
                (c) => c.name.toLowerCase() === value.trim().toLowerCase(),
              );

              return nameExists ? { nameExists: true } : null;
            }),
            catchError((errResponse: HttpErrorResponse) => {
              return errResponse.status === 404 &&
                errResponse.error.error === 'There is nothing here'
                ? of(null)
                : of({ apiError: true });
            }),
          );
      }),
    );
  };
};

@Component({
  selector: 'app-create-character-container',
  imports: [ReactiveFormsModule, MatProgressSpinnerModule],
  providers: [CreateCharacterFormService],
  template: `
    <progress [value]="currentStep()" [max]="CreateCharacterSteps.Episodes"></progress>

    <section>
      <h2>Step {{ currentStep() }} of {{ CreateCharacterSteps.Episodes }}</h2>
      <form [formGroup]="createCharacterForm">
        @switch (currentStep()) {
          @case (CreateCharacterSteps.BasicInfo) {
            <p>Basic Info Form</p>

            @let nameCtrl = createCharacterForm.controls.name;

            <div>
              <label>Name: <input formControlName="name" /></label>
              @if (nameCtrl.pending) {
                <mat-spinner />
                <p>Checking name...</p>
              }
              @if (nameCtrl.touched && nameCtrl.errors; as errors) {
                @if (errors['nameExists']) {
                  <p style="color: red">Name already exists</p>
                }
                @if (errors['required'] || errors['minlength']) {
                  <p style="color: red">Name is required. Min. {{ nameMinLength }} characters</p>
                }
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
  service = inject(CreateCharacterFormService);
  formBuilder = inject(NonNullableFormBuilder);

  nameMinLength = 2;

  createCharacterForm = this.formBuilder.group({
    name: this.formBuilder.control(
      { value: '', disabled: false },
      {
        validators: [Validators.required, Validators.minLength(this.nameMinLength)],
        asyncValidators: [nameExistenceAsyncValidator(inject(HttpClient))],
      },
    ),
    status: this.formBuilder.control<'Alive' | 'Dead' | 'Unknown'>(
      {
        value: 'Alive',
        disabled: false,
      },
      [Validators.required],
    ),
    species: this.formBuilder.control('', [Validators.required]),
  });

  constructor() {
    console.log(this.createCharacterForm);

    this.createCharacterForm.controls.name.valueChanges.subscribe((value) => {
      // console.log(value);

      if (value.length === 0) {
        this.createCharacterForm.controls.species.disable();
      } else {
        this.createCharacterForm.controls.species.enable();
      }
    });
    // this.createCharacterForm.controls.species.addValidators(Validators.required);
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
