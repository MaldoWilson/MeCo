import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { AuthFacadeService } from 'src/app/services/auth-facade.service';

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



    constructor(
      private authService:AuthService, 
      private router : Router, 
      private authFacadeService: AuthFacadeService,
      ) {}

      async signUp() {
        const success = await this.authFacadeService.signUp(this.datos);

        if (success) {
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
