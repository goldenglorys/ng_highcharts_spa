import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css'],
})
export class SettingsDialogComponent {
  operation: 'add' | 'edit' | undefined;
  chartTitle: string | undefined;

  defaultChartList: string[] = [
    'Snow depth at Vikjafjellet, Norway 1',
    'Snow depth at Vikjafjellet, Norway 2',
  ];
  chartList: string[] = [
    'Snow depth at Vikjafjellet, Norway 1',
    'Snow depth at Vikjafjellet, Norway 2',
    'Sales of petroleum products March, Norway',
    'Lockheed Martin (LMT) and NVIDIA (NVDA) revenue',
  ];
  charts = new FormControl();
  selectedCharts: string[] = [];
  currentChartData: Highcharts.Options = {};
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.operation = this.data.operation;
    this.chartTitle = this.data.chartTitle;

    this.form = this.fb.group({
      chartName: new FormControl(''),
      chartType: new FormControl(''),
      chartColor: new FormControl(''),
    });

    if (!localStorage.getItem('chartList')) {
      localStorage.setItem('chartList', JSON.stringify(this.defaultChartList));
    } else {
      const chartData: any = localStorage.getItem('chartList');
      this.charts.setValue(JSON.parse(chartData));
    }
  }

  onOkClick(): void {
    const selectedCharts: string[] | null = this.charts.value;
    this.dialogRef.close(selectedCharts);
    localStorage.setItem('chartList', JSON.stringify(selectedCharts));

    if (this.chartTitle == 'Snow depth at Vikjafjellet, Norway 1') {
      this.currentChartData =
        this.loadChartDataFromLocalStorage('chartOptionAlpha');
      this.saveChartDataToLocalStorage(
        this.updateChartDataTitleAndType(this.currentChartData),
        'chartOptionAlpha'
      );
    } else if (this.chartTitle == 'Snow depth at Vikjafjellet, Norway 2') {
      this.currentChartData =
        this.loadChartDataFromLocalStorage('chartOptionBeta');
      this.saveChartDataToLocalStorage(
        this.updateChartDataTitleAndType(this.currentChartData),
        'chartOptionBeta'
      );
    } else if (this.chartTitle == 'Sales of petroleum products March, Norway') {
      this.currentChartData =
        this.loadChartDataFromLocalStorage('chartOptionGamma');
      this.saveChartDataToLocalStorage(
        this.updateChartDataTitleAndType(this.currentChartData),
        'chartOptionGamma'
      );
    } else if (
      this.chartTitle == 'Lockheed Martin (LMT) and NVIDIA (NVDA) revenue'
    ) {
      this.currentChartData =
        this.loadChartDataFromLocalStorage('chartOptionDelta');
      this.saveChartDataToLocalStorage(
        this.updateChartDataTitleAndType(this.currentChartData),
        'chartOptionDelta'
      );
    }
    this.router.navigate(['/view-mode']);
  }

  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['/view-mode']);
  }

  saveChartDataToLocalStorage(chartData: Highcharts.Options, key: string) {
    localStorage.setItem(key, JSON.stringify(chartData));
  }

  loadChartDataFromLocalStorage(key: string): Highcharts.Options {
    const chartData = localStorage.getItem(key);
    return chartData ? JSON.parse(chartData) : null;
  }

  updateChartDataTitleAndType(
    chartData: Highcharts.Options
  ): Highcharts.Options {
    const updatedChartData = JSON.parse(JSON.stringify(chartData));
    const chartName = this.form.get('chartName')?.value;
    const chartType = this.form.get('chartType')?.value;
    if (chartName) updatedChartData.title.text = chartName;
    if (chartType) updatedChartData.chart.type = chartType;
    return updatedChartData;
  }
}
