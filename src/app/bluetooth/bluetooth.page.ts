import { Component, OnInit, OnDestroy } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit, OnDestroy {

  receivedData: string[] = [];
  bluetoothSubscription: Subscription;

  constructor(
    private bluetoothSerial: BluetoothSerial,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Buscar dispositivos Bluetooth cercanos
    this.bluetoothSerial.list().then(devices => {
      // Muestra la lista de dispositivos disponibles y permite al usuario seleccionar uno
      this.showDeviceList(devices);
    }).catch(error => {
      console.error('Error al buscar dispositivos:', error);
    });
  }

  ngOnDestroy() {
    // Detener la suscripción al Bluetooth cuando la página se destruye
    this.bluetoothSubscription.unsubscribe();
  }

  private showDeviceList(devices: any[]) {
    const buttons = devices.map(device => ({
      text: device.name,
      handler: () => {
        // Conectar al dispositivo seleccionado
        this.connectToDevice(device);
      }
    }));

    // Muestra un cuadro de diálogo para seleccionar el dispositivo
    this.alertController.create({
      header: 'Selecciona un dispositivo',
      buttons: [...buttons, 'Cancelar']
    }).then(alert => {
      alert.present();
    });
  }

  private connectToDevice(device: any) {
    // Conectar al dispositivo Bluetooth
    this.bluetoothSerial.connect(device.address).subscribe(
      success => {
        console.log('Conexión exitosa:', success);

        // Enviar datos al Arduino
        this.bluetoothSerial.write('Hello from Ionic!').then(writeSuccess => {
          console.log('Datos enviados con éxito:', writeSuccess);
        }).catch(writeError => {
          console.error('Error al enviar datos:', writeError);
        });

        // Recibir datos del Arduino
        this.bluetoothSubscription = this.bluetoothSerial.subscribe('\n').subscribe(
          data => {
            console.log('Datos recibidos desde Arduino:', data);
            this.receivedData.push(data);
          },
          receiveError => {
            console.error('Error al recibir datos:', receiveError);
          }
        );

      },
      connectError => {
        console.error('Error al conectar al dispositivo:', connectError);
      }
    );
  }
}
