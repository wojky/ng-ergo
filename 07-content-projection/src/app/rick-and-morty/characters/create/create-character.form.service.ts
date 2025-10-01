import { Injectable } from '@angular/core';

@Injectable()
export class CreateCharacterFormService {
  state = {};
  constructor() {
    console.log('CreateCharacterFormService instance created', this.state);
  }
}
