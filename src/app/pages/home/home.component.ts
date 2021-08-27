import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseautenticacionService } from 'src/app/services/firebaseautenticacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(public firebaseautenticacionService: FirebaseautenticacionService,
              private router: Router,
  ) { }

  ngOnInit() {}

  async logout(){
      console.log('Cerror al salir');
      await this.firebaseautenticacionService.logout();
      this.router.navigate([`/login`]);
  }
}
