import { animate } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async showBaseToast(mensaje: string, color: string, position: 'top' | 'middle' | 'bottom', animate?: boolean) {
    const toast = await this.toastCtrl.create({
      message: mensaje,  
      duration: 2000,
      color: color,
      position: position,
      animated: animate
    });
  
    toast.present();
  }


  async showSuccessToast(mensaje: string) {
    this.showBaseToast(mensaje, 'success', 'top',true);

  }

  async showErrorToast(mensaje: string) {
    this.showBaseToast(mensaje, 'danger', 'bottom');
  }

}
