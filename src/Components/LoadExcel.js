import React, {useState, useEffect} from 'react';
import XLSX from 'xlsx';
//import { make_cols } from './MakeColumns';
//import { SheetJSFT } from './types';

const LoadExcel = () => {
    const [excel, setExcel] = useState();
    const [data, setData] = useState();
    const [file, setFile] = useState();
    const [cols, setCols] = useState();

    const SheetJSFT = [
        "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
    ].map(function(x) { return "." + x; }).join(",");

    const make_cols =(refstr/*:string*/) => {
        var o = [];
        var range = XLSX.utils.decode_range(refstr);
        for(var i = 0; i <= range.e.c; ++i) {
            o.push({name: XLSX.utils.encode_col(i), key:i});
        }
        return o;
    }

    function handleChange(e){
        const files = e.target.files;
        if (files && files[0]){
            setFile(files[0]);
        }
    };
     
    function handleFile () {
        alert("handleFile");
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            let total = [];
            for(let i = 0; i < wb.SheetNames.length; i++){
                total.push(wb.SheetNames[i]);
            }
            console.log(total);
            /* Get first worksheet */
            const wsname = wb.SheetNames[1];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const json = XLSX.utils.sheet_to_json(ws);
            //setCols(make_cols(ws['!ref']));
            setData(json);
            if(json !== undefined && json != null){
                alert("Archivo cargado exitosamente");
            }
        }

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        };
    }

    function handleFile2 () {
        alert("handleFile2");
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            let total = [];
            let json = [];
            for(let i = 1; i < wb.SheetNames.length; i++){
                let wsname = wb.SheetNames[i];
                let ws = wb.Sheets[wsname];
                json.push(XLSX.utils.sheet_to_json(ws));
            }

            console.log(total);
            console.log(json);
            
            setData(json);
            if(json !== undefined && json != null){
                alert("Archivo cargado exitosamente");
            }
        }

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        };
    }

    function Show(){
        console.log(data);
        console.log(cols);
    }

   /*  function UpdateInputExcel(evt) {
        setExcel(evt.target.value);
    }

    function ConvertExcel(data) {
        setExcel(data);
        var first_worksheet = excel.Sheets[excel.SheetNames[0]];
        setData(XLSX.utils.sheet_to_json(first_worksheet, {header:1}));
    } */

    return (
        <div>
            <label htmlFor="file">Cargar Excel</label>
            <br />
            <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleChange} />
            <br />
            <input type='submit' 
                value="Excel"
                onClick={()=>{handleFile()}} />
            <button onClick={Show}>Mostrar</button>
        </div>
    );
};

export default LoadExcel;