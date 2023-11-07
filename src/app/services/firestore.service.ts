import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../models/models';
import { Observable } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {



  constructor(private firestore: AngularFirestore, private firebaseDB: AngularFireDatabase) { }

  //Crea usuario
  createDoc(data: any, path: string, id: string) {
    return this.firebaseDB.object(`${path}/${id}`).set(data);
  }

  getID(){
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string){
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  // Obtiene datos del usuario
  getDoc<tipo>(path: string, id: string): Observable<tipo> {
    return this.firebaseDB.object<tipo>(`${path}/${id}`).valueChanges();
  }

  // Lista usuario
  getUsers(): Observable<User[]> {
    return this.firebaseDB.list<User>('users').valueChanges();
  }


}