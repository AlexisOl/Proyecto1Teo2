import { Component, Inject, OnInit } from '@angular/core';
import { HeaderUsuarioComponent } from "../header-usuario/header-usuario.component";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { VistaEspecificaProductoComprasComponent } from '../vista-especifica-producto-compras/vista-especifica-producto-compras.component';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { articulosVoluntariado } from '../../models/articulosVoluntariado';
import { insignias } from '../../models/insignias';

@Component({
    selector: 'app-vista-voluntariados',
    standalone: true,
    templateUrl: './vista-voluntariados.component.html',
    styleUrl: './vista-voluntariados.component.css',
    imports: [HeaderUsuarioComponent]
})
export class VistaVoluntariadosComponent implements OnInit{

productosVoluntariado:any
insigniaVoluntariado:any

constructor(  @Inject(MAT_DIALOG_DATA) public data: any,
private referencia: MatDialogRef<VistaEspecificaProductoComprasComponent>,
private ventasServicio: VentasServicioService,
private comprasServicio: ComprasServicioService,
private sesionServicio: SesionServicioService,
private voluntariadoServicio:VoluntariadoServicioService){}


  ngOnInit(): void {

    // para insiginias
    this.voluntariadoServicio.obtenerInsignia(this.data.datos.id).subscribe(
      (tipo:any) => {
        this.insigniaVoluntariado = tipo[0];

      }
    )

    // para articulos
    this.voluntariadoServicio.obtenerProductosVoluntariado(this.data.datos.id).subscribe(
      (articulos: articulosVoluntariado) => {
        this.productosVoluntariado = articulos
        console.log(articulos);

      }
    )


  }

}
