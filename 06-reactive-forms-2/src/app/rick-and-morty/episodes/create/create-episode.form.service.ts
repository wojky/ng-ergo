import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Injectable()
export class EpisodeFormService {
  formBuilder = inject(NonNullableFormBuilder);

  // format YYYY-MM-DD
  todayDate = new Date().toISOString().split('T')[0];

  createCharacterForm = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    air_date: this.formBuilder.control(this.todayDate, [Validators.required]),
    season: this.formBuilder.control(1, [Validators.required]),
    episode: this.formBuilder.control(1, [Validators.required]),
  });
}
