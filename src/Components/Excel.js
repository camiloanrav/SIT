import React from 'react';
import XLSX from 'xlsx';

const Excel = ({datosExcel,aniosExcel}) => {

    const ConvertJSON = () => {
        var new_workbook = XLSX.utils.book_new();
        new_workbook.SheetNames.push("Reporte SER");
        new_workbook.Props = {
            Title: "Reporte SER Pacífico",
            Subject: "Reporte",
            Author: "SER Pacífico"
        }

        let datosAux = [...datosExcel];
        let aniosAux = [...aniosExcel];
    
        let informacionExcel = [];
        
        for(let i = 0; i < datosAux.length; i++){
            let json = [];
            json.Municipio = datosAux[i].label;
            for(let j = 0; j < aniosAux.length; j++){
                json["Año_"+ aniosAux[j]] = datosAux[i].data[j];
            }
            informacionExcel.push(json);
        }

        var nombreArchivo = "Reporte SER Pacífico";
        let headers = aniosAux;

        for (let i = 0; i < headers.length; i++) {
            headers[i] = "Año_"+headers[i];
        }

        headers.unshift("Municipio");
        
        console.log(datosExcel);
        console.log(aniosExcel);
        console.log("---");
        console.log(aniosAux);
        console.log(aniosAux);
        

        var wb = XLSX.utils.json_to_sheet(informacionExcel, {skipHeader: false, header:headers});
        
        new_workbook.Sheets["Reporte SER"] = wb;
    
        XLSX.writeFile(new_workbook, nombreArchivo+".xlsx", {bookType:'xlsx', type:'array'});
    }

    return (
        <div>
            <div > 
                <button className="button-card-uao" style={{margin:'0.5em', marginTop:'1em' ,backgroundColor:'lightblue'}} onClick={()=>ConvertJSON()}> Generar Excel </button>
            </div>
        </div>
    );
};

export default Excel;
