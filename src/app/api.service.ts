import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({providedIn: 'root'})

export class APIService {


	private hideElementSubject = new BehaviorSubject<boolean>(this.getInitialState());
	hideElement$ = this.hideElementSubject.asObservable();
  
	private getInitialState(): boolean {
	  return localStorage.getItem('hideElement') === 'true';
	}
  
	setHideElement(value: boolean): void {
	  localStorage.setItem('hideElement', value.toString());
	  this.hideElementSubject.next(value);
	}

	usuario:any
	p: any;
	clave:any
	constructor(private http: HttpClient ) { }
	
	recovery: any


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
		console.log(url)
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