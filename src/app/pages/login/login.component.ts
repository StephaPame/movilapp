import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(public firebaseautenticacionService: FirebaseautenticacionService,
              private router: Router,) { }

  ngOnInit() {}

  login(){
    console.log('login()');
    this.firebaseautenticacionService.login(this.usuario.email, this.usuario.password).then( ()=>{
      this.router.navigate([`/menu`]);
    });
  }

  inicioGoogle(){
    console.log('inicioGoogle');
  }

  inicioFacebook(){
    console.log('inicioFacebook');
  }
}
