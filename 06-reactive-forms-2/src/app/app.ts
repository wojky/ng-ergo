import { Component } from '@angular/core';
import { CharacterList } from './rick-and-morty/characters/character-list';
import { LocationList } from './rick-and-morty/locations/location-list';
import { EpisodeList } from './rick-and-morty/episodes/episode-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: [],
})
export class App {}
