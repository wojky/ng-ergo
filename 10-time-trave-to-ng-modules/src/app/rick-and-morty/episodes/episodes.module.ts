import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CopyToClipboardDirectiveModule } from '../../shared/utils/directives/copy-to-clipboard.directive.module';
import { RouterModule } from '@angular/router';
import { EpisodeItemComponent } from './episode-item';
import { EpisodeList } from './episode-list';
import { CreateEpisodeContainer } from './create/create-episode-container';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CopyToClipboardDirectiveModule,
    RouterModule,
    SharedModule,
    CommonModule,
  ],
  exports: [],
  declarations: [EpisodeItemComponent, EpisodeList, CreateEpisodeContainer],
})
export class EpisodesModule {}
