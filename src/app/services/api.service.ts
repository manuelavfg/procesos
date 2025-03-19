import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { BienDialogComponent } from '../shared/bien-dialog/bien-dialog.component';
import { ReportsDialogComponent } from '../shared/reports-dialog/reports-dialog.component';


@Injectable({providedIn: 'root'})

export class APIService {

dialog = inject(MatDialog)

    mostrarError(mensaje: string) {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: mensaje },
          width: '400px'
        });
    }

    mostrarExito(mensaje: string) {
        this.dialog.open(BienDialogComponent, {
          data: { message: mensaje },
          width: '400px'
        });
    }


    mostrarReporte(mensaje: string) 
    {
        this.dialog.open(ReportsDialogComponent, {
          data: { message: mensaje },
          width: '400px'
        });
    }



	private hideElementSubject= new BehaviorSubject<boolean>(this.getInitialState())
	hideElement$ = this.hideElementSubject.asObservable();
  

	private getInitialState(): boolean {
        if (typeof window !== 'undefined') {
            console.log('we are running on the client')
            return localStorage.getItem('hideElement') === 'true';
        } else {
            console.log('we are running on the server');
            return false
        }
	}
  
	setHideElement(value: boolean): void {
	  localStorage.setItem('hideElement', value.toString());
	  this.hideElementSubject.next(value);
	}

	usuario:any
	clave:any
    config:any
	constructor(private http: HttpClient ) 
	{
	}
	
	recovery: any
	correo: any

	getcorreo(data:any)
	{
		this.correo = data;
	}

	sendcorreo()
	{
		return this.correo
	}

    sendconfig(){
        this.select('config','list',{limit:50}).subscribe(res=>{
            let p:any
            p = res
            localStorage.setItem("config",JSON.stringify(p))
        })
        let a:any
        a = localStorage.getItem('config')
        this.config = JSON.parse(a)
        return this.config
    }

	getrecovery(data:any)
	{
		this.recovery = data;
		localStorage.setItem('recovery', JSON.stringify(this.recovery))
	}	

	select(tabla : string, metodo: string,params:any)
	{
		if(params == null)
		{
			let url: string = "https://localhost/SUMELZUCA/Controlador/api.php/"+tabla+"/"+metodo;
			return this.http.get(url);
		}
		let httpParams: any
		httpParams = new HttpParams()
		for(let [key,value] of Object.entries(params)) {
			httpParams = httpParams.set(key, value)
		}
			

		
		
		let url: string = "https://localhost/SUMELZUCA/Controlador/api.php/"+tabla+"/"+metodo+"?"+httpParams;
		return this.http.get(url);
	}	
	
	getlogin(a: any)
	{
		if(a['auth']){localStorage.setItem("cuenta",JSON.stringify(a));}
	}
	
	insert(tabla:string, metodo:string, params: any)
	{
		let httpParams: any
		httpParams = new HttpParams()
		for(let [key,value] of Object.entries(params)) {
			httpParams = httpParams.set(key, value)
		}
			
			
			
		
		
		let url: string = "https://localhost/SUMELZUCA/Controlador/api.php/"+tabla+"/"+metodo+"?"+httpParams;

		return this.http.post(url, params);
	}
	
	delete(tabla: string, metodo: string, params: any){
		
		let httpParams: any
		httpParams = new HttpParams()
		for(let [key,value] of Object.entries(params)) {
			httpParams = httpParams.set(key, value)
		}
			
		
		
		let url: string = "https://localhost/SUMELZUCA/Controlador/api.php/"+tabla+"/"+metodo+"?"+"id="+httpParams;
		return this.http.delete(url);
		
	}
		
	update(tabla: string, metodo: string, params: any){
		let httpParams: any
		httpParams = new HttpParams()
		for(let [key,value] of Object.entries(params)) {
			httpParams = httpParams.set(key, value)
		}
			
		
		
		let url: string = "https://localhost/SUMELZUCA/Controlador/api.php/"+tabla+"/"+metodo+"?"+httpParams;
		return this.http.put(url,params);
		
	}
	
}