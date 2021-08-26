import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ElectrolineraBD } from 'src/app/modelDB';

@Component({
  selector: 'app-electrolineras',
  templateUrl: './electrolineras.component.html',
  styleUrls: ['./electrolineras.component.scss'],
})
export class ElectrolinerasComponent implements OnInit {

  electrolinera: ElectrolineraBD ={
    direccion: '',
    domingo: '',
    estado: '',
    formaspago: '',
    jueves: '',
    latitud: null,
    longitud: null,
    lunes: '',
    martes: '',
    miercoles: '',
    name: '',
    numeroconectores: '',
    referencia: '',
    sabado: '',
    tipoconector: '',
    viernes: '',
  }

  electrolineraArray: ElectrolineraBD[];
  constructor(public firestoreService: FirestoreService) { }

  ngOnInit() {
    this.getEletrolinerasList();
  }


  
  getEletrolinerasList(){
    const path = '/electrolineras';
    this.firestoreService.getCollection<ElectrolineraBD>(path).subscribe( res=> {
      console.log(res);
      this.electrolineraArray = res;
    });
  }

}
