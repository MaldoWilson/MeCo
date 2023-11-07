import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage  {

  datos: User = {
    uid: null,
    username: null,
    email: null,
    password: null,
    perfil: 'client',
  }

  

    constructor(public authService:AuthService, public router : Router, 
      private firestore: FirestoreService, private interaction: InteractionService
      ) {}

    async signUp(){
      this.interaction.presentLoading('Registrando..')
      const res = await this.authService.registerUser(this.datos).catch(error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Cuenta ya creada o datos mal escrito');
        console.log('error');
      }); 
      if (res){
        console.log('Exito al crear al usuario');
        const path = 'users';
        const id = res.user.uid;
        this.datos.uid = id;
        this.datos.password = null;
        await this.firestore.createDoc(this.datos, path,id).catch(error => {
          console.log('error');
        })
        this.interaction.closeLoading();
        this.interaction.presentToast('Registrado con éxito');
        this.router.navigate(['/home']);

    }
  }

  ionViewDidEnter() {
    this.checkUserStatus();
  }
  
  async checkUserStatus() {
    const user = await this.authService.stateUser().pipe(first()).toPromise();
    if (user) {
      // El usuario está autenticado, redirige a la página de inicio
      this.router.navigate(['/home']);
    }
  }
}