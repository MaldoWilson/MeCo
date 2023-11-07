import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticaConsumoPageRoutingModule } from './estadistica-consumo-routing.module';

import { EstadisticaConsumoPage } from './estadistica-consumo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticaConsumoPageRoutingModule
  ],
  declarations: [EstadisticaConsumoPage]
})
export class EstadisticaConsumoPageModule {}
