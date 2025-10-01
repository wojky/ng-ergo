import { httpResource } from '@angular/common/http';
import { Injectable, linkedSignal, signal } from '@angular/core';
import { validate } from '../../shared/validate';
import { CreateLocationFormValue, LocationApiResponseSchema } from './location.contract';

@Injectable({
  providedIn: 'root',
})
export class LocationsApiService {
  private name = signal('');

  private readonly url = 'https://rickandmortyapi.com/api/location';

  #locationsResource = httpResource(
    () => {
      return {
        method: 'GET',
        url: this.url,
        params: {
          name: this.name(),
        },
      };
    },
    {
      parse: validate(LocationApiResponseSchema, this.url),
    },
  );

  locationsResource = this.#locationsResource.asReadonly();

  count = linkedSignal(() => {
    if (this.locationsResource.hasValue() && this.locationsResource.value()) {
      return this.locationsResource.value().info.count;
    } else {
      return 0;
    }
  });

  createLocation(payload: CreateLocationFormValue) {
    this.#locationsResource.update((v) => {
      if (!v) {
        return v;
      }

      const newLocation = {
        id: v.info.count + 1,
        residents: payload.residents,
        created: new Date().toISOString(),
        name: payload.name,
        type: payload.type,
        dimension: payload.dimension,
        url: `${this.url}/${v.info.count + 1}`,
      };

      return {
        info: v.info,
        results: [...v.results, newLocation],
      };
    });
  }

  updateFilters(name: string) {
    this.name.set(name);
  }

  refresh() {
    this.#locationsResource.reload();
  }
}
