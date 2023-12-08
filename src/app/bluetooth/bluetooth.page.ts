import { Component, OnInit, OnDestroy } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';


@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage {

  devices: any[] = []; // Lista de dispositivos Bluetooth encontrados

  constructor(private bluetoothSerial: BluetoothSerial) {}

  searchAndAddDevices() {
    this.bluetoothSerial.list().then(
      devices => {
        // 'devices' es un array de objetos con información sobre los dispositivos Bluetooth disponibles
        this.devices = devices;
      },
      error => console.error('Error al buscar dispositivos', error)
    );
  }

  connectToDevice(deviceAddress: string) {
    this.bluetoothSerial.connect(deviceAddress).subscribe(
      data => console.log('Conectado con éxito', data),
      error => console.error('Error al conectar', error)
    );
  }
}