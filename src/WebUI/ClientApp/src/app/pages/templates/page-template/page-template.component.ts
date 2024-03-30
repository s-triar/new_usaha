import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBackDirective } from 'src/app/directives/button-back/button-back.directive';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, ButtonBackDirective, NzIconModule, NzButtonModule, NzIconModule],
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTemplateComponent {
  @Input() title: string = '';
  @Input() replaceUrl = false;
  @Input() linkBack: string|null = null;
  @Input() color = '';
  backIcon = 'arrow-left';
}
