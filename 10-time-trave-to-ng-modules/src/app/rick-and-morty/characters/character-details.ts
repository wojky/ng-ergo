import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-character-details',
  standalone: false,
  template: `<p>Character Details works! {{ characterId | async }}</p>`,
})
export class CharacterDetails {
  characterId = of('');

  constructor(private activatedRoute: ActivatedRoute) {
    this.characterId = this.activatedRoute.params.pipe(
      map((params) => {
        return params['characterId'];
      }),
    );
  }
}
