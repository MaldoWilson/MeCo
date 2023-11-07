import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email:any

  constructor(private authService:AuthService, private router : Router, private interaction: InteractionService) { }

  ngOnInit() {
  }

  async resetPassword(){
    this.authService.resetPassword(this.email).then(()=>{
      console.log('reset link sent')
      this.router.navigate(['/login'])
    }).catch((error)=>{
      console.log('error');
      this.interaction.presentToast('Escriba un correo valido');

    })
  }
}
