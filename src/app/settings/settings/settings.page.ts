import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  email = null;

  constructor(private alertController: AlertController, private authService:AuthService, private router : Router, private interaction: InteractionService,
    private firestore: FirestoreService) {
       // Observa si el usuario esta logueado o no
       this.authService.stateUser().subscribe(res => {
        if (res){
          this.getPerfilsUser(res.uid)
        } else {
        }
      });
    }

    // Menu de cambio de tema
    async presentRadioAlert() {
      const alert = await this.alertController.create({
        cssClass: 'mi-clase-de-alerta',
        backdropDismiss: false,
        header: 'Selecciona el tema',
        buttons: ['Ok'],
        inputs: [
          {
            label: 'Sistema (Predeterminado)',
            type: 'radio',
            value: 'predeterminado',
          },
          {
            label: 'Claro',
            type: 'radio',
            value: 'claro',
          },
          {
            label: 'Oscuro',
            type: 'radio',
            value: 'oscuro',
          },
        ],
      });

      await alert.present();

      const result = await alert.onDidDismiss();
      if (result.role === 'cancel') {
        console.log('El usuario cerró la alerta sin seleccionar ninguna opción.');
      } else {
        const selectedValue = result.data;
        console.log('El usuario seleccionó:', selectedValue);
      }
    }



  // Obtiene el email
  getPerfilsUser(uid: string) {
    const path = 'users';
    const id = uid;
    this.firestore.getDoc<User>(path,id).subscribe(res => {
      if (res){
        this.email = res.email;
      }
    })
  }

    // Cierra sesión
    async logout() {
      this.authService.logoutUser().then(()=>{
        console.log('Sesión cerrada')
        this.interaction.presentToast('Sesión finalizada')
        this.router.navigate(['/landing'])
      })
    }

  ngOnInit() {
  }

}
