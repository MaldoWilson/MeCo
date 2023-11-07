import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticaConsumoPage } from './estadistica-consumo.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticaConsumoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticaConsumoPageRoutingModule {}
