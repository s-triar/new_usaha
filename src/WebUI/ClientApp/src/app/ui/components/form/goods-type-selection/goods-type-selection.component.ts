import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, OnDestroy, OnInit, Optional, Output, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MAT_FORM_FIELD } from '@angular/material/form-field';
import { ControlValueAccessor, FormBuilder, FormGroup, FormsModule, NgControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { GoodsTypeDto } from 'src/app/domain/backend/Dtos';
import { Subject } from 'rxjs';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { CurrencyConversionService } from 'src/app/core/utility/currency-conversion.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';


@Component({
  selector: 'app-goods-type-selection',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, FormsModule],
  templateUrl: './goods-type-selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./goods-type-selection.component.scss'],
  providers:[
    {
      provide: MatFormFieldControl, useExisting: GoodsTypeSelectionComponent
    },
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => GoodsTypeSelectionComponent),
    //   multi: true
    // }
  ]
})
export class GoodsTypeSelectionComponent  implements OnInit, OnDestroy, MatFormFieldControl<number|null>, ControlValueAccessor {
  @Input() options: GoodsTypeDto[];
  @Input() disabled = false;
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.ngControl.invalid && this.touched;
  }
  get empty(): boolean{
    return this.value ===null;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }
  GoodsTypeIdProduct:number|null = null;
  
  @Output() optionChosen: EventEmitter<number> = new EventEmitter();
  // parts!: FormGroup;

  onChange!: (value: any) => void;
  onTouched!: () => void;
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  
  static nextId = 0;

  private _required = false;
  @HostBinding() id = `input-currency-${GoodsTypeSelectionComponent.nextId++}`;

  private _placeholder!: string;

  constructor(
    private fb: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private elRef: ElementRef<HTMLElement>,
    private focusMonitor: FocusMonitor,
    @Optional() @Inject(MAT_FORM_FIELD) public formField: MatFormField,
    private utilService: CurrencyConversionService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

   
   }
  value: number|null;
  userAriaDescribedBy?: string;
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.stateChanges.complete();

  }
  writeValue(obj: any): void {
    this.value = obj;
    this.optionChosen.emit(this.value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  selectGoodsType(event: MatSelectChange):void{
    const v = parseInt(event.value);
    this.writeValue(v);
    
  }

  setDescribedByIds(ids: string[]): void {
    const controlElement = this.elRef.nativeElement
      .querySelector('.input-currency-container');
    controlElement?.setAttribute('aria-describedby', ids.join(' '));
  }
  onContainerClick(event: MouseEvent): void {
    const ori: FocusOrigin = 'program';
  }
}
