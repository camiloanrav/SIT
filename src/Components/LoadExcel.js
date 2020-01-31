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

    const handleChange = (e) => {
        alert("handleChange");
        const files = e.target.files[0];
        if (files && files[0]){
            setFile({ file: files[0] });
        }
    };
     
    const handleFile = () => {
        alert("handleFile");
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.files;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            setData(XLSX.utils.sheet_to_json(ws));
            setCols(make_cols(ws['!ref']));
            console.log(data, null, 2);
            
        };

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        };
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
            <label htmlFor="file">Upload an excel to Process Triggers</label>
            <br />
            <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleChange} />
            <br />
            <input type='submit' 
                value="Process Triggers"
                onClick={()=>{handleFile()}} />
        </div>
    );
};

export default LoadExcel;