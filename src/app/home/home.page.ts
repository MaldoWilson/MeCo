import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Devices
  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController
  ,public authService:AuthService,private bluetoothSerial:BluetoothSerial,private alertController:AlertController,
  public router : Router) {}




  activarBluetooth(){
    this.bluetoothSerial.isEnabled().then(responde=>{
      //this.isEnable("isOn");
      this.listDevices()
    },error=>{
      this.isEnable("isOff")
    }
    )

  }

  listDevices(){
    this.bluetoothSerial.list().then(response=>{
      this.Devices=response
    },error=>{
      console.log("error")
    }
    )
  }

  connect(address){
  this.bluetoothSerial.connect(address).subscribe(success=>{

}
),error=>{
  console.log("error")
}
  }

  deviceConnected(){
    this.bluetoothSerial.subscribe('/n').subscribe(success=>{
      
    })
  }

  async isEnable(msg){
    const alert=await this.alertController.create({
      header:"Alerta",
      message:msg,
      buttons:[{
        text:"Okay",
        handler:()=>{
          console.log("Okay")
        }
      }]
    }
    )
  }

}
