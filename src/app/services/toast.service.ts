import { animate } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async showBaseToast(mensaje: string, position: 'top' | 'middle' | 'bottom', color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,  
      duration: 2000,
      color: color,
      position: position,
    });
  
    toast.present();
  }


  async showSuccessToast(mensaje: string) {
    this.showBaseToast(mensaje, 'middle', 'success');

  }

  async showErrorToast(mensaje: string) {
    this.showBaseToast(mensaje, 'bottom', 'danger');
  }

  async showNormalToast(mensaje: string) {
    this.showBaseToast(mensaje, 'bottom', 'medium');
  }

}
