import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  cliente = {
    id: "",
    username: "",
    email: "",
    perfil: ""
  }



  constructor(private router: Router, private route: ActivatedRoute, private firestore: FirestoreService) { }

  ngOnInit() {
    // Llama a getPerfilsUser para buscar los datos del usuario cuando se inicie la página
    this.getPerfilsUser(this.route.snapshot.paramMap.get('id'));
  }

  // Obtiene datos del usuario
  getPerfilsUser(uid: string) {
    const path = 'users';
    const id = uid;
    this.firestore.getDoc<User>(path, id).subscribe(res => {
      if (res) {
        this.cliente.id = res.uid;
        this.cliente.username = res.username;
        this.cliente.email = res.email;
        this.cliente.perfil = res.perfil;
      }
    })
  }
}
