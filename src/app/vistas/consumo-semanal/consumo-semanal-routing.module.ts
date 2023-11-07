import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumoSemanalPage } from './consumo-semanal.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumoSemanalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumoSemanalPageRoutingModule {}
