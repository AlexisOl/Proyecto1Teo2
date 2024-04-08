export class factura{
  map(arg0: (row: { nombre_producto: any }) => any): unknown[] | undefined {
    throw new Error('Method not implemented.')
  }
  id:number = 0
  id_publicacion!:number
  id_cliente!:number|undefined
  fecha!:Date
  precioTotal!:number
}
