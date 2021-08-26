import { Component, OnInit } from '@angular/core';
import { UsuarioMovil } from 'src/app/modelDB';
import { FirebaseautenticacionService } from 'src/app/services/firebaseautenticacion.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
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
  
  ingresarEnable = false;
  newFile : any;
  constructor(public firebaseautenticacionService: FirebaseautenticacionService,
              public firestoreService:FirestoreService,
              public firestorageService: FirestorageService,) { }

  ngOnInit() {}

  async newImageUpload(event: any ){
    console.log(event);
    if(event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) =>{
        this.usuario.foto = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
    console.log('Fin de carga de imagen ');
  }

  async registrar(){
    console.log('registrar()');
    console.log(this.usuario.password);
    const email= this.usuario.email;
    const password = this.usuario.password;
    await this.firebaseautenticacionService.registrar(email, password).then(res => {
      console.log('Registro exitoso!');
      const path = '/UsuarioMobil';
      const fotoRes = this.firestorageService.uploadImagen(this.newFile, path , this.usuario.nombre);
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
