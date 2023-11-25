import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage{

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
        this.interaction.showErrorToast('Cuenta ya creada o datos mal escrito');
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
        this.interaction.showSuccessToast('Registrado con éxito');
        this.router.navigate(['/home']);

    }
  }

}