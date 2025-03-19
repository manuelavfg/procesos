import { inject, Injectable } from '@angular/core';
import { APIService } from './api.service';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class ReporteService {

    api = inject(APIService)

    public printFactura()
    {
            let p = this.api.sendconfig()
            const doc = new jspdf('p', 'mm', 'a4');
            doc.setFont("Calibri");
            console.log(p)
            const empresa = { 
                nombre: p[0]['nombreconfig'],
                rif: p[0]['rifconfig'],
                direccion: p[0]['dirconfig'],
                telefono: "(+58) "+p[0]['telefonoconfig'],
                email: p[0]['correoconfig'],
                logo: '/assets/img/sumelzucalogo.png' // URL del logo
            };

            // Información de la empresa (fija)
    
            const cliente= 
            {
    
                nombre:"ALCALDIA DE MARACAIBO",
                rif:"G-20006056",
                direccion:"AV.4 CON CALLE 96, EDIFICIO ALCALDIA DE MARACAIBO, PRIMER PISO. MARACAIBO,ZULIA",
                telefono:"04126726734"
            }
    
            const factura = 
            {
                numeroControl: '001',
                fechaEmision: "02/02/2025",
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
                doc.text("FACTURA PROFORMA", 192, yPosition+incremento*2.5, { align: "right" });
                
                doc.setFontSize(10);
                doc.text(`PROFORMA: ${factura.numeroControl}`, 190, yPosition, { align: "right" });
                doc.text(`FECHA: ${factura.fechaEmision}`, 190, yPosition+incremento, { align: "right" });
        
                // 4. INFORMACIÓN DEL CLIENTE (DEBAJO DEL ENCABEZADO)
                let startY = 50; // Posición debajo del rectángulo
                
                
                doc.setFontSize(10);
                doc.text(`CLIENTE: ${cliente.nombre}`, 12, startY+5, { maxWidth: 115});
                doc.text(`RIF: ${cliente.rif}`, 12, startY + 13);
                doc.text(`DIRECCIÓN: ${cliente.direccion}`, 12, startY + 18,{ maxWidth: 115});
                doc.text(`TELÉFONO: ${cliente.telefono}`, 12, startY + 28);
        
                // 5. TABLA DE PRODUCTOS
                const columns = ["DESCRIPCIÓN", "UNIDAD", "CANT.", "PRECIO UNIT.", "TOTAL"];
                let subtotal: any
    
                let datos: any[] = [];
                let p ={idfactura:7}
                this.api.select("recibo", "list", p).subscribe({
                    next: (value) => {
                        console.log(value)
                        for (let i of Object.values(value)) {
                            datos.push
                            (
                                [i.descripcionarticulo,
                                i.tipoarticulo,
                                i.cantidadrecibo,
                                "$"+i.preciorecibo,
                               "$"+(i.cantidadrecibo * i.preciorecibo)
                                ]
                            );
                            console.log(datos)
                            subtotal = i.cantidadrecibo * i.preciorecibo;
                        }
    
                        const iva = subtotal * 0.16;
                        const totalExento = subtotal
                        const totalGeneral = subtotal + iva;
                
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
                doc.text(`IVA 16%`, totalesX, ivaY, { align: "left" });
                doc.text(`$${iva.toFixed(2)}`, totalesX+incrementoX, ivaY, { align: "right" });
                doc.text(`TOTAL FACTURA`,  totalesX, totalFacturaY, { align: "left",});
                doc.text(`$${totalGeneral.toFixed(2)}`, totalesX+incrementoX, totalFacturaY, { align: "right",});
        
                // Guardar PDF
                doc.save(`factura_${factura.numeroControl}.pdf`);
            }
        });
            });
    }
    

}
