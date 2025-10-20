import { Component, input } from '@angular/core';

@Component({
  selector: 'app-character-details',
  template: `<p>Character Details works! {{ characterId() }}</p>`,
})
export class CharacterDetails {
  characterId = input.required<string>();

  roles = input.required<string[]>();

  ngOnInit() {
    console.log('Roles', this.roles());
  }
}
