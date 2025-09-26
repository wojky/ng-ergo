import { Component, inject, input, signal } from '@angular/core';
import { EpisodeItemComponent } from './episode-item';
import { Filters, FiltersState } from '../../shared/ui/filters';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodesApiService } from './episodes.api.service';
import { ListWrapper } from './list-wrapper';

@Component({
  selector: 'test',
  template: ` {{ item() }} `,
})
export class Another {
  item = input.required<any>();
}

@Component({
  selector: 'app-episode-list',
  imports: [EpisodeItemComponent, Filters, ListWrapper],
  template: `
    <button (click)="goToEpisodeForm()">Create new episode</button>
    <app-filters (newSearch)="name.set($event.name)" />
    <ul>
      <app-list-wrapper [resource]="episodesResource" [itemComponent]="EpisodeItemComponent">
        <ng-template #itemTemplate let-item="item">
          <p>random element</p>
          <app-episode-item [item]="item" />
        </ng-template>

        <div errorContent>
          Custom error!
          <button (click)="refresh()">Retry</button>
        </div>

        <div loadingContent>
          <h1>Loading!!!</h1>
          <h2>Please wait...</h2>
        </div>
      </app-list-wrapper>
      <!-- @if (episodesResource.hasValue() && episodesResource.value(); as response) {
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
      } -->
    </ul>
  `,
  styles: ``,
})
export class EpisodeList {
  router = inject(Router);
  route = inject(ActivatedRoute);
  name = signal('');

  EpisodeItemComponent = EpisodeItemComponent;
  Another = Another;

  service = inject(EpisodesApiService);

  search(filters: FiltersState) {
    this.service.updateFilters(filters.name);
  }

  protected episodesResource = this.service.episodesResource;

  goToEpisodeForm() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  refresh() {
    this.service.refresh();
  }
}
