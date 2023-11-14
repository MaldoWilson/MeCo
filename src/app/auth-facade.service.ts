import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from './services/interaction.service';


@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  constructor(
    private authService: AuthService,
    private interactionService: InteractionService
  ) {}

  async login(email: string, password: string): Promise<boolean> {
    try {
      this.interactionService.presentLoading('Iniciando sesión');
      const user = await this.authService.loginUser(email, password);

      if (user) {
        this.interactionService.closeLoading();
        this.interactionService.presentToast('Sesión iniciada');
        return true;
      } else {
        this.interactionService.closeLoading();
        this.interactionService.presentToast('No se encontró su cuenta');
        return false;
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      this.interactionService.closeLoading();
      return false;
    }
  }
}
