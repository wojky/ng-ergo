import { Component, inject, signal } from '@angular/core';
import { EpisodeItemComponent } from './episode-item';
import { Filters, FiltersState } from '../../shared/ui/filters';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodesApiService } from './episodes.api.service';

@Component({
  selector: 'app-episode-list',
  imports: [EpisodeItemComponent, Filters],
  template: `
    <button (click)="goToEpisodeForm()">Create new episode</button>
    <app-filters (newSearch)="name.set($event.name)" />
    <ul>
      @if (episodesResource.hasValue() && episodesResource.value(); as response) {
        @for (episode of response.results; track episode.id) {
          <li>
            <app-episode-item [item]="episode" />
          </li>
        } @empty {
          <p>This list is empty</p>
        }
      } @else if (episodesResource.isLoading()) {
        <p>Loading...</p>
      } @else if (episodesResource.error(); as error) {
        <p>Error!</p>
      }
    </ul>
  `,
  styles: ``,
})
export class EpisodeList {
  router = inject(Router);
  route = inject(ActivatedRoute);
  name = signal('');

  service = inject(EpisodesApiService);

  search(filters: FiltersState) {
    this.service.updateFilters(filters.name);
  }

  protected episodesResource = this.service.episodesResource;

  goToEpisodeForm() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
