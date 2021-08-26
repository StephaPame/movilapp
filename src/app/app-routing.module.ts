import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ElectrolinerasComponent } from './pages/electrolineras/electrolineras.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { QuejasSComponent } from './pages/quejas-s/quejas-s.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    path: 'menu',
    component: HomeComponent
  },
  {
    path: 'perfil-usuario',
    component: PerfilUsuarioComponent
  },
  {
    path: 'quejas',
    component: QuejasSComponent
  },
  {
    path: 'electrolineras',
    component: ElectrolinerasComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    //si no se escribe nada en la ruta 
    path: '', 
    component: LoginComponent, 
  },
  {
    //ruta por defecto "si escriben cualquier cosa"
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
