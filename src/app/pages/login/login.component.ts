import { Component, OnInit } from '@angular/core';
import { UsuarioMovil } from 'src/app/modelDB';
import { AutenticacionService } from 'src/app/sevicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user1: UsuarioMovil = {
    uid: '',
    fechaCreacion: new Date,
    nombre: '',
    foto: '',
    email: '',
    password: '',
  }
  email = '';
  constructor(public authS: AutenticacionService) { }

  ngOnInit() {}

  registrar(){
    console.log('registrar()');
    console.log(this.email);
    // this.authS.signup(this.user1.email, this.user1.password);
  }
}
