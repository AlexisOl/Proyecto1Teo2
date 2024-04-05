import { Component } from '@angular/core';
import { HeaderUsuarioComponent } from "../header-usuario/header-usuario.component";

@Component({
    selector: 'app-vista-voluntariados',
    standalone: true,
    templateUrl: './vista-voluntariados.component.html',
    styleUrl: './vista-voluntariados.component.css',
    imports: [HeaderUsuarioComponent]
})
export class VistaVoluntariadosComponent {

}
