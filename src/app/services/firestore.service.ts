import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database:AngularFirestore) { }


  createDoc(data: any, path: string, id: string){
    console.log('Llega a la creación del documento: ',data);
    const collection  = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string){
    console.log('getDoc ()');
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  getCollection<tipo>(path: string){
    const collection = this.database.collection<tipo>(path); // se define un tipo para set-mascota
    return collection.valueChanges(); //value changes nos ayuda a estar pendientes de los cambios realizados en
    //la bd en tiempo real
  }
}
