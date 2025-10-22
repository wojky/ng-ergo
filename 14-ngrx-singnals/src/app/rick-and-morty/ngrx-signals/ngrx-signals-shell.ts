import { Component, effect, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withProps,
  withComputed,
  withHooks,
} from '@ngrx/signals';
import { Character, CharacterApiResponse } from '../characters/character.contract';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, pipe, switchMap, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

export type CharactersState = {
  characters: Character[];
  isLoading: boolean;
  filter: { name: string; status: Character['status'] | '' };
};
export const initialState: CharactersState = {
  characters: [],
  isLoading: false,
  filter: { name: 'Rick', status: 'alive' },
};

export const CharacterStateStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withProps(() => {
    // injection/reactive context
    const firstEffect = effect(() => {});

    return {
      snackbar: inject(MatSnackBar),
      http: inject(HttpClient),
    };
  }),

  withComputed((store) => {
    return {
      count: () => {
        return store.characters().length;
      },
    };
  }),

  withMethods((store) => {
    return {
      fetchCharacters() {
        patchState(store, { isLoading: true });

        const params = new HttpParams()
          .append('name', store.filter.name())
          .append('status', store.filter.status());

        store.http
          .get<CharacterApiResponse>('https://rickandmortyapi.com/api/character', { params })
          .pipe(delay(1500))
          .subscribe({
            next: (response) => {
              patchState(store, {
                characters: response.results,
                isLoading: false,
              });
              store.snackbar.open('Characters loaded', 'Close', { duration: 2000 });
            },
            error: () => {
              patchState(store, { isLoading: false });
              store.snackbar.open('Failed to load characters', 'Close', { duration: 2000 });
            },
          });
      },
      loadCharacters: rxMethod<string>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap((query) => {
            const params = new HttpParams().append('name', query);

            return store.http.get<CharacterApiResponse>(
              'https://rickandmortyapi.com/api/character',
              { params },
            );
          }),
          tapResponse({
            next: (response) => {
              patchState(store, {
                characters: response.results,
                isLoading: false,
              });
              store.snackbar.open('Characters loaded', 'Close', { duration: 2000 });
            },
            error: () => {
              patchState(store, { isLoading: false });
              store.snackbar.open('Failed to load characters', 'Close', { duration: 2000 });
            },
          }),
        ),
      ),
      setName(name: string) {
        patchState(store, () => {
          return {
            filter: {
              ...store.filter(),
              name: name,
            },
          };
        });
        store.snackbar.open(`Name filter set to ${name}`, 'Close', { duration: 2000 });
      },
    };
  }),

  withHooks((store) => {
    return {
      onInit() {
        store.loadCharacters(store.filter.name);
      },
    };
  }),
);

@Component({
  selector: 'app-ngrx-signals',
  template: ` <h2>@ngrx/signals</h2>
    <p>Loading: {{store.isLoading()}}</p>
    <p>Name: {{store.filter.name()}}</p>
    <p>Status: {{store.filter.status()}}</p>
    <p>Count: {{store.count()}}</p>

  `,
  // providers: [CharacterStateStore],
  styles: [
    `
      :host {
        display: block;
        padding-top: 1rem;
      }
    `,
  ],
})
export class NgrxSignalsShell {
  store = inject(CharacterStateStore);

  ngOnInit() {
    // setTimeout(() => {
    //   // this.store.setName('Morty');
    //   // this.store.fetchCharacters();
    //   this.store.loadCharacters(this.store.filter.name);
    // }, 2000);

    setTimeout(() => {
      this.store.setName('Summer');
    }, 5000);
  }
}
