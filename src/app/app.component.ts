import { Component } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { MatSliderChange } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  autoTicks = true;
  disabled = false;
  invert = false;
  max = 2500;
  min = 0;
  min1 = 6;
  max1 = 36;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 0;
  value2 = 0;
  value3 = 0;
  value4 = 0;
  value5 = 0;
  value6 = 0;
  value7 = 0;
  vertical = false;
  tickInterval = 500;
  tickInterval2 = 700;
  tickInterval3 = 250;
  tickInterval4 = 1000;

  title = 'insurance';

  barchart = [];
  Player = [];
  Run = [];
  todayCost: any;
  totatTenCost: any;
  displayAddInfo: boolean = false;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,

    legend: { display: true, position: 'bottom' },
    scaleShowValues: true,
    scaleValuePaddingX: 20,
    scaleValuePaddingY: 20,
    animation: {
      onComplete: function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    }
  };
  public barChartLabels: Label[] = ['Assumptions'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartColors: Color[] = [
    { backgroundColor: '#49DCFA' },
    { backgroundColor: '#00B5E1' },
  ]
  public barChartData: ChartDataSets[] = [
    {
      // barThickness: 100,
      // barPercentage: 8.0,
      // categoryPercentage: 8.0,
      //       barPercentage: 1.0
      // categoryPercentage: 10,
      data: [this.todayCost],
      label: 'Estimated Cost Today'
    },
    {
      // barThickness: 100,
      // barPercentage: 8.0,
      // categoryPercentage: 8.0,
      data: [this.totatTenCost],
      label: 'Estimated Cost in 10 years'
    }
  ];


  constructor() {

  }

  ngOnInit() {


  }

  //Get First slider value and call function for calculate todoy cost
  onSliderChange(event: MatSliderChange) {
    console.log(event.value);
    this.value = event.value
    this.calculateTodayCost();
    //this.calculateTenYrsCoust();
  }

  //Get 2nd slider value and call function for calculate todoy cost
  onSliderChange2(event: MatSliderChange) {
    console.log(event.value);
    this.value2 = event.value;
    this.calculateTodayCost();
    //this.calculateTenYrsCoust();
  }

  //Get 3rd slider value and call function for calculate todoy cost
  onSliderChange3(event: MatSliderChange) {
    console.log(event.value);
    this.value3 = event.value;
    this.calculateTodayCost();
    //this.calculateTenYrsCoust();
  }

  //Get 4th slider value and call function for calculate todoy cost
  onSliderChange4(event: MatSliderChange) {
    console.log(event.value);
    this.value4 = event.value;
    this.calculateTodayCost();
    // this.calculateTenYrsCoust();
  }


  //Get 5th slider value and call function for calculate todoy cost
  onSliderChange5(event: MatSliderChange) {
    console.log(event.value);
    this.value5 = event.value;
    this.calculateTodayCost();
    // this.calculateTenYrsCoust();
  }

  //Get 6th slider value and call function for calculate todoy cost and TenYrs calculation function
  //Calling calculateTenYrsCost() Bec of it needs to calculate with requried period month from 6 to 36
  onSliderChange6(event: MatSliderChange) {
    console.log(event.value);
    this.value6 = event.value;
    this.calculateTodayCost();
    this.calculateTenYrsCoust();
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  // - Calculation for chart:
  //- Cost as of today -> add all the values - other expenses. Eg: 1+2+3+4 - 5
  calculateTodayCost() {
    let total = ((this.value + this.value2 + this.value3 + this.value4) - this.value5);
    console.log(total);
    this.todayCost = total.toFixed();
    this.callChart();
  }

  // - Calculation for chart:
  //- - Cost in 10 years -> (add all the values and multiply by inflation rate )/ recovery period
  //   (*consider inflation rate as 1.2) Eg: (1+2+3)*1.2/6

  calculateTenYrsCoust() {
    let inflation = 1.5
    let totalCost = ((this.value + this.value2 + this.value3) * inflation) / this.value6;
    this.totatTenCost = totalCost.toFixed();
    this.callChart();
  }

  callChart() {
    //Chart creation on entering form values should happen after a 3s delay
    setTimeout(() => {
      this.barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,

        legend: { display: true, position: 'top' },
        scales: {
          yAxes: [{
            barPercentage: 6.0,
            categoryPercentage: 6.0,

            ticks: {

              beginAtZero: true,
              callback: function (value, index, values) {
                return '$' + value + 'k';
              },
            }
          }]
        },
        scaleShowValues: true,
        scaleValuePaddingX: 20,
        scaleValuePaddingY: 20,
        animation: {
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText('$' + data + ',000', bar._model.x, bar._model.y - 1);
              });
            });
          }
        }
      };
      this.barChartLabels = ['Assumptions'];
      this.barChartType = 'bar';
      this.barChartLegend = true;
      this.barChartPlugins = [{
        beforeInit: function (chart, options) {
          chart.legend.afterFit = function () {
            this.height = this.height + 10;
          };
        }
      }

      ];

      this.barChartData = [
        {
          barThickness: 100,
          barPercentage: -0.8,
          categoryPercentage: -0.8,
          data: [this.todayCost],
          label: 'Estimated Cost Today'
        },
        {
          barThickness: 100,
          barPercentage: -0.8,
          categoryPercentage: -0.8,
          data: [this.totatTenCost],
          label: 'Estimated Cost in 10 years'
        }
      ];
    });

  }

  //Calling func for toggle button
  addInfo() {
    this.displayAddInfo = !this.displayAddInfo
  }

  //Check value if it exced above 2500
  checkValue($event) {
    console.log($event);
    if ($event.target.value > 2500) {
      alert('Enter only value between 0 - 2500');
      this.value = 0;
    } else {

    }
  }

  checkValue2($event) {
    console.log($event);
    if ($event.target.value > 2500) {
      alert('Enter only value between 0 - 2500');
      this.value2 = 0;
    } else {

    }
  }

  checkValue3($event) {
    console.log($event);
    if ($event.target.value > 2500) {
      alert('Enter only value between 0 - 2500');
      this.value3 = 0;
    } else {

    }
  }

  checkValue4($event) {
    console.log($event);
    if ($event.target.value > 2500) {
      alert('Enter only value between 0 - 2500');
      this.value4 = 0;
    } else {

    }
  }

  checkValue5($event) {
    console.log($event);
    if ($event.target.value > 2500) {
      alert('Enter only value between 0 - 2500');
      this.value5 = 0;
    } else {

    }
  }

}
