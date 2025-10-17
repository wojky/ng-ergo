import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Character } from '../../characters/character.contract';
import { whiteSpaceValidator } from '../../../shared/validators/white-spaces.validator';

@Injectable()
export class LocationFormService {
  formBuilder = inject(NonNullableFormBuilder);

  // format YYYY-MM-DD
  todayDate = new Date().toISOString().split('T')[0];

  createLocationForm = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required, whiteSpaceValidator]),
    type: this.formBuilder.control('', [Validators.required]),
    dimension: this.formBuilder.control('', [Validators.required]),
    episode: this.formBuilder.control(1, [Validators.required]),
    characters: this.formBuilder.array<Character>([]),
  });
}
