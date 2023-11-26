import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ConsumoDiarioPageRoutingModule } from './consumo-diario-routing.module';

import { ConsumoDiarioPage } from './consumo-diario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsumoDiarioPageRoutingModule
  ],
  declarations: [ConsumoDiarioPage]
})
export class ConsumoDiarioPageModule {}
