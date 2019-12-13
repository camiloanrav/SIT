import React, {Component, useState, useEffect} from 'react';
import XLSX from 'xlsx';

const Excel = props => {
    
    const [datos, setDatos] = useState(props.datos);

    return (
        <div>
            <div >
                <button style={{margin:'0.5em', backgroundColor:'lightblue'}} onClick={()=>ConvertJSON(datos)}>Exportar PDF</button>
            </div>
            {/*<button onClick={Convert(values)}>Excel</button>*/}
            
        </div>
    );
};

function ConvertJSON(datos) {
    var new_workbook = XLSX.utils.book_new();
    console.log(datos);
    var data = [];
    var data2 = [];
    console.log(datos[0].label);
    
    // var data = [
    //     {S:"Municipio",h:"Valor",t:"Periodo"},
    //     {S:"Cali",h:200,t:2012},
    //     {S:"Popayan",h:30000000,t:2012}
    // ];

    for(let i = 0; i < datos.length; i++){
        let json = {};
        json.S = datos[i].label;
        json.h = datos[i].data[0];
        json.t = 2014; 
        console.log(json);
        data.push(json);   
    }
    console.log(data);
    var nombreArchivo = "reporte";
    var wb = XLSX.utils.json_to_sheet(data, {skipHeader: true});

    XLSX.utils.book_append_sheet(new_workbook, wb);

    XLSX.writeFile(new_workbook, nombreArchivo+".xlsx", {bookType:'xlsx', type:'array'});
}

function ConvertArray() {
    var new_workbook = XLSX.utils.book_new();

    var data = {
        cols: [{ name: "A", key: 0 }, { name: "B", key: 1 }, { name: "C", key: 2 }],
        data: [
          [ "id",    "name", "value" ],
          [    1, "sheetjs",    7262 ],
          [    2, "js-xlsx",    6969 ]
        ]
    }
    console.log("0");
    var wb = XLSX.utils.aoa_to_sheet(data);
    console.log("1");

    XLSX.utils.book_append_sheet(new_workbook, wb, "SheetJS");

    XLSX.writeFile(new_workbook, "sheetjss.xlsx", {bookType:'xlsx', type:'array'});
    
}

export default Excel;
