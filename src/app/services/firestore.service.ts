import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database:AngularFirestore) { }


  createDoc(data: any, path: string, id: string){
    console.log('Llega a la creación del cliente: ',data);
    const collection  = this.database.collection(path);
    return collection.doc(id).set(data);
  }
}
