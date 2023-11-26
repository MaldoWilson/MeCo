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
  selector: 'app-consumo-diario',
  templateUrl: './consumo-diario.page.html',
  styleUrls: ['./consumo-diario.page.scss'],
})
export class ConsumoDiarioPage implements OnInit {
  public chartOptions: ChartOptions;

  totalConsumption: number;

  ngOnInit() {
    // Crear una instancia de Composite
    const mainComposite = new Composite();

    // Crear una instancia de Leaf y agregarla al Composite
    const tv = new Leaf(50);
    mainComposite.add(tv);

    // Crear otras instancias de Leaf y agregarlas al Composite si es necesario
    const laptop = new Leaf(20);
    mainComposite.add(laptop);

    // Calcular el consumo total utilizando el Composite
    this.totalConsumption = mainComposite.calculateConsumption();

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
        text: "Grafico de Consumo Diario",

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

  resetTotalConsumption() {
    this.totalConsumption = 0;
  }

 
}

