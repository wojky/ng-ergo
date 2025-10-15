import { Component, inject } from '@angular/core';
import { EpisodeItemComponent } from './episode-item';
import { Filters, FiltersState } from '../../shared/ui/filters';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodesApiService } from './episodes.api.service';
import { ListWrapper } from '../../shared/ui/list-wrapper';

@Component({
  selector: 'app-episode-list',
  imports: [Filters, ListWrapper],
  template: `
    <button (click)="goToEpisodeForm()">Create new episode</button>
    <app-filters (newSearch)="service.updateFilters($event.name)" />
    <ul>
      <app-list-wrapper [resource]="episodesResource" [itemComponent]="EpisodeItemComponent">
        <div errorContent>
          Custom error!
          <button (click)="refresh()">Retry</button>
        </div>

        <div loadingContent>
          <h1>Loading!!!</h1>
          <h2>Please wait...</h2>
        </div>
      </app-list-wrapper>
    </ul>
  `,
  styles: ``,
})
export class EpisodeList {
  router = inject(Router);
  route = inject(ActivatedRoute);

  EpisodeItemComponent = EpisodeItemComponent;

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
