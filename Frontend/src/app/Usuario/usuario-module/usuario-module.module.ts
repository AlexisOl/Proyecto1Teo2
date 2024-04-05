import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { GeneralUsuarioComponent } from '../general-usuario/general-usuario.component';
import { loginGuard } from '../../utils/login.guard';
import { ComprasUsuarioComponent } from '../compras-usuario/compras-usuario.component';
import { VentasUsuarioComponent } from '../ventas-usuario/ventas-usuario.component';
import { SeccionVoluntariadoComponent } from '../seccion-voluntariado/seccion-voluntariado.component';
import { FinanzasComponent } from '../finanzas/finanzas.component';
import { VistaVoluntariadosComponent } from '../vista-voluntariados/vista-voluntariados.component';

//creacion de rutas en modulo
const routes:Routes=[
  {path:'', component:GeneralUsuarioComponent},
  {path:'compras', component:ComprasUsuarioComponent},
  {path:'ventas', component:VentasUsuarioComponent},
  {path:'vista_de_voluntariado', component:VistaVoluntariadosComponent},
  {path:'voluntariado', component:SeccionVoluntariadoComponent},
  {path:'finanzas', component:FinanzasComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class UsuarioModuleModule { }
