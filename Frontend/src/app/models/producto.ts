export class producto {
  [x: string]: any
  nombre!: string
  precio!: number
  descripcion!:string
  imagen!: string
  identificador_categoria!:number
  identificador_usuario!:number|undefined
  identificador_tipo_producto!:number
}
