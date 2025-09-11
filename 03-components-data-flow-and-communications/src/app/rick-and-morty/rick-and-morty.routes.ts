import { Routes } from '@angular/router';
import { CharacterList } from './characters/character-list';
import { EpisodeList } from './episodes/episode-list';
import { LocationList } from './locations/location-list';

export const routes: Routes = [
  {
    path: 'characters',
    component: CharacterList,
  },
  {
    path: 'episodes',
    component: EpisodeList,
  },
  {
    path: 'locations',
    component: LocationList,
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];
