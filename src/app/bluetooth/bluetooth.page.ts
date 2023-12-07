import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

    constructor(private bluetoothSerial: BluetoothSerial) { }

    ngOnInit() {
      this.bluetoothSerial.subscribe('\n').subscribe(
        (data) => {
          // Aquí recibes los datos Bluetooth y puedes manejarlos según tus necesidades
          console.log('Datos recibidos por Bluetooth:', data);
        },
        (error) => {
          console.error('Error al recibir datos por Bluetooth:', error);
        }
      );
    }
  
  }




