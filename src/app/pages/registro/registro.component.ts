import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
  loading: any;
  constructor(public firebaseautenticacionService: FirebaseautenticacionService,
              public firestoreService:FirestoreService,
              public firestorageService: FirestorageService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              private router: Router,) { }

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
    this.presentLoading();
    const path = '/UsuarioMobil';
    const name = this.usuario.nombre;
    console.log('nombre: ', this.usuario.nombre);
    console.log('guardarUser()  ==>> this.cliente.nombre');
    console.log('el nombre del cliente que se quiere guardar es: ',this.usuario);
    await this.firestoreService.createDoc(this.usuario, path, this.usuario.uid).then(res => {
      this.loading.dismiss();
      console.log('CLIENTE Guardado con exitos!!!');
      // this.router.navigate(['/menu'], { replaceUrl: true });
      this.presentToast('Registro Exitoso', 2000);
    }).catch(error => {
      console.log('No se pudo guardar el a ocurrido un error ->', error);
      this.presentToast('Un error ha ocurrido durante el registro', 2000);
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Registrando...',
    });
    await this.loading.present();
  }

  async presentToast(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo 
    });
    toast.present();
  }
}
