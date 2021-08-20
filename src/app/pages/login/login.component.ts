import { Component, OnInit } from '@angular/core';
import { UsuarioMovil } from 'src/app/modelDB';
import { FirebaseautenticacionService } from 'src/app/services/firebaseautenticacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  usuario: UsuarioMovil = {
    uid: '',
    fechaCreacion: new Date,
    nombre: '',
    apellido: '',
    foto: '',
    email: '',
    password: '',
  }
  //hace el llamdo a la al servicio de autenticación 
  constructor(public firebaseautenticacionService: FirebaseautenticacionService) { }

  ngOnInit() {}

  
}
