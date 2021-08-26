import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { ElectrolinerasComponent } from './electrolineras/electrolineras.component';
import { QuejasSComponent } from './quejas-s/quejas-s.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    ElectrolinerasComponent,
    QuejasSComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    AppRoutingModule, 
    FormsModule,
    
  ]
})
export class PagesModule { }
