import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => SearchInputComponent
      ),
      multi: true
    }
  ]
})
export class SearchInputComponent implements OnInit, ControlValueAccessor {
  @Input() labelName!: string;
  @Input() parentForm!: FormGroup;
  @Input() fieldName!: string;

  value = '';
  changed!: (value: string) => void;
  touched!: () => void;
  isDisabled = false;

  constructor() { }
  get formField(): FormControl{
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  writeValue(obj: string): void {
        this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.changed  = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  onChange(event: Event): void{
    const value: string =
    (event.target as HTMLInputElement).value;
    // this.value = value;
    this.changed(value);
  }
  setDisabledState(isDisabled: boolean): void{
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
  }



}
