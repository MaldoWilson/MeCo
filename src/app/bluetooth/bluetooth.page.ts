import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

    receivedData: string[] = [];

    constructor(private bluetoothSerial: BluetoothSerial) {}
  
    ngOnInit() {
      this.bluetoothSerial.subscribe('\n').subscribe(
        (data) => {
          this.receivedData.push(data);
        },
        (error) => {
          console.error('Error al recibir datos por Bluetooth:', error);
        }
      );
    }
  }




