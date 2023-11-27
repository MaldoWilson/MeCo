import { Component, OnInit } from '@angular/core';
import { Composite } from 'src/app/vistas/composite.component';
import { Leaf } from 'src/app/vistas/leaf.component';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexDataLabels, ApexYAxis, ApexTitleSubtitle, ApexLegend } from 'ng-apexcharts';
import { series } from './data';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-consumo-semanal',
  templateUrl: './consumo-semanal.page.html',
  styleUrls: ['./consumo-semanal.page.scss'],
})
export class ConsumoSemanalPage implements OnInit {
  public chartOptions: ChartOptions;
  totalConsumption: number;
  constructor() { }

ngOnInit() {

    // Crear una instancia de Composite
    const mainComposite = new Composite();

    // Crear una instancia de Leaf y agregarla al Composite
    const tv = new Leaf(50);
    mainComposite.add(tv);

    // Crear otras instancias de Leaf y agregarlas al Composite si es necesario
    const laptop = new Leaf(20);
    mainComposite.add(laptop);

    // Calcular el consumo total semanal utilizando el Composite
    this.totalConsumption = mainComposite.calculateWeeklyConsumption();

    this.chartOptions = {
      series: [
        {
          name: "Consumo",
          data: series.monthDataSeries1.kWh
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Grafico de Consumo Semanal",

        align: "center"
      },
      subtitle: {
        text: "Price Movements",
        align: "left"
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }

}
