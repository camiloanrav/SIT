import React, {Component, useState} from 'react';
import XLSX from 'xlsx';

const Excel = props => {
    
    const [datos, setDatos] = useState(props.datos);

    return (
        <div>
            <div >
                <button style={{margin:'0.5em', backgroundColor:'lightblue'}} onClick={()=>ConvertJSON(datos)}>Generar Excel</button>
            </div>
        </div>
    );
};

function ConvertJSON(datos) {
    var new_workbook = XLSX.utils.book_new();
    var data = [];

    for(let i = 0; i < datos.length; i++){
        let json = {};
        json.S = datos[i].label;
        json.h = datos[i].data[0];
        json.t = 2014;
        data.push(json);   
    }

    var nombreArchivo = "reporte";
    var wb = XLSX.utils.json_to_sheet(data, {skipHeader: true});

    XLSX.utils.book_append_sheet(new_workbook, wb);

    XLSX.writeFile(new_workbook, nombreArchivo+".xlsx", {bookType:'xlsx', type:'array'});
}

export default Excel;
