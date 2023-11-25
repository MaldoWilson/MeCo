import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { first } from 'rxjs/operators';
import { AuthFacadeService } from 'src/app/services/auth-facade.service'

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
    private authFacadeService: AuthFacadeService,
     ) { }

     ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    }

    get errorControl() {
      return this.loginForm?.controls;
    }
// Método asíncrono para manejar el proceso de inicio de sesión desde el formulario
async login() {
  // Verificar si el formulario de inicio de sesión es válido
  if (this.loginForm?.valid) {
    // Llamar al servicio de fachada de autenticación para realizar el inicio de sesión
    const success = await this.authFacadeService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    // Verificar si el inicio de sesión fue exitoso
    if (success) {
      // Redirigir a la página de inicio después del inicio de sesión exitoso
      this.router.navigate(['/home']);
    }
  } else {
    // Imprimir un mensaje en la consola si el formulario no es válido
    console.log('Proporcione valores correctos');
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
