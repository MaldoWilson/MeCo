import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';
import { canActivate } from '@angular/fire/compat/auth-guard';
import { redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const uidAdmin = 'XB8wct2kV6Zf9MZde5CxrDgqmnQ2';
const onlyAdmin = () => map((user:any) => !!user &&  user.uid === uidAdmin);
// ...canActivate(onlyAdmin)
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)

  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./cliente/list/list.module').then( m => m.ListPageModule),
     ...canActivate(onlyAdmin)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings/settings.module').then( m => m.SettingsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'licenses',
    loadChildren: () => import('./settings/licenses/licenses.module').then( m => m.LicensesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./cliente/update/update.module').then( m => m.UpdatePageModule),
    ...canActivate(onlyAdmin)
  },
  {
    path: 'add',
    loadChildren: () => import('./cliente/add/add.module').then( m => m.AddPageModule),
    ...canActivate(onlyAdmin)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./cliente/detail/detail.module').then( m => m.DetailPageModule),
    ...canActivate(onlyAdmin)
  },
  {
    path: 'delete/:id',
    loadChildren: () => import('./cliente/delete/delete.module').then( m => m.DeletePageModule),
    ...canActivate(onlyAdmin)
  },
  {
    path: 'data-controls',
    loadChildren: () => import('./settings/data-controls/data-controls.module').then( m => m.DataControlsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'gasto-electrico',
    loadChildren: () => import('./vistas/gasto-electrico/gasto-electrico.module').then( m => m.GastoElectricoPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'consumo-diario',
    loadChildren: () => import('./vistas/consumo-diario/consumo-diario.module').then( m => m.ConsumoDiarioPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'consumo-semanal',
    loadChildren: () => import('./vistas/consumo-semanal/consumo-semanal.module').then( m => m.ConsumoSemanalPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'consumo-mensual',
    loadChildren: () => import('./vistas/consumo-mensual/consumo-mensual.module').then( m => m.ConsumoMensualPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'estadistica-consumo',
    loadChildren: () => import('./vistas/estadistica-consumo/estadistica-consumo.module').then( m => m.EstadisticaConsumoPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'bluetooth',
    loadChildren: () => import('./bluetooth/bluetooth.module').then( m => m.BluetoothPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
