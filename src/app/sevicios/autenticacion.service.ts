import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioMovil } from '../modelDB';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  currentUser: UsuarioMovil = null;
  user1: UsuarioMovil = {
    uid: '',
    fechaCreacion: new Date,
    nombre: '',
    foto: '',
    email: '',
    password: '',
  }

  constructor(private afAuth: AngularFireAuth, 
              private afs: AngularFirestore) { 
                // this.afAuth.onAuthStateChanged((user) => {
                //   this.currentUser = {user};      
                // });
              }



              async signup( email: string , password: string ): Promise<any> {
                console.log('email...', email);
                const credential = await this.afAuth.createUserWithEmailAndPassword(
                  email,
                  password
                );
                // const uid = credential.user.uid;
             
                // return this.afs.doc(
                //   `usuariosM/${uid}`
                // ).set({
                //   uid,
                //   email: credential.user.email,
                // })
              }
             
              signIn({ email, password }) {
                return this.afAuth.signInWithEmailAndPassword(email, password);
              }
             
              signOut(): Promise<void> {
                return this.afAuth.signOut();
              }
             
}
