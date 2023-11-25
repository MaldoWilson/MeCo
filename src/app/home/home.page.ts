import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


// decorator service
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  constructor(public formBuilder:FormBuilder,
    public loadingCtrl: LoadingController,
    public authService:AuthService,
    public router : Router,
    private toastService: ToastService) {}


    // decorator service
    showSuccessToast() {
      this.toastService.showSuccessToast("hola");
    }

    // decorator service
    showErrorToast() {
      this.toastService.showErrorToast("hola");
    }


  ngOnInit() {}

}
