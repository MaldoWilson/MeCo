import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsumoMensualPageRoutingModule } from './consumo-mensual-routing.module';

import { ConsumoMensualPage } from './consumo-mensual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsumoMensualPageRoutingModule
  ],
  declarations: [ConsumoMensualPage]
})
export class ConsumoMensualPageModule {}
