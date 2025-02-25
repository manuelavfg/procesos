import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})

export class APIService {
	usuario:any
	p: any;
	clave:any
	constructor(private http: HttpClient ) { }
	
	select(tabla : string, metodo: string,params:any)
	{
		let httpParams: any
		httpParams = new HttpParams()
		for(let [key,value] of Object.entries(params)) {
			httpParams = httpParams.set(key, value)
		}
			

		
		
		let url: string = "https://localhost/SUMELZUCA/Controlador/api.php/"+tabla+"/"+metodo+"?"+httpParams;
		console.log(url)
		return this.http.get(url);
	}	
	
	getlogin(a: any,b:any){
		this.p = 
		{
			correousuario: a,
			contrasenausuarios: b
		}
		this.select("usuario","auth",this.p).subscribe({next:res=>
			{
				console.log(res)
				if(res == true){localStorage.setItem("cuenta",this.p)}
			}})

	}


	sendlogin(){

	}
	
	insert(tabla:string, metodo:string, params: any)
	{
		let httpParams: any
		httpParams = new HttpParams()
		for(let [key,value] of Object.entries(params)) {
			httpParams = httpParams.set(key, value)
		}
			
			
			
		
		
		let url: string = "https://localhost/SUMELZUCA/Controlador/api.php/"+tabla+"/"+metodo+"?"+httpParams;
		console.log(url);
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