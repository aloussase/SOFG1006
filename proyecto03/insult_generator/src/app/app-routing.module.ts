import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AcercaComponent} from './acerca/acerca.component';
import {CrearInsultoComponent} from './crear-insulto/crear-insulto.component';
import {HomeComponent} from './home/home.component';
import {MisInsultosComponent} from './mis-insultos/mis-insultos.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'mis_insultos', component: MisInsultosComponent},
  {path: 'crear_insulto', component: CrearInsultoComponent},
  {path: 'acerca', component: AcercaComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
