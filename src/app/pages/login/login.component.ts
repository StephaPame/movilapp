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
    foto: '',
    email: '',
    password: '',
  }
  email = '';
  //hace el llamdo a la al servicio de autenticación 
  constructor(public firebaseautenticacionService: FirebaseautenticacionService) { }

  ngOnInit() {}

  async registrar(){
    console.log('registrar()');
    console.log(this.usuario.password);
    const email= this.usuario.email;
    const password = this.usuario.password;
    await this.firebaseautenticacionService.registrar(email, password).catch( error => {
      console.log('error al registrar -->', error);

      // error.
    }) ;
  }
}
