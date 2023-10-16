import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
})
export class DateRangePickerComponent {
  @Input()
  defaultStartDate!: Date;
  @Input()
  defaultEndDate!: Date;

  @Output() yearsInRangeEmitter: EventEmitter<Date[]> = new EventEmitter<
    Date[]
  >();

  dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    const startDate = new Date(dateRangeStart.value);
    const endDate = new Date(dateRangeEnd.value);
    const yearsInRange = [startDate, endDate];
    this.yearsInRangeEmitter.emit(yearsInRange);
  }
}
