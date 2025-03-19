import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

    constructor() { }
    
    avanzar:any
    retroceder:any
    factura:any
    seleccion:any
    datosproveedor:any

    setavanzar(data:any){
        this.avanzar = data
    }

    setretroceder(data:any){
        this.retroceder = data
    }
    setfactura(data:any){
        this.factura = data
    }
    setdatosproveedor(data:any){
        this.datosproveedor = data
    }

}
