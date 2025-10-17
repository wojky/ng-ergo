import { CanActivateFn, CanDeactivateFn, ResolveFn, Routes } from '@angular/router';
import { CharacterList } from './characters/character-list';
import { EpisodeList } from './episodes/episode-list';
import { LocationList } from './locations/location-list';
import { CreateCharacterContainer } from './characters/create/create-character-container';
import { CreateEpisodeContainer } from './episodes/create/create-episode-container';
import { CreateLocationContainer } from './locations/create/create-location-container';
import { delay, of, take } from 'rxjs';
import { CharacterDetails } from './characters/character-details';

const canDeactivateCreateEpisodeForm: CanDeactivateFn<CreateEpisodeContainer> = (component) => {
  console.log('canDeactivateCreateEpisodeForm', component);

  return (
    component.service.createEpisodeForm.pristine ||
    confirm('Are you sure you want to leave? Unsaved changes will be lost.')
  );
};

const canStartFormGuard: CanActivateFn = (x) => {
  return confirm(`Do you want to start creating a new location?`);
};

const fromObservable: ResolveFn<string> = (route) => {
  return of('from observable').pipe(delay(1000), take(1));
};

const roleGuard: CanActivateFn = (route) => {
  console.log(route.data);
  return true;
};

export const routes: Routes = [
  {
    path: 'characters/create',
    component: CreateCharacterContainer,
  },
  {
    path: 'characters',
    component: CharacterList,
    children: [
      {
        path: ':characterId',
        canActivate: [roleGuard],
        component: CharacterDetails,
        resolve: {
          characterId: () => '200',
        },
        data: {
          roles: ['*'],
          characterId: '100',
        },
      },
    ],
    resolve: {
      value: () => 'from resolver',
      fromObservable,
      fromPromise: () => {
        return Promise.resolve('from promise');
      },
    },
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
    path: 'locations/create',
    component: CreateLocationContainer,
    data: {
      entity: 'location',
    },
    canActivate: [canStartFormGuard],
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];
