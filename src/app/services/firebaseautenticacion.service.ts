import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioMovil } from '../modelDB';
// import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseautenticacionService {

  usuario: UsuarioMovil;
  constructor(public auth: AngularFireAuth,
    /* private firestoreService: FirestoreService */) { 
      this.stateUser();
    }

  
    stateUser(){
      this.stateAuth().subscribe( res => {
        console.log(res);
        if (res !== null){
          //this.getInfoUser();
        }
      });
    }

    login(email:string, password: string) {
      return this.auth.signInWithEmailAndPassword(email, password);
    }
    logout() {
      return this.auth.signOut();
    }
    registrar(email:string, password: string){
      return this.auth.createUserWithEmailAndPassword(email, password);
    }

    async getUid(){
      //currentUser retorna todas la credenciales que tiene el usuario
      const user = await this.auth.currentUser;
      if(user === null){
        return null;
      }else{
        console.log('Obtiene el id para registrar');
        return user.uid;
      }
    }
  
  
    stateAuth(){
      return this.auth.authState;
    }
  
    // async getInfoUser(){
    //   const path = 'Cliente';
    //   const uid = await this.getUid();
    //   this.firestoreService.getDoc<Cliente>(path, uid).subscribe(res =>{
    //     if(res != undefined){
    //       this.datosCliente = res;
    //       console.log('this.datosCliente ==>', this.datosCliente);
    //     }
    //   });
    // }
}
