import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralAdminComponent } from '../general-admin/general-admin.component';
import { AceptarPublicacionVistaComponent } from '../aceptar-publicacion-vista/aceptar-publicacion-vista.component';
import { IngresoUsuarioVistaComponent } from '../ingreso-usuario-vista/ingreso-usuario-vista.component';
import { Routes, RouterModule } from '@angular/router';
import { AceptarVoluntariadoVistaComponent } from '../aceptar-voluntariado-vista/aceptar-voluntariado-vista.component';
import { PublicacionesElimindasComponent } from '../publicaciones-elimindas/publicaciones-elimindas.component';
import { ElementosCanceladosComponent } from '../elementos-cancelados/elementos-cancelados.component';
import { ReportesComponent } from '../reportes/reportes.component';

const routes: Routes = [
  { path: '', component: GeneralAdminComponent },
  { path: 'publicacion', component: AceptarPublicacionVistaComponent },
  { path: 'voluntariado', component: AceptarVoluntariadoVistaComponent },
  { path: 'repotado', component: PublicacionesElimindasComponent },
  { path: 'cancelado', component: ElementosCanceladosComponent },
  { path: 'reportes', component: ReportesComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class AdminModuleModule {}
