import { NgModule } from '@angular/core';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';

@NgModule({
  exports: [CopyToClipboardDirective],
  declarations: [CopyToClipboardDirective],
})
export class CopyToClipboardDirectiveModule {}
