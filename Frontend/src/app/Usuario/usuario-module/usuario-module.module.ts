import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { GeneralUsuarioComponent } from '../general-usuario/general-usuario.component';
import { loginGuard } from '../../utils/login.guard';

//creacion de rutas en modulo
const routes:Routes=[
  {path:'', component:GeneralUsuarioComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class UsuarioModuleModule { }
