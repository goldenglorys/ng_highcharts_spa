import { Component } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.css'],
})
export class ViewModeComponent {
  objectKeys = Object.keys;
  public defaultStartDate: Date = new Date('2000-01-01');
  public defaultEndDate: Date = new Date('2005-01-01');
  defaultChartList: string[] = [
    'Snow depth at Vikjafjellet, Norway 1',
    'Snow depth at Vikjafjellet, Norway 2',
  ];
  Highcharts: typeof Highcharts = Highcharts;

  oneToOneFlag: boolean = true;

  chartOptionAlpha: Highcharts.Options = {};

  chartOptionBeta: Highcharts.Options = {};

  chartOptionGamma: Highcharts.Options = {};

  chartOptionDelta: Highcharts.Options = {};

  constructor(private dataService: DataService) {
    if (!localStorage.getItem('chartList')) {
      localStorage.setItem('chartList', JSON.stringify(this.defaultChartList));
    }
  }

  ngOnInit(): void {
    const alphaStoredChartData: Highcharts.Options =
      this.loadChartDataFromLocalStorage('chartOptionAlpha');
    const betaStoredChartData: Highcharts.Options =
      this.loadChartDataFromLocalStorage('chartOptionBeta');
    const gammaStoredChartData: Highcharts.Options =
      this.loadChartDataFromLocalStorage('chartOptionGamma');
    const deltaStoredChartData: Highcharts.Options =
      this.loadChartDataFromLocalStorage('chartOptionDelta');
    if (alphaStoredChartData && betaStoredChartData) {
      this.chartOptionAlpha = this.filterChartDataByDateRange(
        alphaStoredChartData,
        this.defaultStartDate,
        this.defaultEndDate
      );
      this.chartOptionBeta = this.filterChartDataByDateRange(
        betaStoredChartData,
        this.defaultStartDate,
        this.defaultEndDate
      );
      this.chartOptionGamma = gammaStoredChartData;
      this.chartOptionDelta = deltaStoredChartData;
    } else {
      this.dataService
        .fetchSnjomengdData()
        .subscribe((data: Highcharts.SeriesOptionsType[] | undefined) => {
          const ALPHA_DATA: Highcharts.Options = {
            chart: {
              type: 'spline',
              inverted: false,
            },
            title: {
              text: 'Snow depth at Vikjafjellet, Norway 1',
            },
            subtitle: {
              text: 'Data Source from <a href="https://www.vikjavev.no/ver/snjomengd" target="_blank">Vikjavev.no</a>',
            },
            xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b',
              },
              title: {
                text: 'Date',
              },
            },
            yAxis: {
              title: {
                text: 'Snow depth (m)',
              },
              min: 0,
            },
            tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: '{point.x:%e. %b}: {point.y:.2f} m',
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: true,
                  radius: 3.5,
                },
              },
            },
            series: data,
          };

          const BETA_DATA: Highcharts.Options = {
            chart: {
              type: 'area',
              inverted: false,
            },
            title: {
              text: 'Snow depth at Vikjafjellet, Norway 2',
            },
            subtitle: {
              text: 'Data Source from <a href="https://www.vikjavev.no/ver/snjomengd" target="_blank">Vikjavev.no</a>',
            },
            xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b',
              },
              title: {
                text: 'Date',
              },
            },
            yAxis: {
              title: {
                text: 'Snow depth (m)',
              },
              min: 0,
            },
            tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: '{point.x:%e. %b}: {point.y:.2f} m',
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: true,
                  radius: 3.5,
                },
              },
            },
            series: data,
          };

          const GAMMA_DATA: Highcharts.Options = {
            chart: {
              type: 'area',
              inverted: false,
            },
            title: {
              text: 'Sales of petroleum products March, Norway',
            },
            subtitle: {
              text: 'Data Source from <a href="https://www.ssb.no/energi-og-industri/olje-og-gass/statistikk/sal-av-petroleumsprodukt/artikler/auka-sal-av-petroleumsprodukt-til-vegtrafikk" target="_blank">SSB.no</a>',
            },
            xAxis: {
              categories: [
                'Jet fuel',
                'Duty-free diesel',
                'Petrol',
                'Diesel',
                'Gas oil',
              ],
            },
            yAxis: {
              title: {
                text: 'Million liters',
              },
            },
            tooltip: {
              valueSuffix: ' million liters',
            },
            colors: ['#ffd700', '#00ff58', '#0028ff', '#ff00a7'],
            series: [
              {
                type: 'column',
                name: '2020',
                data: [59, 83, 65, 228, 184],
              },
              {
                type: 'column',
                name: '2021',
                data: [24, 79, 72, 240, 167],
              },
              {
                type: 'column',
                name: '2022',
                data: [58, 88, 75, 250, 176],
              },
              {
                type: 'column',
                name: '2023',
                data: [58, 88, 75, 250, 176],
              },
              {
                type: 'pie',
                name: 'Total',
                data: [
                  {
                    name: '2020',
                    y: 619,
                    dataLabels: {
                      enabled: true,
                      distance: -50,
                      format: '{point.total} M',
                      style: {
                        fontSize: '15px',
                      },
                    },
                  },
                  {
                    name: '2021',
                    y: 586,
                  },
                  {
                    name: '2022',
                    y: 647,
                  },
                  {
                    name: '2023',
                    y: 647,
                  },
                ],
                center: [75, 65],
                size: 100,
                innerSize: '70%',
                showInLegend: false,
                dataLabels: {
                  enabled: false,
                },
              },
            ],
          };

          const DELTA_DATA: Highcharts.Options = {
            chart: {
              type: 'area',
              inverted: true,
            },
            title: {
              text: 'Lockheed Martin (LMT) and NVIDIA (NVDA) revenue',
              align: 'left',
            },
            subtitle: {
              text: 'Data Source from <a href="https://companiesmarketcap.com/" target="_blank">Companiesmarketcap</a>',
            },
            accessibility: {
              keyboardNavigation: {
                seriesNavigation: {
                  mode: 'serialize',
                },
              },
            },
            tooltip: {
              pointFormat: '&#8226; {series.name}: <b>${point.y} B</b>',
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -100,
              y: 100,
              floating: true,
              borderWidth: 1,
            },
            yAxis: {
              labels: {
                format: '${text}',
              },
              title: {
                text: 'Revenue (billions USD)',
              },
            },
            xAxis: {},
            plotOptions: {
              series: {
                pointStart: 2020,
              },
              area: {
                fillOpacity: 0.5,
              },
            },
            series: [
              {
                type: 'area',
                name: 'Lockheed Martin (LMT)',
                data: [65.39, 67.04, 65.98, 67.39],
              },
              {
                type: 'area',
                name: 'NVIDIA (NVDA)',
                data: [14.77, 24.27, 28.56, 32.68],
              },
            ],
          };

          if (data) {
            this.chartOptionAlpha = this.filterChartDataByDateRange(
              ALPHA_DATA,
              this.defaultStartDate,
              this.defaultEndDate
            );
            this.saveChartDataToLocalStorage(ALPHA_DATA, 'chartOptionAlpha');
            this.chartOptionBeta = this.filterChartDataByDateRange(
              BETA_DATA,
              this.defaultStartDate,
              this.defaultEndDate
            );
            this.saveChartDataToLocalStorage(BETA_DATA, 'chartOptionBeta');
            this.saveChartDataToLocalStorage(GAMMA_DATA, 'chartOptionGamma');
            this.saveChartDataToLocalStorage(DELTA_DATA, 'chartOptionDelta');
            this.chartOptionGamma = GAMMA_DATA;
            this.chartOptionDelta = DELTA_DATA;
          }
        });
    }
  }

  saveChartDataToLocalStorage(chartData: Highcharts.Options, key: string) {
    localStorage.setItem(key, JSON.stringify(chartData));
  }

  loadChartDataFromLocalStorage(key: string): Highcharts.Options {
    const chartData = localStorage.getItem(key);
    return chartData ? JSON.parse(chartData) : null;
  }

  onYearsInRangeReceived(yearsInRange: Date[]) {
    this.chartOptionAlpha = this.filterChartDataByDateRange(
      this.loadChartDataFromLocalStorage('chartOptionAlpha'),
      yearsInRange[0],
      yearsInRange[1]
    );
    this.chartOptionBeta = this.filterChartDataByDateRange(
      this.loadChartDataFromLocalStorage('chartOptionBeta'),
      yearsInRange[0],
      yearsInRange[1]
    );
  }

  filterChartDataByDateRange(
    chartData: Highcharts.Options,
    startDate: Date,
    endDate: Date
  ): Highcharts.Options {
    const filteredSeries = chartData.series!.filter((series: any) => {
      return (
        (series.name >= startDate.getFullYear() &&
          series.name <= endDate.getFullYear()) ||
        (series.id >= startDate.getFullYear() &&
          series.id <= endDate.getFullYear())
      );
    });
    return { ...chartData, series: filteredSeries };
  }

  searchArray(pattern: string): boolean {
    const chartData: any = localStorage.getItem('chartList');
    return JSON.parse(chartData).some((item: string) =>
      item.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  resetPage() {
    localStorage.clear();
    location.reload();
  }
}
