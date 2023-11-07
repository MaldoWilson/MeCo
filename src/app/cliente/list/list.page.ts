import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  users: User[] = [];

  constructor(private FirestoreService: FirestoreService, private interaction: InteractionService) { }

  ngOnInit() {
    this.interaction.presentLoading('Cargando datos..');

    this.FirestoreService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      complete: () => {
        // Cierra la animación de carga una vez que los datos se han cargado
        this.interaction.closeLoading();
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        // Asegúrate de manejar errores según tus necesidades.
        this.interaction.closeLoading();
      },
    });

  }

}
