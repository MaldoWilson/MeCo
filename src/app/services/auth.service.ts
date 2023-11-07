import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  afAuth: any;

  constructor(public ngFireAuth: AngularFireAuth) { }
  
  // Registra con email y password en firebase
  async registerUser(datos: User){
    return await this.ngFireAuth.createUserWithEmailAndPassword(datos.email, datos.password)
  }

  // Se logea con email y password en firebase
  async loginUser(email:string, password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  // Cambia contraseña con email
  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  // Se desloguea
  async logoutUser(){
    return await this.ngFireAuth.signOut();
  }

  // obtiene datos del usuario
  async getProfile(){
    const user = await this.ngFireAuth.currentUser;
    return user.uid;
  }
  
  // Observa el estado del usuario, si esta logueado
  stateUser(){
    return this.ngFireAuth.authState
  }

  


}
