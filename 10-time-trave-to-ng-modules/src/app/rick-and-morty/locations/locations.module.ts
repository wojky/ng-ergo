import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CopyToClipboardDirectiveModule } from '../../shared/utils/directives/copy-to-clipboard.directive.module';
import { RouterModule } from '@angular/router';
import { CreateLocationContainer } from './create/create-location-container';
import { LocationList } from './location-list';
import { LocationItemComponent } from './location-item';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [ReactiveFormsModule, CopyToClipboardDirectiveModule, RouterModule, SharedModule],
  exports: [],
  declarations: [CreateLocationContainer, LocationItemComponent, LocationList],
})
export class LocationsModule {}
