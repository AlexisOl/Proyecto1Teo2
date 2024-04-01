import { Routes } from '@angular/router';
import { VistaGeneralComponent } from './General/vista-general/vista-general.component';
import { LoginVistaComponent } from './General/login-vista/login-vista.component';
import { GeneralUsuarioComponent } from './Usuario/general-usuario/general-usuario.component';
import { GeneralAdminComponent } from './Admin/general-admin/general-admin.component';
import { SeccionVoluntariadoGeneralComponent } from './General/seccion-voluntariado-general/seccion-voluntariado-general.component';

export const routes: Routes =
[{path:'inicio', component: VistaGeneralComponent},
{path:'', redirectTo: 'inicio', pathMatch: 'full'  },
  {path:'voluntariado', component: SeccionVoluntariadoGeneralComponent },
 {path:'login', component:LoginVistaComponent},
 {path:'generalUsuario', loadChildren:() => import('./Usuario/usuario-module/usuario-module.module').then(m => m.UsuarioModuleModule)},
 {path:'generalAdmin', loadChildren:() => import('./Admin/admin-module/admin-module.module').then(n => n.AdminModuleModule)}
];


