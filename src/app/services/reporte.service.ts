import { inject, Injectable } from '@angular/core';
import { APIService } from './api.service';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class ReporteService {

    api = inject(APIService)


    selectEncabezado(tabla:any)
    {

        switch(tabla)
        {
            case "factura":
                return ["Codigo","N° Factura", "Fecha Emision", "Cliente", "RIF", 'Tipo']

            case "clientes":
                return ["Nombre","RIF", "Telefono","Ventas Realizada","Monto Total"]

            case "proveedores":
                return ["Nombre","RIF", "Telefono", 'Compras Realizada', "Monto Total"]

            case "articulo":
                return ["Codigo","Descripcion", "Unidad", "Proveedor", "Precio", "Existencia",'Compras','Ventas']

            case "usuario":
                return ["Nombre","Cedula", "Correo", "Telefono", "Cargo"]

            default:
                return false
        }
    }


    deteminarTabla(items:any, filtrado:any, tabla:any)
    {
        let opciones:any[] = []
        let datos: any[] = [];
        let headers: any[] = [];
        switch(tabla)
        {
            case "articulo":
                if(filtrado=== "compra")
                    {
                        headers = ["Codigo","N° Factura", "Fecha Emision", "Cliente", "RIF", 'Cantidad', 'Precio', 'Total']
                        for (let i of items) {
                            datos.push([
                                i.codigofactura,
                                i.numerofactura,
                                i.fechaemision,
                                i.nombreproveedores,
                                i.rifproveedores,
                                i.existenciaarticulo,
                                i.existenciaarticulo,
                                i.costoarticulo,
                                i.compras,
                                i.ventas,
                            ]);
                        }
                    }
        
                if(filtrado === "ventas")
                        {
                            headers = ["Codigo","N° Factura", "Fecha Emision", "Cliente", "RIF", 'Cantidad', 'Precio', 'Total']
                            for (let i of items) {
                                datos.push([
                                    i.codigofactura,
                                    i.numerofactura,
                                    i.fechaemision,
                                    i.nombreclientes,
                                    i.rifclientes,
                                    i.existenciaarticulo,
                                    i.existenciaarticulo,
                                    i.costoarticulo,
                                    i.compras,
                                    i.ventas,
                                ]);
                            }
                    }
                break

            case "proveedores":
                headers = ["Codigo Factura","N° Factura", "Codigo Articulo", 'Descripcion','Compras', "Monto Total"]
                for (let i of items) {
                    datos.push(
                        [
                            i.codigofactura,
                            i.numerofactura,
                            i.codigoarticulo,
                            i.descripcionarticulo,
                            i.compras,
                            i.total
                        ]
                    );
                }
                break
                case "clientes":
                    headers = ["Codigo Factura","N° Factura", "Codigo Articulo", 'Descripcion','Ventas', "Monto Total"]
                    for (let i of items) {
                        datos.push(
                            [
                                i.codigofactura,
                                i.numerofactura,
                                i.codigoarticulo,
                                i.descripcionarticulo,
                                i.compras,
                                i.total
                            ]
                        );
                    }
                    break
        }
            opciones = [headers, datos]
            return opciones
    }

    selectEncabezadoDetallado(tabla:any, filtrado:any)
    {

        switch(tabla)
        {
            case "factura":
                return ["Codigo","N° Factura", "Fecha Emision", "Cliente", "RIF", 'Tipo']

            case "clientes":
                return ["Nombre","Rif", "Telefono", "Direccion", "Correo","Ventas","Total"]

            case "proveedores":
                return ["Nombre","Rif", "Telefono", "Direccion", "Correo", 'Compras', "Total"]

            case "articulo":
                if(filtrado == "fecha"){return ["Fecha Entrada", "Cliente", "RIF", 'Cantidad', 'Precio', 'Total']}
                return ["Codigo","N° Factura", "Fecha Emision", "Cliente", "RIF", 'Cantidad', 'Precio', 'Total']

            case "usuario":
                return ["Nombre","Cedula", "Correo", "Telefono", "Cargo"]

            default:
                return false
        }
    }

    public printFactura(id:any)
    {       
            let p = this.api.sendconfig()
            const doc = new jspdf('p', 'mm', 'a4');
            doc.setFont("Calibri");
            const empresa = { 
                nombre: p[0]['nombreconfig'],
                rif: p[0]['rifconfig'],
                direccion: p[0]['dirconfig'],
                telefono: "(+58) "+p[0]['telefonoconfig'],
                email: p[0]['correoconfig'],
                logo: '/assets/img/sumelzucalogo.png' // URL del logo
            };
            let m:any
            this.api.select("factura","pdf",{id:id}).subscribe({next:(res)=>{

                let j:any = res
                let m = j[0]
                console.log(m[0])
                const cliente= 
                {
                    
                    nombre: m.nombreclientes || m.nombreproveedores,
                    rif: m.rifclientes || m.rifproveedores,
                    direccion: m.direccionclientes || m.direccionproveedores,
                    telefono: m.telefonoclientes || m.telefonoproveedores
                }
        
                const factura = 
                {
                    numeroControl: m.numerofactura,
                    fechaEmision: m.fechaemision || "no existe",
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
                doc.setLineWidth(0.3);
                
                // Rectángulo principal (10mm desde los bordes)
                doc.rect(10, 50, 190, 30); // x, y, width, height
                
                // Línea divisoria vertical
                doc.line(110+20, 50, 110+20, 80); // x1, y1, x2, y2
        
                // 2. LADO IZQUIERDO (INFORMACIÓN DE LA EMPRESA)
                let yPosition = 12;
                
                // Logo (si existe)
                if (logo) {
                    doc.addImage(logo, "PNG", 10, 5, 60, 40);
                    yPosition = 32; // Ajuste posición texto si hay logo
                } else {
                    doc.setFontSize(14);
                    doc.text(empresa.nombre, 15, 20);
                    yPosition = 0;
                }
                let incremento = 4;	
                let xPosition = 120;
                // Detalles de la empresa
                doc.setFontSize(10);
                const textoNotas = `Dirección: ${empresa.direccion}`
                doc.text(`${empresa.nombre}`, xPosition, yPosition), {align: "right"};
                doc.text(textoNotas, xPosition,  yPosition+incremento, { align: "justify" , maxWidth: 75});
                
                doc.text(`Email: ${empresa.email} / Telf: ${empresa.telefono}`, xPosition, yPosition + incremento*3), {align: "right"};
                
                // 3. LADO DERECHO (INFORMACIÓN DE LA FACTURA)
                doc.setFontSize(14);
                yPosition = 58;
                incremento = 6;
                doc.text(m.tipofactura, 192, yPosition+incremento*2.5, { align: "right" });
                
                doc.setFontSize(10);
                doc.text( m.tipofactura+`:  ${factura.numeroControl}`, 190, yPosition, { align: "right" });
                doc.text(`FECHA: ${factura.fechaEmision}`, 190, yPosition+incremento, { align: "right" });
                
                // 4. INFORMACIÓN DEL CLIENTE (DEBAJO DEL ENCABEZADO)
                let startY = 50; // Posición debajo del rectángulo
                
                
                doc.setFontSize(10);
                doc.text(`CLIENTE: ${cliente.nombre}`, 12, startY+5, { maxWidth: 115});
                doc.text(`RIF: ${cliente.rif}`, 12, startY + 11);
                doc.text(`DIRECCIÓN: ${cliente.direccion}`, 12, startY + 18,{ maxWidth: 115});
                doc.text(`TELÉFONO: ${cliente.telefono}`, 12, startY + 28);
        
                // 5. TABLA DE PRODUCTOS
                const columns = ['ITEM',"DESCRIPCIÓN", "UNIDAD", "CANT.", "PRECIO UNIT.", "TOTAL"];
                let subtotal = 0
                let Exento = 0
                
                let datos: any[] = [];
                let p ={idfactura:id}
                let it:any = 1
                this.api.select("recibo", "list", p).subscribe({
                    next: (value) => {
                        for (let i of Object.values(value)) {
                            let a = i.descripcionarticulo
                            if(i.esexento){ a = a+"(E)"}
                            datos.push
                            (
                                [it,
                                a,
                                i.tipoarticulo,
                                i.cantidadrecibo,
                                "$"+i.preciorecibo,
                                "$"+(i.cantidadrecibo * i.preciorecibo)
                                ]
                        );
                            subtotal += i.cantidadrecibo * i.preciorecibo;
                            if(i.esexento){ Exento += i.cantidadrecibo * i.preciorecibo;}
                            i++
                        }

                        const totalGravado = subtotal - Exento
                        const iva = totalGravado * 0.16;
                        const totalExento = Exento
                        const totalGeneral = totalGravado + iva + Exento;
                
                autoTable(doc, {
                    head: [columns],
                    body: datos,
                    startY: startY + 35,
                    styles: { halign: "center", font: "Calibri" },
                    tableWidth: doc.internal.pageSize.getWidth() - 19.5,
                    margin: { left: 10 },
                    headStyles: {
                        fillColor: '#FFFFFF',
                        textColor: '#000000',
                        lineColor: '#000000',
                        lineWidth: 0.3
                    },
                      bodyStyles: {
                        fillColor: '#FFFFFF', // Fondo gris claro para filas
                        textColor: '#000000',  // Texto gris oscuro
                        lineColor: '#000000',  // Bordes negros (opcional)
                        lineWidth: 0.3
                      },
                });
        
                // 6. TOTALES
                const finalY = (doc as any).lastAutoTable.finalY + 10;
                // 7. FOOTER
                const footerY = finalY + 30;
                            const footerHeight = 35;
                            
                            // Rectángulo del footer
                            doc.setDrawColor(0);
                            doc.rect(10, footerY, 190, footerHeight);
                    
                            // Línea divisoria vertical
                            doc.line(130, footerY, 130, footerY + footerHeight);
                            doc.setLineWidth(0.3)
                            doc.line(10, footerY +footerHeight-4, 130, footerY + footerHeight-4);
                            doc.setLineWidth(0.3)
                            doc.line(10, footerY+6, 130, footerY + 6);
                            
                            // Cabecera "NOTAS"
                            doc.setFontSize(12);
                            doc.text("NOTAS:", 11, footerY + 4.5);
                            
                            // Texto izquierdo
                            doc.setFontSize(12);
                            const textoNotas = 'Emitir cheque conformable a nombre de “SUMINISTROS ELECTRICOS DEL ZULIA, C.A (SUMELZCUCA)". R.I.F. J-502065156, y/o realizar transferencia bancaria a BANESCO BANCO UNIVERSAL, C.A., cuenta corriente No. 0134-0073-33-0731071609.'
                            let textY = footerY + 10;
                            doc.text(textoNotas, 11, textY, { align: "justify" , maxWidth: 117});
                // textoNotas.forEach(linea => {
                    // 	doc.text(linea, 11, textY,{align: "justify"});
                    // 	textY += 5;
                    // });
                    incremento = 7;
                    let incrementoX = 66;
                let totalesY = footerY+4.5;
                let totalesX = 132;
                let subtotalY = totalesY+1;
                let totalExentoY = totalesY + incremento;
                let totalGravadoY = totalesY + incremento*2;
                let ivaY = totalesY + incremento*3;
                let totalFacturaY = totalesY + incremento*4;
                // Totales
                doc.setFontSize(12);
                doc.text(`SUB-TOTAL`, totalesX, subtotalY, { align: "left" });
                doc.text(`$${subtotal.toFixed(2)}`, totalesX + incrementoX, subtotalY, { align: "right" });
                doc.text(`TOTAL EXENTO`, totalesX, totalExentoY, { align: "left" });
                doc.text(`$${totalExento.toFixed(2)}`, totalesX+incrementoX, totalExentoY, { align: "right" });
                doc.text(`TOTAL GRAVADO`, totalesX, totalGravadoY, { align: "left" });
                doc.text(`$${totalGravado.toFixed(2)}`, totalesX+incrementoX, totalGravadoY, { align: "right" });
                doc.text(`IVA 16%`, totalesX, ivaY, { align: "left" });
                doc.text(`$${iva.toFixed(2)}`, totalesX+incrementoX, ivaY, { align: "right" });
                doc.text(`TOTAL FACTURA`,  totalesX, totalFacturaY, { align: "left",});
                doc.text(`$${totalGeneral.toFixed(2)}`, totalesX+incrementoX, totalFacturaY, { align: "right",});
                
                // Guardar PDF
                doc.save(`factura_${factura.numeroControl}.pdf`)
            }
        });
    });
}})
    }

    public printListadoF(tabla:any)
    {       
        let p = this.api.sendconfig()
        const doc = new jspdf();
        const headers:any = this.selectEncabezado(tabla)
        // Configuraciones iniciales
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 10; // Márgen izquierdo
        let currentY = 15; // Posición Y actual
        
        // 1. Agregar logo (ajusta la ruta y dimensiones según tu imagen)
        const logoUrl = '/assets/img/sumelzucalogo.png';
        doc.addImage(logoUrl, 'PNG', margin, 5, 40, 30);
        
        // 2. Nombre de la empresa (centrado)
        doc.setFontSize(16);
        doc.setFont('calibri', 'bold');
        const companyName = p[0]['nombreconfig'];
        const textWidth = doc.getTextWidth(companyName);
        const centerX = (pageWidth - textWidth +20) / 2;
        doc.text(companyName, centerX, currentY);
        currentY += 8; // Ajustar posición Y
        
        // 3. RIF
        doc.setFontSize(12);
        doc.setFont('calibri', 'normal');
        const rif = p[0]['rifconfig'];
        doc.text(rif, centerX+50, currentY);
        currentY += 6;
        
        // 4. Fecha actual
        const today = new Date();
        const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
          (today.getMonth() + 1).toString().padStart(2, '0')}/${
          today.getFullYear()}`;
        doc.text(`${formattedDate}`, centerX+51.5, currentY);
        currentY += 10;
        
        // 5. Línea divisora
        doc.setLineWidth(0.3);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 5;
        const datos: any[] = [];
        this.api.select("factura","print",{basura:1}).subscribe({next:(res)=>{
            console.log(res)
                        for (let i of Object.values(res)) {
                            datos.push
                            (
                                [
                                i.codigofactura,
                                i.numerofactura,
                                i.fechaemision,
                                i.nombreclientes || i.nombreproveedores,
                                i.rifclientes || i.rifproveedores,
                                i.tipofactura
                                ]
                            );
                        }
                        // 6. Crear tabla con AutoTable
                        autoTable(doc,{
                          startY: currentY,
                          head: [headers],
                          body: datos,
                          margin: { left: margin, right: margin },
                          styles: { fontSize: 10 },
                          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
                          bodyStyles: { textColor: 50 },
                          alternateRowStyles: { fillColor: 245 },
                          tableLineColor: 200,
                          tableLineWidth: 0.1,
                        });
                        
                        // Guardar PDF
                        doc.save('documento-empresa.pdf'); 
        }})
        
    }

    public printListadoC(tabla:any)
    {       
        let p = this.api.sendconfig()
        const doc = new jspdf();
        const headers:any = this.selectEncabezado(tabla)
        // Configuraciones iniciales
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 10; // Márgen izquierdo
        let currentY = 15; // Posición Y actual
        
        // 1. Agregar logo (ajusta la ruta y dimensiones según tu imagen)
        const logoUrl = '/assets/img/sumelzucalogo.png';
        doc.addImage(logoUrl, 'PNG', margin, 5, 40, 30);
        
        // 2. Nombre de la empresa (centrado)
        doc.setFontSize(16);
        doc.setFont('calibri', 'bold');
        const companyName = p[0]['nombreconfig'];
        const textWidth = doc.getTextWidth(companyName);
        const centerX = (pageWidth - textWidth +20) / 2;
        doc.text(companyName, centerX, currentY);
        currentY += 8; // Ajustar posición Y
        
        // 3. RIF
        doc.setFontSize(12);
        doc.setFont('calibri', 'normal');
        const rif = p[0]['rifconfig'];
        doc.text(rif, centerX+50, currentY);
        currentY += 6;
        
        // 4. Fecha actual
        const today = new Date();
        const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
          (today.getMonth() + 1).toString().padStart(2, '0')}/${
          today.getFullYear()}`;
        doc.text(`${formattedDate}`, centerX+51.5, currentY);
        currentY += 10;
        
        // 5. Línea divisora
        doc.setLineWidth(0.3);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 5;
        const datos: any[] = [];
        this.api.select("clientes","print",{basura:1}).subscribe({next:(res)=>{
            console.log(res)
                        for (let i of Object.values(res)) {
                            datos.push
                            (
                                [
                                i.nombreclientes,
                                i.rifclientes,
                                i.telefonoclientes,
                                i.direccionclientes,
                                i.correoclientes,
                                i.facturas,
                                i.total
                                ]
                            );
                        }
                        // 6. Crear tabla con AutoTable
                        autoTable(doc,{
                          startY: currentY,
                          head: [headers],
                          body: datos,
                          margin: { left: margin, right: margin },
                          styles: { fontSize: 10 },
                          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
                          bodyStyles: { textColor: 50 },
                          alternateRowStyles: { fillColor: 245 },
                          tableLineColor: 200,
                          tableLineWidth: 0.1,
                        });
                        
                        // Guardar PDF
                        doc.save('documento-empresa.pdf'); 
        }})
        
    }

    public printListadoP(tabla:any)
    {       
        let p = this.api.sendconfig()
        const doc = new jspdf();
        const headers:any = this.selectEncabezado(tabla)
        // Configuraciones iniciales
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 10; // Márgen izquierdo
        let currentY = 15; // Posición Y actual
        
        // 1. Agregar logo (ajusta la ruta y dimensiones según tu imagen)
        const logoUrl = '/assets/img/sumelzucalogo.png';
        doc.addImage(logoUrl, 'PNG', margin, 5, 40, 30);
        
        // 2. Nombre de la empresa (centrado)
        doc.setFontSize(16);
        doc.setFont('calibri', 'bold');
        const companyName = p[0]['nombreconfig'];
        const textWidth = doc.getTextWidth(companyName);
        const centerX = (pageWidth - textWidth +20) / 2;
        doc.text(companyName, centerX, currentY);
        currentY += 8; // Ajustar posición Y
        
        // 3. RIF
        doc.setFontSize(12);
        doc.setFont('calibri', 'normal');
        const rif = p[0]['rifconfig'];
        doc.text(rif, centerX+50, currentY);
        currentY += 6;
        
        // 4. Fecha actual
        const today = new Date();
        const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
          (today.getMonth() + 1).toString().padStart(2, '0')}/${
          today.getFullYear()}`;
        doc.text(`${formattedDate}`, centerX+51.5, currentY);
        currentY += 10;
        
        // 5. Línea divisora
        doc.setLineWidth(0.3);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 5;
        const datos: any[] = [];
        this.api.select("proveedores","print",{basura:1}).subscribe({next:(res)=>{
            console.log(res)
                        for (let i of Object.values(res)) {
                            datos.push
                            (
                                [
                                i.nombreproveedores,
                                i.rifproveedores,
                                i.telefonoproveedores,  
                                i.facturas,
                                i.total
                                ]
                            );
                        }
                        // 6. Crear tabla con AutoTable
                        autoTable(doc,{
                          startY: currentY,
                          head: [headers],
                          body: datos,
                          margin: { left: margin, right: margin },
                          styles: { fontSize: 10 },
                          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
                          bodyStyles: { textColor: 50 },
                          alternateRowStyles: { fillColor: 245 },
                          tableLineColor: 200,
                          tableLineWidth: 0.1,
                        });
                        
                        // Guardar PDF
                        doc.save('documento-empresa.pdf'); 
        }})
        
    }

    public printListadoA(tabla:any)
    {       
        let p = this.api.sendconfig()
        const doc = new jspdf();
        const headers:any = this.selectEncabezado(tabla)
        // Configuraciones iniciales
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 10; // Márgen izquierdo
        let currentY = 15; // Posición Y actual
        
        // 1. Agregar logo (ajusta la ruta y dimensiones según tu imagen)
        const logoUrl = '/assets/img/sumelzucalogo.png';
        doc.addImage(logoUrl, 'PNG', margin, 5, 40, 30);
        
        // 2. Nombre de la empresa (centrado)
        doc.setFontSize(16);
        doc.setFont('calibri', 'bold');
        const companyName = p[0]['nombreconfig'];
        const textWidth = doc.getTextWidth(companyName);
        const centerX = (pageWidth - textWidth +20) / 2;
        doc.text(companyName, centerX, currentY);
        currentY += 8; // Ajustar posición Y
        
        // 3. RIF
        doc.setFontSize(12);
        doc.setFont('calibri', 'normal');
        const rif = p[0]['rifconfig'];
        doc.text(rif, centerX+50, currentY);
        currentY += 6;
        
        // 4. Fecha actual
        const today = new Date();
        const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
          (today.getMonth() + 1).toString().padStart(2, '0')}/${
          today.getFullYear()}`;
        doc.text(`${formattedDate}`, centerX+51.5, currentY);
        currentY += 10;
        
        // 5. Línea divisora
        doc.setLineWidth(0.3);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 5;
        const datos: any[] = [];
        this.api.select("articulo","print",{basura:1}).subscribe({next:(res)=>{
            console.log(res)
                        for (let i of Object.values(res)) {
                            datos.push
                            (
                                [
                                i.codigoarticulo,
                                i.descripcionarticulo,
                                i.tipoarticulo,
                                i.nombreproveedores,
                                i.costoarticulo,
                                i.existenciaarticulo,
                                i.compras,
                                i.ventas,
                                ]
                            );
                        }
                        // 6. Crear tabla con AutoTable
                        autoTable(doc,{
                          startY: currentY,
                          head: [headers],
                          body: datos,
                          margin: { left: margin, right: margin },
                          styles: { fontSize: 10 },
                          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
                          bodyStyles: { textColor: 50 },
                          alternateRowStyles: { fillColor: 245 },
                          tableLineColor: 200,
                          tableLineWidth: 0.1,
                        });
                        
                        // Guardar PDF
                        doc.save('documento-empresa.pdf'); 
        }})
        
    }

    public printListadoDetalladoA(tabla:any, metodo:any, params:any, titulo:any, subtitulo:any, busqueda:any, busqueda2:any)
{       
    console.log(params)
    if(params.inicio !== 0 && params.fin !== 0)
        {
           params.inicio = moment(params.inicio , 'DD-MM-YYYY').format('YYYY-MM-DD')
           params.fin = moment(params.fin , 'DD-MM-YYYY').format('YYYY-MM-DD')
            
        }

    let p = this.api.sendconfig()
    const doc = new jspdf();
    // Configuraciones iniciales
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10; // Márgen izquierdo
    let currentY = 15; // Posición Y actual
    
    // 1. Agregar logo
    const logoUrl = '/assets/img/sumelzucalogo.png';
    doc.addImage(logoUrl, 'PNG', margin, 5, 40, 30);
    
    // 2. Nombre de la empresa
    doc.setFontSize(16);
    doc.setFont('calibri', 'bold');
    const companyName = p[0]['nombreconfig'];
    const textWidth = doc.getTextWidth(companyName);
    const centerX = (pageWidth - textWidth +20) / 2;
    doc.text(companyName, centerX, currentY);
    currentY += 8;
    
    // 3. RIF
    doc.setFontSize(12);
    doc.setFont('calibri', 'normal');
    const rif = p[0]['rifconfig'];
    doc.text(rif, centerX+50, currentY);
    currentY += 6;


    doc.setFontSize(16);
    doc.setFont('calibri', 'bold');
    const  tituloReporte = titulo+" por " + subtitulo;
    let ancho = doc.getTextWidth(tituloReporte);
    let centroX = (pageWidth - ancho +20) / 2;
    doc.text(tituloReporte, centroX, currentY);
    currentY += 5;

    doc.setFontSize(12);
    doc.setFont('calibri', 'normal');
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
      (today.getMonth() + 1).toString().padStart(2, '0')}/${
      today.getFullYear()}`;
    doc.text(`${formattedDate}`, centerX+51.5, currentY);
    currentY += 10;

    


    // 5. Línea divisora
    doc.setLineWidth(0.3);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 5;
    

    let datos: any[] = [];
    this.api.select(tabla,metodo,params).subscribe({next:(res)=>{
        if(res == null){console.log("no hay datos"); return}
        const articles = Object.values(res);
        let filtrado:any
        
        
        
        
        let opciones = this.deteminarTabla(articles, metodo,tabla)
        
        
        
        let headers = opciones[0]
        datos = opciones[1]
        
        // 8. Crear tabla con AutoTable
        if(params.filtrado === "fecha")
            {
                filtrado = "Periodo del "+params.inicio+" al "+params.fin
            }
        else if(params.filtrado === "id")
            {
                console.log(busqueda)
                filtrado = articles[0][busqueda]
            }
        else if(params.filtrado !== "id" && params.filtrado !== "fecha")
            {
                console.log(busqueda)
                filtrado = articles[0][busqueda2]
            }
        {

        }

        doc.setFontSize(12);
        doc.setFont('calibri', 'bold');
        let filtro = "Parametro de filtrado: "+filtrado;
        ancho = doc.getTextWidth(filtro);
        centroX = (pageWidth - ancho +20) / 2;
        doc.text(filtro, centroX, currentY+2);
        console.log(currentY)
        currentY += 5;
        autoTable(doc,{
            startY: currentY,
            head: [headers],
            body: datos,
            margin: { left: margin, right: margin },
            styles: { fontSize: 10 },
            headStyles: { 
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold',
                cellPadding: 3
            },
            bodyStyles: { textColor: 50 },
            alternateRowStyles: { fillColor: 245 },
            tableLineColor: 200,
            tableLineWidth: 0.1,
        });
        
        // 9. Guardar PDF
        doc.save('listado-articulos.pdf'); 
    }})
}

    public printListadoU(tabla:any)
    {       
        let p = this.api.sendconfig()
        const doc = new jspdf();
        const headers:any = this.selectEncabezado(tabla)
        // Configuraciones iniciales
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 10; // Márgen izquierdo
        let currentY = 15; // Posición Y actual
        
        // 1. Agregar logo (ajusta la ruta y dimensiones según tu imagen)
        const logoUrl = '/assets/img/sumelzucalogo.png';
        doc.addImage(logoUrl, 'PNG', margin, 5, 40, 30);
        
        // 2. Nombre de la empresa (centrado)
        doc.setFontSize(16);
        doc.setFont('calibri', 'bold');
        const companyName = p[0]['nombreconfig'];
        const textWidth = doc.getTextWidth(companyName);
        const centerX = (pageWidth - textWidth +20) / 2;
        doc.text(companyName, centerX, currentY);
        currentY += 8; // Ajustar posición Y
        
        // 3. RIF
        doc.setFontSize(12);
        doc.setFont('calibri', 'normal');
        const rif = p[0]['rifconfig'];
        doc.text(rif, centerX+50, currentY);
        currentY += 6;
        
        // 4. Fecha actual
        const today = new Date();
        const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
          (today.getMonth() + 1).toString().padStart(2, '0')}/${
          today.getFullYear()}`;
        doc.text(`${formattedDate}`, centerX+51.5, currentY);
        currentY += 10;
        
        // 5. Línea divisora
        doc.setLineWidth(0.3);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 5;
        const datos: any[] = [];
        this.api.select("usuario","print",{basura:1}).subscribe({next:(res)=>{
            console.log(res)
                        for (let i of Object.values(res)) {
                            datos.push
                            (
                                [
                                    i.nombreusuario,
                                    i.cedulausuario,
                                    i.correousuario,
                                    i.telefonousuario,
                                    i.cargopermiso
                                ]
                            );
                        }
                        // 6. Crear tabla con AutoTable
                        autoTable(doc,{
                          startY: currentY,
                          head: [headers],
                          body: datos,
                          margin: { left: margin, right: margin },
                          styles: { fontSize: 10 },
                          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
                          bodyStyles: { textColor: 50 },
                          alternateRowStyles: { fillColor: 245 },
                          tableLineColor: 200,
                          tableLineWidth: 0.1,
                        });
                        
                        // Guardar PDF
                        doc.save('documento-empresa.pdf'); 
        }})
        
    }



}

    


