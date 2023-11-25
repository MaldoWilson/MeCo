import { Component, OnInit } from '@angular/core';
import { Composite } from 'src/app/vistas/composite.component';
import { Leaf } from 'src/app/vistas/leaf.component';

@Component({
  selector: 'app-consumo-diario',
  templateUrl: './consumo-diario.page.html',
  styleUrls: ['./consumo-diario.page.scss'],
})
export class ConsumoDiarioPage implements OnInit {

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
  }
  resetTotalConsumption() {
    this.totalConsumption = 0;
  }
}

