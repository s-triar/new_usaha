import { Directive, HostListener, Input } from '@angular/core';
import { NavigationBackService } from './navigation-back.service';


@Directive({
  selector: '[appButtonBack]',
  standalone: true,
  providers: [
    NavigationBackService
  ]
})
export class ButtonBackDirective {
  @Input() replaceUrl!: boolean;
  @Input() backLink: string|null = null;
  constructor(private navigation: NavigationBackService) { }
  @HostListener('click')
  onClick(): void {
    console.log('click back');
    this.navigation.back(this.backLink, this.replaceUrl);
  }
}
