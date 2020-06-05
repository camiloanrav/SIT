import React from 'react';
import XLSX from 'xlsx';

const Excel = ({datos,years}) => {

    const ConvertJSON = () => {
        var new_workbook = XLSX.utils.book_new();
        new_workbook.SheetNames.push("Reporte SER");
        new_workbook.Props = {
            Title: "Reporte SER Pacífico",
            Subject: "Reporte",
            Author: "SER Pacífico"
        }
    
        let datosExcel = [];
        
        for(let i = 0; i < datos.length; i++){
            let json = [];
            json.Municipio = datos[i].label;
            for(let j = 0; j < years.length; j++){
                json["Año_"+ years[j]] = datos[i].data[j];
            }
            datosExcel.push(json);
        }

        var nombreArchivo = "Reporte SER Pacífico";
        let headers = years;

        for (let i = 0; i < headers.length; i++) {
            headers[i] = "Año_"+headers[i];
        }

        headers.unshift("Municipio");
        

        var wb = XLSX.utils.json_to_sheet(datosExcel, {skipHeader: false, header:headers});
        
        new_workbook.Sheets["Reporte SER"] = wb;
    
        XLSX.writeFile(new_workbook, nombreArchivo+".xlsx", {bookType:'xlsx', type:'array'});
    }

    return (
        <div>
            <div > 
                <button className="button-card-uao" style={{margin:'0.5em', marginTop:'5em' ,backgroundColor:'lightblue'}} onClick={()=>ConvertJSON()}> Generar Excel </button>
            </div>
        </div>
    );
};

export default Excel;
