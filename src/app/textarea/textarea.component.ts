import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

const TEXT_DEF_MIN = 0;
const TEXT_DEF_MAX = 50;
@Component({
  selector: 'app-textarea',
  templateUrl: 'textarea.component.html',
  styleUrls: ['textarea.component.css'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => TextareaComponent),
          multi: true,
      },
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})

export class TextareaComponent implements AfterViewInit {
  @ViewChild('input') inputRef: ElementRef;
  @Input() minLength: number = TEXT_DEF_MIN;
  @Input() maxLength: number = TEXT_DEF_MAX;
  @Input() rows: number = 3;
  @Input() readonly: boolean;
  @Input() disabled!: boolean;
  value: string;

  constructor() { }

  ngAfterViewInit(): void {
      this.updateInputValue();
  }

  updateInputValue(): void {
      if (!this.inputRef || this.value == null) return;
      this.inputRef.nativeElement.value = this.value;
  }

  setDisabledState?(isDisabled: boolean): void {
      this.disabled = isDisabled;
  }

  valueChange(value): void {
      this.onChange(value);
  }

  writeValue(value: string): void {
      if (this.value === value) return;
      this.value = value;
      this.updateInputValue();
  }

  setValue(event): void {
      this.onChange(event.target.value);
  }

  registerOnChange(
      onChange: (value: number | string) => void,
  ): void {
      this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
      this.onTouched = onTouched;
  }

  private onTouched = () => { };
  private onChange: (
      value: number | string,
  ) => void = () => { }
}
