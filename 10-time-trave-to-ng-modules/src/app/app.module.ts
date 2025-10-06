import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { RickAndMortyModule } from './rick-and-morty/rick-and-morty.module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routes';
import { CharactersModule } from './rick-and-morty/characters/characters.module';
import { LocationsModule } from './rick-and-morty/locations/locations.module';
import { EpisodesModule } from './rick-and-morty/episodes/episodes.module';

@NgModule({
  declarations: [App],
  bootstrap: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RickAndMortyModule,
    SharedModule,
    CharactersModule,
    LocationsModule,
    EpisodesModule,
    HttpClientModule,
  ],
  providers: [],
})
export class AppModule {}
