import React, {Component, useState} from 'react';
import XLSX from 'xlsx';

const Excel = props => {
    
    const [datos, setDatos] = useState(props.datos);
    const [years, setYears] = useState(props.years);

    return (
        <div>
            <div > 
                <button className="button-card-uao" style={{margin:'0.5em', marginTop:'5em' ,backgroundColor:'lightblue'}} onClick={()=>ConvertJSON(datos, years)}> Generar Excel </button>
            </div>
        </div>
    );
};

function ConvertJSON(datos, years) {
    var new_workbook = XLSX.utils.book_new();
    var data = [];
    console.log("Datos enviados al excel: ");
    console.log(datos);
    console.log(years);

    /* for(let i = 0; i < datos.length; i++){
        let json = {};
        json.S = datos[i].label;
        json.h = datos[i].data[0];
        json.t = 2014;
        data.push(json);   
    } */

    for(let i = 0; i < (years.length + 1); i++){
        let json = {};
        if(i == 0){
            json.S = "Años vs Municipios";
            /*for(let j = 0; j < datos.length; j++){
                json.j = datos[j].label;
            }*/
            json.h = datos[i].label;
            json.t = datos[1].label;
            json.u = datos[2].label;        
            data.push(json); 
        }else{
            json.S = years[i-1];
            /* for(let k = 0; k < datos.length; k++){               
                json.k = datos[k].data[i-1];
            }  */       
            json.h = datos[0].data[i-1];
            json.t = datos[1].data[i-1];
            json.u = datos[2].data[i-1];         
            data.push(json); 
        }
    }

    console.log(data);

    var nombreArchivo = "ReporteSERPacifico";
    var wb = XLSX.utils.json_to_sheet(data, {skipHeader: true});

    XLSX.utils.book_append_sheet(new_workbook, wb);

    XLSX.writeFile(new_workbook, nombreArchivo+".xlsx", {bookType:'xlsx', type:'array'});
}

export default Excel;
