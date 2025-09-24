import { httpResource } from '@angular/common/http';
import { Injectable, linkedSignal, signal } from '@angular/core';
import { validate } from '../../shared/validate';
import { CreateEpisodeFormValue, EpisodeApiResponseSchema } from './episode.contract';

@Injectable({
  providedIn: 'root',
})
export class EpisodesApiService {
  private name = signal('');

  private readonly url = 'https://rickandmortyapi.com/api/episode';

  #episodesResource = httpResource(
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
      parse: validate(EpisodeApiResponseSchema, this.url),
    },
  );

  episodesResource = this.#episodesResource.asReadonly();

  count = linkedSignal(() => {
    if (this.episodesResource.hasValue() && this.episodesResource.value()) {
      return this.episodesResource.value().info.count;
    } else {
      return 0;
    }
  });

  createEpisode(payload: CreateEpisodeFormValue) {
    this.#episodesResource.update((v) => {
      if (!v) {
        return v;
      }

      const newEpisode = {
        id: v.info.count + 1,
        characters: [],
        created: new Date().toISOString(),
        episode: payload.episode,
        name: payload.name,
        air_date: payload.air_date,
        url: `${this.url}/${v.info.count + 1}`,
      };

      return {
        info: v.info,
        results: [...v.results, newEpisode],
      };
    });
  }

  updateFilters(name: string) {
    this.name.set(name);
  }

  refresh() {
    this.#episodesResource.reload();
  }
}
