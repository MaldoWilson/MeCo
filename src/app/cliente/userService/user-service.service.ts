import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable, map, take } from 'rxjs';
import { User } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(  private firebaseDB: AngularFireDatabase, private ngFireAuth: AngularFireAuth) { }

  // Elimina usuario de realtime database
  eliminarClientess(userId: string): Promise<void> {
    const clientRef: AngularFireObject<any> = this.firebaseDB.object(`/users/${userId}`);
    return clientRef.remove();
  }


  // Elimina usuario de realtime database y authentification
  async deleteUser(userId: string): Promise<void> {
    try {
      // Eliminar el usuario de Authentication
      const user = await this.ngFireAuth.authState.pipe(take(1)).toPromise();
      if (user) {
        await user.delete();
        console.error('Eliminado correctamente');
        // Eliminar el usuario de la base de datos en tiempo real
        const clientRef: AngularFireObject<any> = this.firebaseDB.object(`/users/${userId}`);
        await clientRef.remove();
      }
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      throw error; 
    }
  }

  // Modifica datos del usuario
  async updateUser(userId: string, nuevosDatos: Partial<User>): Promise<void> {
    try {
      // Actualizar el usuario de la base de datos en tiempo real
      const clientRef: AngularFireObject<User> = this.firebaseDB.object(`/users/${userId}`);
      await clientRef.update(nuevosDatos);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error; 
    }
  }
  
  // Obtiene usuario de realtime database
  obtenerUsuario(userId: string): Observable<User> {
    const clientRef: AngularFireObject<User> = this.firebaseDB.object(`/users/${userId}`);
    return clientRef.valueChanges();
  }

}
