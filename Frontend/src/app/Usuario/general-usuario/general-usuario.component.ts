import { Component, OnInit } from '@angular/core';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import { HttpClient } from '@angular/common/http';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { factura } from '../../models/factura';
import { switchMap } from 'rxjs';
import { usuario } from '../../models/usuario';
@Component({
  selector: 'app-general-usuario',
  standalone: true,
  imports: [MatExpansionModule, HeaderUsuarioComponent, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './general-usuario.component.html',
  styleUrl: './general-usuario.component.css'
})
export class GeneralUsuarioComponent implements OnInit{

  //informacion para presentar en la tabla
  nombreUsuario:string|undefined = ''
  areaUsuario:string = ''
  panelAbierto:boolean = false
  todasLasFacturas:any
  facturasDetalle:any=[]

  constructor(private sesionServicio: SesionServicioService,
              private comprarServicio: ComprasServicioService){}



  obtenerLasFacturas(){
    this.comprarServicio.obtenerFacturasId(this.sesionServicio.getUsuario()?.id).pipe(
      switchMap((factura:any) =>{
        this.todasLasFacturas = factura;
        console.log(factura,"a");

        return this.detalleFactura();
      })
    ).subscribe();
  }

  detalleFactura(){

    return this.todasLasFacturas.map((valores:any)=>{
      console.log(valores.id);

      //ahora si retorna todo
      return this.comprarServicio.obtenerFacturasIdDetalle(this.sesionServicio.getUsuario()?.id,valores.id).subscribe(
        (valores:any) =>{
          console.log(valores);
          this.facturasDetalle.push(valores)

        }
      )

    })
  }


  obtenerTotal(valor:number){
    let element =0
    for (let index = 0; index < this.facturasDetalle[valor].length; index++) {
       element += Number(this.facturasDetalle[valor][index].precioParcial);
    }
    return element;
  }

  ngOnInit(): void {
    this.nombreUsuario = this.sesionServicio.getUsuario()?.user;
    switch(this.sesionServicio.getUsuario()?.idRol) {
      case 1:
        this.areaUsuario = "Usuario"
        break;
      case 2:
        this.areaUsuario = "Administrador"
        break;
      default:
        this.areaUsuario = 'error'
        break;
    }
      console.log(
       this.sesionServicio.getUsuario()?.password);
        this.obtenerLasFacturas();
  }
}
