import { Directive, inject, ElementRef, HostListener } from '@angular/core';

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
