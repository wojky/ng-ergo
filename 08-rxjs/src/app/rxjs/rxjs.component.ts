import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  combineLatest,
  concatMap,
  debounceTime,
  delay,
  exhaustMap,
  filter,
  map,
  mergeMap,
  of,
  startWith,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
    <h1>08-rxjs</h1>

    <input [formControl]="control" />

    <p>Search for: {{ nameUppercased$ | async }}</p>
  `,
})
export class RxJsComponent {
  http = inject(HttpClient);

  destroy$ = inject(DestroyRef);

  control = new FormControl('');

  nameUppercased$ = this.control.valueChanges.pipe(
    startWith(this.control.value),
    debounceTime(500),
    map((v) => (v ? v.toUpperCase() : '')),
    takeUntilDestroyed(),
  );

  constructor() {}

  ngOnInit() {
    combineLatest([of(1), of(456), this.nameUppercased$]).subscribe(([id, count, name]) => {
      console.log(id, count, name);
    });

    this.nameUppercased$
      .pipe(
        tap((v) => {
          console.log('tap', v);
        }),
        filter((v) => v.trim().toLowerCase() !== 'rick'),
        switchMap((v) => {
          return this.http
            .get(`https://rickandmortyapi.com/api/character/?name=${v}`)
            .pipe(take(1));
          // .pipe(delay(5000));
        }),

        takeUntilDestroyed(this.destroy$),
      )
      .subscribe({
        next: (value) => {
          console.log(value);
        },
        error: (err) => console.error(err),
        complete: () => console.log('complete'),
      });
  }
}

// source ----------------------   subscriber
