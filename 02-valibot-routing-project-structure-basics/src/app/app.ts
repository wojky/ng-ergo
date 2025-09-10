import { Component } from '@angular/core';
import { CharacterList } from './character-list/character-list';
import { LocationList } from './location-list/location-list';
import { EpisodeList } from './episode-list/episode-list';
import { SignalsExample } from './signals-example';

@Component({
  selector: 'app-root',
  imports: [SignalsExample, CharacterList, LocationList, EpisodeList],
  template: `
    <app-signals-example />

    <app-character-list />
    <app-location-list />
    <app-episode-list />
  `,
  styles: [],
})
export class App {}
