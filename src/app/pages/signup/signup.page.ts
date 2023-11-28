// Importa los módulos y servicios necesarios desde Angular y otras bibliotecas
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { AuthFacadeService } from 'src/app/services/auth-facade.service';

// Define el componente utilizando el decorador @Component
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  // Declara una variable 'datos' del tipo 'User' para almacenar la información del usuario
  datos: User = {
    uid: null,
    username: null,
    email: null,
    password: null,
    perfil: 'client',
  }

  // Constructor del componente que recibe instancias de servicios necesarios
  constructor(
    private authService: AuthService,
    private router: Router,
    private authFacadeService: AuthFacadeService,
  ) {}

  
  // Método que se ejecuta cuando la página se ha cargado completamente
  ionViewDidEnter() {
    // Verifica el estado del usuario al entrar en la página
    this.checkUserStatus();
  }


  // Método asincrónico que se llama al hacer clic en el botón de registro
  async signUp() {
    // Llama al método 'signUp' del servicio 'authFacadeService' con los datos del usuario
    const success = await this.authFacadeService.signUp(this.datos);

    // Si el registro es exitoso, redirige al usuario a la página de inicio
    if (success) {
      this.router.navigate(['/home']);
    }
  }


  // Método asincrónico para verificar el estado del usuario
  async checkUserStatus() {
    // Utiliza el servicio 'authService' para obtener el estado del usuario
    const user = await this.authService.stateUser().pipe(first()).toPromise();

    // Si el usuario está autenticado, redirige a la página de inicio
    if (user) {
      this.router.navigate(['/home']);
    }
  }
}
