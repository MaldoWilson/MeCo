import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from './interaction.service';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  constructor(
    private authService: AuthService,
    private interactionService: InteractionService,
    private firestoreService: FirestoreService,
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
////////////////////////////////////////////////////////////////////////////
  async signUp(userData: any): Promise<boolean> {
    try {
      this.interactionService.presentLoading('Registrando..');

      // Lógica de registro de usuario
      const res = await this.authService.registerUser(userData);

      if (res) {
        console.log('Éxito al crear al usuario');

        // Configuración de datos para Firestore
        const path = 'users';
        const id = res.user.uid;
        userData.uid = id;
        userData.password = null;

        // Crear documento en Firestore
        await this.firestoreService.createDoc(userData, path, id);

        this.interactionService.closeLoading();
        this.interactionService.presentToast('Registrado con éxito');
        return true;
      } else {
        this.interactionService.closeLoading();
        this.interactionService.presentToast('Cuenta ya creada o datos mal escritos');
        console.log('Error durante el registro');
        return false;
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      this.interactionService.closeLoading();
      return false;
    }
  }
}

