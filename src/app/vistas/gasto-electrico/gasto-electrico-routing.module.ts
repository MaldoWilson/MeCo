import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastoElectricoPage } from './gasto-electrico.page';

const routes: Routes = [
  {
    path: '',
    component: GastoElectricoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GastoElectricoPageRoutingModule {}
