import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ElectrolinerasComponent } from './pages/electrolineras/electrolineras.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { QuejasSComponent } from './pages/quejas-s/quejas-s.component';
import { RegistroComponent } from './pages/registro/registro.component';

//Usuario Logueado INCIO
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
// import { ProgresoDuenioComponent } from './pages/progreso-duenio/progreso-duenio.component';
// import { ProcesosDwComponent } from './pages/procesos-dw/procesos-dw.component';
// import { ValoracionDwComponent } from './pages/valoracion-dw/valoracion-dw.component';
const isLogged = () => redirectLoggedInTo(['/menu']);

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);
//Usuario Logueado FIN

const routes: Routes = [
  {
    path: 'menu',
    component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'perfil-usuario',
    component: PerfilUsuarioComponent, ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'quejas',
    component: QuejasSComponent, ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'electrolineras',
    component: ElectrolinerasComponent, ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'registro',
    component: RegistroComponent, ...canActivate(isLogged),
  },
  {
    path: 'login',
    component: LoginComponent, ...canActivate(isLogged),
  },
  {
    //si no se escribe nada en la ruta 
    path: '', 
    component: LoginComponent, ...canActivate(isLogged),
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
