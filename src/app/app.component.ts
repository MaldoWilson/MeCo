import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FirestoreService } from './services/firestore.service';
import { User } from './models/models';
import { Platform } from '@ionic/angular';
import { UserServiceService } from './cliente/userService/user-service.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  login: boolean = false;
  rol: 'client' | 'admin' = null;
  username = null;
  email = null;
  userAdmin = null;

  constructor(private authService:AuthService,
    private firestore: FirestoreService, private platform: Platform, private userService: UserServiceService) {

      // Observa si el usuario esta logueado o no
      this.authService.stateUser().subscribe(res => {
        if (res){
          console.log('Esta logueado');
          this.login = true;
          this.getPerfilsUser(res.uid)
        } else {
            console.log('No esta logueado');
            this.login = false;
            }
          });
    }
    

  calculateConsumption(): number {
        // Implementa el cálculo de consumo específico de este componente
        return 0;
      }
    


  //  Obtiene perfil de usuario (cliente o admin)
  getPerfilsUser(uid: string) {
    const path = 'users';
    const id = uid;
    this.firestore.getDoc<User>(path,id).subscribe(res => {
      if (res){
        console.log('datos conseguidos');
        this.rol = res.perfil;
        this.email = res.email;
        this.username = res.username;
        if (this.rol === 'admin') {
          this.userAdmin = res.uid;
        }
      }
    })
  }

}
