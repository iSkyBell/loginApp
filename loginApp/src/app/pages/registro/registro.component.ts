import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   }

   onSubmit(formRegister: NgForm) {
     if (formRegister.invalid) {
       return;
     }
     this.auth.signUp(this.usuario)
              .subscribe( (response) => {
                console.log(response);
              }, (errorResponse) => {
                console.error(errorResponse.error.error.message);
              });
   }

}
