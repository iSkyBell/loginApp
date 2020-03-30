import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   }

   onSubmit(formRegister: NgForm) {
     if (formRegister.invalid) {
       return;
     }

     Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

     this.auth.signUp(this.usuario)
              .subscribe( (response) => {
                Swal.close();
                if (this.recordarme) {
                  localStorage.setItem('email',this.usuario.email);
                }
                this.router.navigateByUrl('/home');
              }, (errorResponse) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al autenticar',
                  text: 'Ocurrio un error inesperado'
                });
              });
   }

}
