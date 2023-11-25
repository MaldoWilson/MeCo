import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userService/user-service.service';
import { User } from 'src/app/models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  userId = null;

  usuario: User = { uid: '', username: '', email: '', password: '', perfil: 'client' };

  constructor(private userService: UserServiceService, private router: Router, private route: ActivatedRoute, private interaction: InteractionService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    // Lógica para obtener la información del usuario
    this.userService.obtenerUsuario(this.userId).subscribe((user) => {
      this.usuario = user;
    });
  }

  updateUser(): void {
    // Lógica para actualizar la información del usuario
    this.interaction.presentLoading('Actualizando..')
    this.userService.updateUser(this.usuario.uid, this.usuario).then(() => {
      console.log('Usuario actualizado correctamente');
      this.interaction.closeLoading();
      this.router.navigate(['/detail',this.userId])
      this.interaction.showSuccessToast('Modificado con éxito');
    }).catch(error => {
      console.error('Error al actualizar el usuario:', error);
      this.interaction.closeLoading();
      this.interaction.showErrorToast('No se ha podido modificar el usuario');
    });
  }
}
