import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Angular Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Otras importaciones
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ConsumoMensualPageModule } from './vistas/consumo-mensual/consumo-mensual.module';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';

@NgModule({
  declarations: [
    AppComponent,
    // Otros componentes, directivas, tuberías...
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgApexchartsModule,
    ConsumoMensualPageModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BluetoothSerial,
    // Otros proveedores
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
