import { CanDeactivateFn, Routes } from '@angular/router';
import { CharacterList } from './characters/character-list';
import { EpisodeList } from './episodes/episode-list';
import { LocationList } from './locations/location-list';
import { CreateCharacterContainer } from './characters/create/create-character-container';
import { CreateEpisodeContainer } from './episodes/create/create-episode-container';

const canDeactivateCreateEpisodeForm: CanDeactivateFn<CreateEpisodeContainer> = (component) => {
  console.log('canDeactivateCreateEpisodeForm', component);

  return (
    component.service.createCharacterForm.pristine ||
    confirm('Are you sure you want to leave? Unsaved changes will be lost.')
  );
};

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
    canDeactivate: [canDeactivateCreateEpisodeForm],
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
