import { Component } from '@angular/core';
import { HeaderAdminComponent } from "../header-admin/header-admin.component";

@Component({
    selector: 'app-publicaciones-elimindas',
    standalone: true,
    templateUrl: './publicaciones-elimindas.component.html',
    styleUrl: './publicaciones-elimindas.component.css',
    imports: [HeaderAdminComponent]
})
export class PublicacionesElimindasComponent {
  listaPublicaciones:any

}
