import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInput as MatInput, MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap } from 'rxjs';
import { EmployeeService } from 'src/app/ui/pages/dashboard/pages/employee/employee.service';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { PopUpNotifComponent } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.component';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { ButtonBackDirective } from 'src/app/ui/directives/button-back/button-back.directive';
import { NavigationBackService } from 'src/app/ui/directives/button-back/navigation-back.service';
import { MainStateService } from '../../../../components/main-nav/main-state.service';

@UntilDestroy()
@Component({
  templateUrl: './join-business.component.html',
  styleUrls: ['./join-business.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    NavPageComponent,
    MatInputModule,
    MatFormFieldModule,
    // FlexLayoutModule,
    MatButtonModule,
    PopUpNotifComponent,
    ButtonBackDirective,
  ],
  providers:[
    NavigationBackService
  ]
})
export class JoinBusinessComponent implements OnInit {
  @ViewChild('digitOne', {static: true, read: MatInput}) digitOne!: MatInput;
  @ViewChild('digitTwo', {static: true, read: MatInput}) digitTwo!: MatInput;
  @ViewChild('digitThree', {static: true, read: MatInput}) digitThree!: MatInput;
  @ViewChild('digitFour', {static: true, read: MatInput}) digitFour!: MatInput;
  @ViewChild('digitFive', {static: true, read: MatInput}) digitFive!: MatInput;
  @ViewChild('digitSix', {static: true, read: MatInput}) digitSix!: MatInput;


  constructor(
    private mainStateService: MainStateService,
    private employeeService: EmployeeService,
    private notifService:PopUpNotifService,
    private navBackService:NavigationBackService
  ) { }

  ngOnInit(): void {
    this.mainStateService.changeViewState({isFooterBarNeedToBeShown: false});
  }
  onDigitPaste(event: ClipboardEvent): void{
    // console.log(event.clipboardData);
    const clipboardData = event.clipboardData || window.Clipboard;
    // const pastedText = clipboardData.getData('text');
    // console.log(clipboardData);
    this.submit();
  }
  onDigitInput(event: any, prev: HTMLInputElement|null, next: HTMLInputElement|null): void{
    let element;

    if (event.code !== 'Backspace') {
         element = next;
    }

    if (event.code === 'Backspace') {
         element = prev;
         element.value = "";
     }

    if (element == null) {
         this.submit();
     }
     else {
         element.focus();
     }
 }
 submit():void{
  let code_str="";
  code_str+=this.digitOne.value.toString();
  code_str+=this.digitTwo.value.toString();
  code_str+=this.digitThree.value.toString();
  code_str+=this.digitFour.value.toString();
  code_str+=this.digitFive.value.toString();
  code_str+=this.digitSix.value.toString();

  const code = parseInt(code_str);

  this.employeeService.joinEmployee({Code: code})
      .pipe(
        untilDestroyed(this),
        switchMap(x=>this.notifService.show({type:'success', title:"Sukses",message:"Bergabung ke usaha berhasil."}).afterClosed())
      )
      .subscribe(x=> this.navBackService.back(null, true))

 }

}
