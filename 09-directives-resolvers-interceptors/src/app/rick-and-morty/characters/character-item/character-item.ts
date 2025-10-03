import {
  Component,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { Character } from '../character.contract';
import { CharacterList } from '../character-list';
import { Rating } from '../../../shared/ui/rating';

export type CharacterItemChildMessagePayload = {
  characterId: number;
};

@Directive({
  selector: '[appCopyToClipboard]',
})
export class CopyToClipboardDirective {
  private element = inject(ElementRef);

  @HostListener('click', ['$event'])
  copyToClipboard(event: MouseEvent) {
    navigator.clipboard.writeText(this.element.nativeElement.textContent || '');
    alert('Skopiowano do schowka!');
  }
}

@Component({
  selector: 'app-character-item',
  imports: [Rating, CopyToClipboardDirective],
  template: `
    <div style="display: flex; align-items: center; gap: 8px;">
      <p appCopyToClipboard>{{ item().name }}</p>
    </div>
    <app-rating [(rating)]="rating" />
    <figure style="max-width: 150px;">
      <img style="width: 100%;" [src]="item().image" [alt]="item().name" />
    </figure>
  `,
  styles: ``,
})
export class CharacterItem {
  item = input.required<Character>();
  modelExample = model('');

  rating = signal(0);

  childMessage = output<CharacterItemChildMessagePayload>();

  parentComponent = inject(CharacterList, { optional: true });
}
