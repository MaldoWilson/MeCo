import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserServiceService} from 'src/app/cliente/userService/user-service.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  cliente = {
    id: "",
    username: "",
    email: "",
    perfil: ""
  }

  clienteId: string;

  constructor(private router: Router, private route: ActivatedRoute, private firestore: FirestoreService, private userService: UserServiceService,
    private interaction: InteractionService) { }


  ngOnInit() {
    // Llama a getPerfilsUser para buscar los datos del usuario cuando se inicie la página
    this.clienteId = this.route.snapshot.paramMap.get('id');

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

  deleteUser() {
    this.interaction.presentLoading('Eliminado..')
    // Llama a la función eliminarCliente con el ID del cliente
    this.userService.eliminarClientess(this.clienteId).then(() => {
    // Redirige a la página de listar después de eliminar el cliente
    this.interaction.closeLoading();
    this.interaction.showSuccessToast('Eliminado con éxito');
    this.router.navigate(['/list']);
    }).catch(error => {
      console.error('Error al eliminar el cliente:', error);
      this.interaction.closeLoading();
      this.interaction.showErrorToast('No se ha podido eliminar');
    });
  }
}
