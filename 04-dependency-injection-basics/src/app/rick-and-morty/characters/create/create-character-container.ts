import { Component, inject } from '@angular/core';
import { CreateCharacterFormService } from './create-character.form.service';

@Component({
  selector: 'app-create',
  imports: [],
  providers: [CreateCharacterFormService],
  template: ` <p>create works!</p> `,
  styles: ``,
})
export class CreateCharacterContainer {
  service = inject(CreateCharacterFormService);
}
