import {
  CanActivate,
  CanDeactivate,
  Resolve,
  ResolveFn,
  RouterModule,
  Routes,
} from '@angular/router';
import { CharacterList } from './characters/character-list';
import { EpisodeList } from './episodes/episode-list';
import { LocationList } from './locations/location-list';
import { CreateCharacterContainer } from './characters/create/create-character-container';
import { CreateEpisodeContainer } from './episodes/create/create-episode-container';
import { CreateLocationContainer } from './locations/create/create-location-container';
import { delay, of, take } from 'rxjs';
import { CharacterDetails } from './characters/character-details';
import { Injectable, NgModule } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateCreateEpisodeForm implements CanDeactivate<CreateEpisodeContainer> {
  canDeactivate(component: CreateEpisodeContainer) {
    console.log('CanDeactivateCreateEpisodeForm', component);

    return (
      component.service.createEpisodeForm.pristine ||
      confirm('Are you sure you want to leave? Unsaved changes will be lost.')
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class CanStartFormGuard implements CanActivate {
  canActivate() {
    return confirm(`Do you want to start creating a new location?`);
  }
}

@Injectable({
  providedIn: 'root',
})
export class FromObservableResolve implements Resolve<string> {
  resolve() {
    return of('from observable').pipe(delay(1000), take(1));
  }
}

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}

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
        canActivate: [RoleGuard],
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
      fromObservable: FromObservableResolve,
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
    canDeactivate: [CanDeactivateCreateEpisodeForm],
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
    canActivate: [CanStartFormGuard],
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RickAndMortyRoutingModule {}
