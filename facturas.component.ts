import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import { APIService } from '../../api.service';

@Component({
  selector: 'app-facturas',
  imports: [ MatPaginator, MatPaginatorModule, MatButtonModule, MatTableModule, MatIconModule ],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent implements AfterViewInit{
  pagecount:any
  p:any;
  limit = 50;
  offset = 0;
  displayedColumns: string[] = ['codigofactura', 'nombreproveedores', 'tipofactura'];
  dataSource! : MatTableDataSource<Facturas>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: APIService){}

	ngAfterViewInit() {
		let p;
		let params= 
		{
			limit : this.limit,
			offset : this.offset,
		}


		this.api.select("factura","list", params).subscribe(res =>
		{
			this.p = res;
			this.dataSource = new MatTableDataSource(this.p)
			this.dataSource.paginator = this.paginator;
		})
	}

	public printTable() {
		const doc = new jspdf('p', 'mm', 'a4');
	
		// Información de la empresa (fija)
		const empresa = {
			nombre: "Mi Empresa S.A.",
			rif: "J-123456789",
			direccion: "Calle Falsa 123, Ciudad, País",
			telefono: "+123 456 789",
			email: "info@miempresa.com",
			logo: "C:\Users\Q\Desktop\front\src\assets\img\sumelzuca-logo.png" // URL del logo
		};

		const cliente= 
		{

			nombre:"masdasd",
			rif:"j-49984984",
			direccion:"asdad",
			telefono:"04126726734"
		}

		const factura = 
		{
			numeroControl: 1,
			fechaEmision: "02/02/02",
			fechaVencimiento: "03/03/03"
		}
	
		// Función para cargar la imagen
		const loadImage = (url:any, callback:any) => {
			const img = new Image();
			img.src = url;
			img.onload = () => callback(img);
			img.onerror = () => callback(null);
		};
	
		// Cargar la imagen
		loadImage(empresa.logo, (logo:any) => {
			// Configuración del documento
			const pageWidth = doc.internal.pageSize.getWidth();
			
			// 1. CABECERA DE FACTURA (RECTÁNGULO PRINCIPAL)
			doc.setDrawColor(0);
			doc.setLineWidth(0.5);
			
			// Rectángulo principal (10mm desde los bordes)
			doc.rect(10, 10, 190, 40); // x, y, width, height
			
			// Línea divisoria vertical
			doc.line(110, 10, 110, 50); // x1, y1, x2, y2
	
			// 2. LADO IZQUIERDO (INFORMACIÓN DE LA EMPRESA)
			let yPosition = 15;
			
			// Logo (si existe)
			if (logo) {
				doc.addImage(logo, "PNG", 15, 15, 25, 25);
				yPosition = 42; // Ajuste posición texto si hay logo
			} else {
				doc.setFontSize(14);
				doc.text(empresa.nombre, 15, 20);
				yPosition = 25;
			}
	
			// Detalles de la empresa
			doc.setFontSize(10);
			doc.text(`RIF: ${empresa.rif}`, 15, yPosition);
			doc.text(`Dirección: ${empresa.direccion}`, 15, yPosition + 5);
			doc.text(`Teléfono: ${empresa.telefono}`, 15, yPosition + 10);
			doc.text(`Email: ${empresa.email}`, 15, yPosition + 15);
	
			// 3. LADO DERECHO (INFORMACIÓN DE LA FACTURA)
			doc.setFontSize(16);
			doc.text("FACTURA", 180, 15, { align: "right" });
			
			doc.setFontSize(10);
			doc.text(`Número: ${factura.numeroControl}`, 180, 25, { align: "right" });
			doc.text(`Fecha Emisión: ${factura.fechaEmision}`, 180, 30, { align: "right" });
			doc.text(`Fecha Vencimiento: ${factura.fechaVencimiento}`, 180, 35, { align: "right" });
	
			// 4. INFORMACIÓN DEL CLIENTE (DEBAJO DEL ENCABEZADO)
			let startY = 55; // Posición debajo del rectángulo
			
			doc.setFontSize(12);
			doc.text("DATOS DEL CLIENTE:", 10, startY);
			
			doc.setFontSize(10);
			doc.text(`Nombre/Razón Social: ${cliente.nombre}`, 10, startY + 8);
			doc.text(`RIF/C.I.: ${cliente.rif}`, 10, startY + 13);
			doc.text(`Dirección: ${cliente.direccion}`, 10, startY + 18);
			doc.text(`Teléfono: ${cliente.telefono}`, 10, startY + 23);
	
			// 5. TABLA DE PRODUCTOS
			const columns = ["DESCRIPCIÓN", "UNIDAD", "CANT.", "PRECIO UNIT.", "TOTAL"];
			let subtotal: any

			let datos: any;
			this.api.select("articulo", "factura", [1]).subscribe({
				next: (value) => {
					for (let i of Object.values(value)) {
						datos = [
							[i.descripcionarticulo,
							i.tipoarticulo,
							i.existenciaarticulo,
							i.costoarticulo,
							(i.existenciaarticulo * i.costoarticulo)
							]
						];
						subtotal = i.existenciaarticulo * i.costoarticulo;
					}

					const iva = subtotal * 0.16;
					const totalGeneral = subtotal + iva;
			
			autoTable(doc, {
				head: [columns],
				body: datos,
				startY: startY + 30,
				theme: 'grid',
				styles: { fontSize: 8 },
				headStyles: { fillColor: [220, 220, 220] }
			});
	
			// 6. TOTALES
			const finalY = (doc as any).lastAutoTable.finalY + 10;
						// 7. FOOTER
						const footerY = finalY + 30;
						const footerHeight = 45;
				
						// Rectángulo del footer
						doc.setDrawColor(0);
						doc.rect(10, footerY, 190, footerHeight);
				
						// Línea divisoria vertical
						doc.line(110, footerY, 110, footerY + footerHeight);
				
						// Cabecera "NOTAS"
						doc.setFontSize(12);
						doc.text("NOTAS", 15, footerY + 8);
				
						// Texto izquierdo
						doc.setFontSize(9);
						const textoNotas = [
							"Emitir cheque conformable a nombre de",
							"SUMINISTROS ELECTRICOS DEL ZULIA, C.A (SUMELZCUCA).",
							"R.I.F. J-502065156, y/o realizar transferencia bancaria a",
							"BANESCO BANCO UNIVERSAL, C.A., cuenta corriente",
							"No. 0134-0073-33-0731071609."
						];
				
						let textY = footerY + 15;
			textoNotas.forEach(linea => {
				doc.text(linea, 15, textY);
				textY += 5;
			});
			doc.setFontSize(12);
			doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 180, finalY, { align: "right" });
			doc.text(`IVA (16%): $${iva.toFixed(2)}`, 180, finalY + 7, { align: "right" });
			doc.text(`TOTAL GENERAL: $${totalGeneral.toFixed(2)}`, 180, finalY + 14, { 
				align: "right",
			});
	
			// Guardar PDF
			doc.save(`factura_${factura.numeroControl}.pdf`);
		}
	});
		});
	}


}

export interface Facturas {
  idfactura:any,
  idcliente:any,
  idarticulofactura:any,
  codigofactura: any;
  idproveedorfactura: any;
  nombreproveedores: any;
  tipofactura: any;
}

