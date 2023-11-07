import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private authService:AuthService,
    private router : Router) { }

  ngOnInit() {
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
