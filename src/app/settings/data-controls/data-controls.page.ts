import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/cliente/userService/user-service.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-data-controls',
  templateUrl: './data-controls.page.html',
  styleUrls: ['./data-controls.page.scss'],
})
export class DataControlsPage implements OnInit {
  userId: string;
  email: string;

  constructor(
    private router: Router,
    private interaction: InteractionService,
    private userService: UserServiceService,
    private authService: AuthService,
    private firestore: FirestoreService
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

  
}
