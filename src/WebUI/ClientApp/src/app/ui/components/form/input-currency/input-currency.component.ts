import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, HostBinding, Optional, Self, ElementRef, Inject, ViewChild, forwardRef, Output, EventEmitter } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { number } from 'echarts';
import { Subject } from 'rxjs';
import { CurrencyConversionService } from 'src/app/core/utility/currency-conversion.service';

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    
    {provide: MatFormFieldControl, useExisting: InputCurrencyComponent},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InputCurrencyComponent),
      multi:true
    }
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ]
  // host: {
  //   '[class.example-floating]': 'shouldLabelFloat',
  //   '[id]': 'id'
  // }
})
export class InputCurrencyComponent implements OnInit, OnDestroy, MatFormFieldControl<number|null>, ControlValueAccessor  {
  @Input()
  get value(): number|null {
    return parseFloat(this.parts.controls.actual.value);
  }
  set value(nominal: number|null) {
    if (nominal === null){
      this.parts.setValue({actual: 0, formated: '0'});
    }else{
      this.parts = this.fb.group({
        actual: [nominal],
        formated: [nominal.toString()]
      });
      this.utilService.formCurrencyNew(nominal.toString(), this.parts, 'actual', 'formated');
      this.stateChanges.next();
    }
  }
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }
  get empty(): boolean{
    const {
      value: { actual, formated }
    } = this.parts;

    return !actual && !formated;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @Output() blur: EventEmitter<number> = new  EventEmitter<number>();

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

    this.parts = this.fb.group({
      actual: [0],
      formated: ['0']
    });
   }
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  static nextId = 0;

  // static ngAcceptInputType_disabled: BooleanInput;
  // static ngAcceptInputType_required: BooleanInput;
  // @Input('aria-describedby') userAriaDescribedBy!: string;

  // tslint:disable-next-line:variable-name
  private _required = false;
  // tslint:disable-next-line:variable-name
  private _disabled = false;

  @ViewChild('valFormat', {static: true}) valFormatInput!: HTMLInputElement;

  parts!: FormGroup;
  stateChanges = new Subject<void>();
  @HostBinding() id = `input-currency-${InputCurrencyComponent.nextId++}`;
  // tslint:disable-next-line:variable-name
  private _placeholder!: string;
  focused = false;
  touched = false;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  isDisabled = false;
  onChange = (_: any) => {};
  onTouched = () => {};
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onFormatChange(event: Event): void{
    this.format(event);
    this.onChange(this.value);
  }
  setDescribedByIds(ids: string[]): void {
    const controlElement = this.elRef.nativeElement
      .querySelector('.input-currency-container');
    controlElement?.setAttribute('aria-describedby', ids.join(' '));
  }
  onContainerClick(event: MouseEvent): void {
    const ori: FocusOrigin = 'program';
    this.focusMonitor.focusVia(this.valFormatInput, ori );
  }
  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  ngOnInit(): void {
  }
  onFocusIn(event: FocusEvent): void {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent): void {
    if (!this.elRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
      this.blur.emit(this.parts.controls.actual.value);
    }
  }
  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this.focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this.focusMonitor.focusVia(prevElement, 'program');
    }
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }
  format(event: Event): void{
    this.utilService.formatCurrencyReactiveFormFromEvent(event, this.parts, 'actual', 'formated' );
  }
}
