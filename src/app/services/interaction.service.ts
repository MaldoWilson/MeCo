import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading: any

  constructor(public toastController: ToastController, public loadingController: LoadingController) { }

  // Loading con mensaje
  async presentLoading(mensaje: string){
    this.loading = await this.loadingController.create({
      cssClass:'my custom class',
      message: mensaje,
    });
    await this.loading.present();

    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
  }

  async closeLoading(){
    await this.loading.dismiss();
  }


  // Decorator Tost
  async showBaseToast(mensaje: string, position: 'top' | 'middle' | 'bottom', color: string) {
    const toast = await this.toastController.create({
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
