import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor() { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   }

   onSubmit(formRegister: NgForm) {
     if (formRegister.invalid) {
       return;
     }
     console.log('Formulario enviado');
     console.log(formRegister);
     
     console.log(this.usuario);
   }

}
