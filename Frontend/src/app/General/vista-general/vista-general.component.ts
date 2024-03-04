import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from "../header/header.component";
import { VistaCompraVisitaComponent } from '../vista-compra-visita/vista-compra-visita.component';

@Component({
    selector: 'app-vista-general',
    standalone: true,
    templateUrl: './vista-general.component.html',
    styleUrl: './vista-general.component.css',
    imports: [MatButtonModule, HeaderComponent, VistaCompraVisitaComponent]
})
export class VistaGeneralComponent {

}
