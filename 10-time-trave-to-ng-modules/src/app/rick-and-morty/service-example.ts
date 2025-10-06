import { Injectable } from '@angular/core';

let id = 0;

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  constructor() {
    console.log('ExampleService instance created', ++id);
  }
}
