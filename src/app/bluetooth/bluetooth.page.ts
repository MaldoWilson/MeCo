import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';
import { InteractionService } from 'src/app/services/interaction.service';



@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  Devices;
  receivedData: string = "";
  recibeData: string = "";

  constructor(
    private bluetoothSerial: BluetoothSerial,
    private alertController: AlertController,
    private interactionService: InteractionService,
  ) {}

  ngOnInit() {
    // Inicia la activación del Bluetooth cuando la página está lista
    this.activarBluetooth();
    this.subscribeToData();
    this.sendData();
  }

  activarBluetooth() {
    this.bluetoothSerial.isEnabled().then(responde => {
      this.listDevices();
    }, error => {
      this.isEnable("isOff");
    });
  }

  listDevices() {
    this.bluetoothSerial.list().then(response => {
      this.Devices = response;
    }, error => {
      console.log("error");
    });
  }

  connect(address) {
    this.bluetoothSerial.connect(address).subscribe(success => {
      this.deviceConnected();
    }, error => {
      console.log("error");
    });
  }


  deviceConnected() {
    this.subscribeToData();
    this.interactionService.showSuccessToast("Conectado correctamente");
  }
  
  subscribeToData() {
    this.bluetoothSerial.subscribe('\n').subscribe(
      (success) => {
        this.handler(success);
      },
      (error) => {
        this.interactionService.showErrorToast("Error");
      }
    );
  }
  

  handler(value) {
    console.log("Datos recibidos:", value);
    this.receivedData = value;
  }

  sendData() {
    this.bluetoothSerial.write("Datos enviados Correctamente Desde App").then(response => {
      console.log("ok");
    }, error => {
      console.log("un problema");
    });
  }

  disconnect() {
    this.bluetoothSerial.disconnect();
    console.log("Dispositivo Desconectado");
  }

  async isEnable(msg) {
    const alert = await this.alertController.create({
      header: "Alerta",
      message: msg,
      buttons: [{
        text: "Okay",
        handler: () => {
          console.log("Okay");
        }
      }]
    });
  }

  }




