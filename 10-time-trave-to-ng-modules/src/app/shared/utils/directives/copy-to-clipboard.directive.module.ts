import { NgModule } from '@angular/core';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, of } from 'rxjs';

@NgModule({
  exports: [CopyToClipboardDirective],
  declarations: [CopyToClipboardDirective],
})
export class CopyToClipboardDirectiveModule {}

// const filterDefaultValue = { name: '', page: 1 };

// const filters = new BehaviorSubject(filterDefaultValue);

// const obs1 = of(true);

// const obs1signal = toSignal(filters, {
//   initialValue: filterDefaultValue,
// });

// const obs1observable = toObservable(obs1signal);
