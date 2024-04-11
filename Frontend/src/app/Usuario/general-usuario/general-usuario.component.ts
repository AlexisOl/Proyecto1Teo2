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
import { Chart } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { insignias } from '../../models/insignias';
import { UsuarioServicioService } from '../../services/usuario-servicio.service';
import { cupones } from '../../models/cupones';
@Component({
  selector: 'app-general-usuario',
  standalone: true,
  imports: [MatExpansionModule, HeaderUsuarioComponent, MatCardModule, FormsModule, MatButtonModule, BaseChartDirective],
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
  chart:any
  facturas:any
  insginias:any
  cupones:any

  constructor(private sesionServicio: SesionServicioService,
              private comprarServicio: ComprasServicioService,
              private voluntariadoServicio:VoluntariadoServicioService,
            private usuarioServicio:UsuarioServicioService){}



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

  //funcion para generar grafico
  generarGrafico() {
    this.comprarServicio.obtenerIdFacturasTotal(this.sesionServicio.getUsuario()?.id).subscribe(
      (facturas: factura) => {
        this.facturas =facturas
        console.log(this.facturas);
        this.formaGrafica()
      }
    );
  }
  formaGrafica(){
    if (this.chart) {
      this.chart.destroy(); // Destruir la instancia anterior del gráfico
    }

    this.chart = new Chart('forma', {
      type: 'line',
      data: {
        labels: this.facturas.map((row: { id: any; }) => "Factura no."+row.id),
        datasets: [{
          label: 'Precio Total',
          data: this.facturas.map((row: { precioTotal: any; }) => row.precioTotal)
        }]
      }
    });
  }

  obtenerTotal(valor:number){
    let element =0
    for (let index = 0; index < this.facturasDetalle[valor].length; index++) {
       element += Number(this.facturasDetalle[valor][index].precioParcial);
    }
    return element;
  }


  obtenerCupones(id:number|undefined){
    this.usuarioServicio.obtenerCupones(id).subscribe(
      (cupon:cupones) => {
        console.log(cupon, "a");
        
        this.cupones = cupon
      }
    );
  }

  //funcion pra generar grafica

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
        this.generarGrafico();
  
        //funcion para obtener insignias
        this.voluntariadoServicio.obtenerInsignia(this.sesionServicio.getUsuario()?.id).subscribe(
          (elementos:insignias) => {
            this.insginias = elementos
          }
        )
        //funcion para obtener cupones
        this.obtenerCupones(this.sesionServicio.getUsuario()?.id)
  
      }
}
