import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsumoSemanalPageRoutingModule } from './consumo-semanal-routing.module';

import { ConsumoSemanalPage } from './consumo-semanal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsumoSemanalPageRoutingModule
  ],
  declarations: [ConsumoSemanalPage]
})
export class ConsumoSemanalPageModule {}
