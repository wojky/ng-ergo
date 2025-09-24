import { Routes } from '@angular/router';
import { CharacterList } from './characters/character-list';
import { EpisodeList } from './episodes/episode-list';
import { LocationList } from './locations/location-list';
import { CreateCharacterContainer } from './characters/create/create-character-container';
import { CreateEpisodeContainer } from './episodes/create/create-episode-container';

export const routes: Routes = [
  {
    path: 'characters',
    component: CharacterList,
  },
  {
    path: 'characters/create',
    component: CreateCharacterContainer,
  },
  {
    path: 'episodes',
    component: EpisodeList,
  },
  {
    path: 'episodes/create',
    component: CreateEpisodeContainer,
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
