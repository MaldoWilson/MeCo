import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ToastService } from 'src/app/services/toast.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : FormGroup

  constructor(
    private formBuilder:FormBuilder, 
    private authService:AuthService,
    private router : Router, 
    private interaction: InteractionService,
    private toast: ToastService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]]
    })
  }

  get errorControl(){
    return this.loginForm?.controls;
  }

  async login(){
    
    if(this.loginForm?.valid){
      this.interaction.presentLoading('Iniciando sesión')
      const user = await this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password
        ).catch((error)=>{
        console.log('error');
        this.interaction.closeLoading();
      })

      if(user){
        this.interaction.closeLoading();
        this.toast.showSuccessToast('Sesión iniciada');
        this.router.navigate(['/home'])
      }else{
        this.toast.showErrorToast('No se encontro su cuenta');
      }
  }else{
    console.log('provide correct values');
    this.toast.showErrorToast('Correo o contraseña no valida');
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
