import { Routes } from '@angular/router';
import { CharacterList } from './character-list/character-list';
import { EpisodeList } from './episode-list/episode-list';

export const routes: Routes = [
  {
    path: 'characters',
    component: CharacterList,
  },
  {
    path: 'episodes',
    component: EpisodeList,
  },
];
