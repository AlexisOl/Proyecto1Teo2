import { Routes } from '@angular/router';
import { VistaGeneralComponent } from './General/vista-general/vista-general.component';
import { LoginVistaComponent } from './General/login-vista/login-vista.component';

export const routes: Routes = [{path:'inicio', component: VistaGeneralComponent},
                               {path:'', redirectTo: 'inicio', pathMatch: 'full'  },
                              {path:'login', component:LoginVistaComponent}];


