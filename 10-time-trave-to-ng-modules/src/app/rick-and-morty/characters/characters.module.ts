import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterDetails } from './character-details';
import { CharacterItem } from './character-item/character-item';
import { CharacterList } from './character-list';
import { CreateCharacterContainer } from './create/create-character-container';
import { CopyToClipboardDirectiveModule } from '../../shared/utils/directives/copy-to-clipboard.directive.module';
import { RouterModule } from '@angular/router';
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
  declarations: [CharacterDetails, CharacterItem, CharacterList, CreateCharacterContainer],
})
export class CharactersModule {}
