import { Component } from '@angular/core';
import { CharacterList } from './rick-and-morty/character-list/character-list';
import { LocationList } from './rick-and-morty/location-list/location-list';
import { EpisodeList } from './rick-and-morty/episode-list/episode-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: [],
})
export class App {}
