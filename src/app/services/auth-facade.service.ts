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

  // Método para manejar el inicio de sesión
  async login(email: string, password: string): Promise<boolean> {
    try {
      // Mostrar un indicador de carga durante el inicio de sesión
      this.interactionService.presentLoading('Iniciando sesión');
      
      // Llamar al servicio de autenticación para iniciar sesión
      const user = await this.authService.loginUser(email, password);

      if (user) {
        // Cerrar el indicador de carga si el inicio de sesión es exitoso
        this.interactionService.closeLoading();
        
        // Mostrar un mensaje de éxito al usuario
        this.interactionService.presentToast('Sesión iniciada');
        return true;
      } else {
        // Cerrar el indicador de carga si el inicio de sesión falla
        this.interactionService.closeLoading();
        
        // Mostrar un mensaje de error al usuario
        this.interactionService.presentToast('No se encontró su cuenta');
        return false;
      }
    } catch (error) {
      // Manejar errores durante el inicio de sesión
      console.error('Error durante el inicio de sesión:', error);
      this.interactionService.closeLoading();
      return false;
    }
  }

  // Método para manejar el registro de usuario
  async signUp(userData: any): Promise<boolean> {
    try {
      // Mostrar un indicador de carga durante el registro
      this.interactionService.presentLoading('Registrando..');

      // Lógica de registro de usuario llamando al servicio de autenticación
      const res = await this.authService.registerUser(userData);

      if (res) {
        console.log('Éxito al crear al usuario');

        // Configuración de datos para Firestore
        const path = 'users';
        const id = res.user.uid;
        userData.uid = id;
        userData.password = null;

        // Crear documento en Firestore con los datos del usuario
        await this.firestoreService.createDoc(userData, path, id);

        // Cerrar el indicador de carga si el registro es exitoso
        this.interactionService.closeLoading();
        
        // Mostrar un mensaje de éxito al usuario
        this.interactionService.presentToast('Registrado con éxito');
        return true;
      } else {
        // Cerrar el indicador de carga si el registro falla
        this.interactionService.closeLoading();
        
        // Mostrar un mensaje de error al usuario
        this.interactionService.presentToast('Cuenta ya creada o datos mal escritos');
        console.log('Error durante el registro');
        return false;
      }
    } catch (error) {
      // Manejar errores durante el registro
      console.error('Error durante el registro:', error);
      this.interactionService.closeLoading();
      return false;
    }
  }
}
