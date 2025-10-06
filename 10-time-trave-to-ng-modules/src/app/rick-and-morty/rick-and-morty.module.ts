import { NgModule } from '@angular/core';
import { RickAndMortyShell } from './rick-and-morty-shell';
import { RickAndMortyRoutingModule } from './rick-and-morty.routes';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RickAndMortyShell],
  imports: [RickAndMortyRoutingModule, CommonModule],
  providers: [],
  bootstrap: [],
})
export class RickAndMortyModule {}
