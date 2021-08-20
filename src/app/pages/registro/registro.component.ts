import { Component, OnInit } from '@angular/core';
import { UsuarioMovil } from 'src/app/modelDB';
import { FirebaseautenticacionService } from 'src/app/services/firebaseautenticacion.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioMovil = {
    uid: '',
    fechaCreacion: new Date,
    nombre: '',
    apellido: '',
    foto: '',
    email: '',
    password: '',
  }
  
  
  constructor(public firebaseautenticacionService: FirebaseautenticacionService,
              public firestoreService:FirestoreService,) { }

  ngOnInit() {}

  async registrar(){
    console.log('registrar()');
    console.log(this.usuario.password);
    const email= this.usuario.email;
    const password = this.usuario.password;
    await this.firebaseautenticacionService.registrar(email, password).then(res => {
      console.log('Registro exitoso!');
      this.registrarEnBD();
    }).catch( error => {
      console.log('error al registrar -->', error);
      console.log('error al registrar -->', error.code);
      if(error.code === "auth/invalid-email"){
        console.log('Mal formato');
      }else if(error.code==="auth/weak-password"){
        console.log('La clave necesita almenos 6 caracteres');
      }
      else if(error.code==="auth/email-already-in-use"){
        console.log('Este correo ya ha sido registrado con aterioridad');
      }
    }) ;
  }

  async registrarEnBD(){
    const uid = await this.firebaseautenticacionService.getUid();
      this.usuario.uid = uid //aqui se le asigna id al registro 
      await this.guardarUser();
      console.log(uid);
  }

  async guardarUser() {
    
    const path = '/UsuarioMobil';
    const name = this.usuario.nombre;
    console.log('nombre: ', this.usuario.nombre);
    console.log('guardarUser()  ==>> this.cliente.nombre');
    // if(this.newFile !== undefined){//si esque el usuario no quiere subir ninguna foto omite este paso
    //   const res = await this.firestorageService.subirImagen(this.newFile, path, name);
    //   this.cliente.foto = res;
    // }  
    console.log('el nombre del cliente que se quiere guardar es: ',this.usuario);
    await this.firestoreService.createDoc(this.usuario, path, this.usuario.uid).then(res => {
      console.log('CLIENTE Guardado con exitos!!!');
    }).catch(error => {
      console.log('No se pudo guardar el a ocurrido un error ->', error);
    });
  }
}
