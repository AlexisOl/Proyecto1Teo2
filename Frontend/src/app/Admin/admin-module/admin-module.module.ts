import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralAdminComponent } from '../general-admin/general-admin.component';
import { AceptarPublicacionVistaComponent } from '../aceptar-publicacion-vista/aceptar-publicacion-vista.component';
import { IngresoUsuarioVistaComponent } from '../ingreso-usuario-vista/ingreso-usuario-vista.component';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes=[
  {path:'', component:GeneralAdminComponent},
  {path:'publicacion', component:AceptarPublicacionVistaComponent},
  {path:'usuarios', component:IngresoUsuarioVistaComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AdminModuleModule { }
