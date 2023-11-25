import { animate } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }


  // Decorator
  async showBaseToast(mensaje: string, position: 'top' | 'middle' | 'bottom', color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,  
      duration: 2000,
      color: color,
      position: position,
    });
  
    toast.present();
  }

  // Decorator de exito
  async showSuccessToast(mensaje: string) {
    this.showBaseToast(mensaje, 'bottom', 'success');

  }
  // Decorator de fallo
  async showErrorToast(mensaje: string) {
    this.showBaseToast(mensaje, 'bottom', 'danger');
  }
  // Decorator normal
  async showNormalToast(mensaje: string) {
    this.showBaseToast(mensaje, 'bottom', 'medium');
  }

}
