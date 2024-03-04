import { Routes } from '@angular/router';
import { VistaGeneralComponent } from './General/vista-general/vista-general.component';

export const routes: Routes = [{path:'inicio', component: VistaGeneralComponent},
                               {path:'', redirectTo: 'inicio', pathMatch: 'full'  }];


