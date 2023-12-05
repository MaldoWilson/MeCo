import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { pairedList } from 'src/app/models/pairedList';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  pairedList: pairedList;
  listToggle: boolean = false;
  pairedDeviceId: number = 0;
  dataSend = "";

    constructor(
      public navCtrl: NavController, 
      private alertCtrl: AlertController, 
      private bluetoothSerial: BluetoothSerial, 
      private toastCtrl: ToastController) {
        this.checkBluetoothEnable();
    }

  ngOnInit() {
  }

  checkBluetoothEnable() {
    this.bluetoothSerial.isEnabled().then(success => {
        this.listPairedDevices();
    }, error => {
        this.showError("Por favor, activa el Bluetooth");
    })
}

listPairedDevices() {
    this.bluetoothSerial.list().then(success => {
        this.pairedList = success;
        this.listToggle = true;
    }, error => {
        this.showError("Ha sucedido un error al recuperar la lista, inténtalo de nuevo");
        this.listToggle = false;
    })
}

selectDevice() {
    let connectedDevice = this.pairedList[this.pairedDeviceId];
    if (!connectedDevice.address) {
        this.showError("Selecciona un dispositivo al que conecterse");
        return;
    }

    let address = connectedDevice.address;
    let name = connectedDevice.name;

    this.connect(address);
}

connect(address) {
    this.bluetoothSerial.connect(address).subscribe(success => {
        this.deviceConnected();
        this.showToast("Conectado correctamente");
    }, error => {
        this.showError("No se ha podido conectar, algo ha fallado.");
    })
}

deviceConnected() {
    this.bluetoothSerial.subscribe("\n").subscribe(success => {
        this.handleData(success);
        this.showToast("Conectado correctamente")
    }, error => {
        this.showError(error);
    })
}

deviceDisconnect() {
    this.bluetoothSerial.disconnect();
    this.showToast("Se ha desconectado del dispositivo");
}

handleData(data) {
    //Montar aquí el sistema para tratar la entrada desde el dispositivo al que nos hemos conectado.
    this.showToast(data);
}

sendData(dataToSend: string) {
    this.dataSend = "\n";
    this.dataSend += dataToSend;

    this.bluetoothSerial.write(this.dataSend).then(success => {
        this.showToast(success);
    }, error => {
        this.showError(error);
    })
}


async showError(message: string) {
    const alert = await this.alertCtrl.create({
        header: '¡Error!',
        subHeader: message,
        buttons: ['dismiss']
    });
    await alert.present();
}

async showToast(message: string) {
    const toast = await this.toastCtrl.create({
        message: message,
        duration: 5000
    });
    await toast.present();
}



}

