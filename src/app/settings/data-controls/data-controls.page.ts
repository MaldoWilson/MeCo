import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/cliente/userService/user-service.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-data-controls',
  templateUrl: './data-controls.page.html',
  styleUrls: ['./data-controls.page.scss'],
})
export class DataControlsPage implements OnInit {
  userId: string;
  email: string;

  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
      role: 'cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      role: 'confirm'
    },
  ];

  constructor(
    private router: Router,
    private interaction: InteractionService,
    private userService: UserServiceService,
    private authService: AuthService,
    private firestore: FirestoreService,
    private alertController: AlertController
  ) {
    this.authService.stateUser().subscribe(res => {
      if (res){
        this.getPerfilsUser(res.uid)
      } else {
      }
    });
  }

  ngOnInit() {
  }

  // Obtiene el id
  getPerfilsUser(uid: string) {
    const path = 'users';
    const id = uid;
    this.firestore.getDoc<User>(path,id).subscribe(res => {
      if (res){
        this.userId = res.uid;
      }
    })
  }

  // elimina cliente
  deleteUser() {
    this.interaction.presentLoading('Eliminado..');
    // Llama a la función eliminarCliente con el ID del cliente
    this.userService.deleteUser(this.userId).then(() => {
      // Redirige a la página de listar después de eliminar el cliente
      this.interaction.closeLoading();
      this.interaction.presentToast('Eliminado con éxito');
      this.router.navigate(['/landing']);
    }).catch(error => {
      console.error('Error al eliminar el cliente:', error);
      this.interaction.closeLoading();
      this.interaction.presentToast('No se ha podido eliminar');
    });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Estas seguro de que desea eliminar?',
      buttons: this.alertButtons,
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('Resultado del alert:', role);

    if (role === 'confirm') {
      console.log('Usuario seleccionó "Yes"');
      this.deleteUser();
    } else {
      console.log('Usuario seleccionó "No" o cerró el alert');
    }
  }
}
