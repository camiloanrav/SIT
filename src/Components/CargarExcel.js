import React, {useState, useEffect, useRef} from 'react';
import XLSX from 'xlsx';
import {postData} from '../utils/api';
//import { make_cols } from './MakeColumns';
//import { SheetJSFT } from './types';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const CargarExcel = () => {
    const classes = useStyles();
    const [excel, setExcel] = useState();
    const [data, setData] = useState();
    const [file, setFile] = useState();
    const [cols, setCols] = useState();
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [time, setTime] = useState(new Date());
    const [timeAux, setAuxTime] = useState();
    const refContainer = useRef(null);

    const SheetJSFT = [
        "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
    ].map(function(x) { return "." + x; }).join(",");

    /* const make_cols =(refstr) => {
        var o = [];
        var range = XLSX.utils.decode_range(refstr);
        for(var i = 0; i <= range.e.c; ++i) {
            o.push({name: XLSX.utils.encode_col(i), key:i});
        }
        return o;
    } */

    function handleChange(e){
        const files = e.target.files;
        if (files && files[0]){
            setFile(files[0]);
            setName("Archivo seleccionado: " + e.target.value);
        }
    };
     
    /* function handleFile () {
        alert("handleFile");
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            let total = [];
            for(let i = 0; i < wb.SheetNames.length; i++){
                total.push(wb.SheetNames[i]);
            }
            console.log(total);
            const wsname = wb.SheetNames[1];
            const ws = wb.Sheets[wsname];
            const json = XLSX.utils.sheet_to_json(ws);
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
    } */

    function handleFile2 () {
        console.time();
        setIsLoading(true);
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            let json = [];

            for(let i = 1; i < wb.SheetNames.length; i++){
                let wsname = wb.SheetNames[i];
                let ws = wb.Sheets[wsname];
                let x = XLSX.utils.sheet_to_json(ws);
                json = json.concat(x);
            }
            
            
            if(json !== undefined && json != null){
                setData(json);
                console.log(json.length);
            }

            for(let i = 0; i < json.length; i ++){
                json[i].id = json[i].indicadores_idindicadores.toString() + '99' + json[i].territorios_codigo_dane.toString() + json[i].periodo.toString();
            }
            /* console.log( JSON.stringify(data));
            console.log(cols); */
            
            postData('/indicaterri/create.php',json).then((json) => {
                setIsLoading(false);
                setName('El archivo ha sido cargado correctamente.');
                console.timeEnd();
            });
        }

        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        };
    }

    function Show(){
        for(let i = 0; i < data.length; i ++){
            data[i].id = data[i].indicadores_idindicadores.toString() + '99' + data[i].territorios_codigo_dane.toString() + data[i].periodo.toString();
        }
        
        postData('/indicaterri/create.php',data).then((data) => {
            console.log(new Date() + '.' + new Date().getMilliseconds());
        });
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
        <div style={{padding:'3em', marginTop:'3em'}}>
            <Button
                variant="contained"
                component="label"
                >
                SELECCIONAR ARCHIVO
                <input style={{ display: 'none' }} ref={refContainer} type="file" className="form-control" id="raised-button-file" accept={SheetJSFT} onChange={handleChange} />
            </Button>
            {
                name === '' || name ==='El archivo ha sido cargado correctamente.' ? null : 
                <Button color="secondary" style={{marginLeft:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained" onClick={handleFile2}>CARGAR</Button> 
            }
            <p style={{marginTop:'1em', fontFamily:'roboto'}}>{name}</p>
            <br />
            {
                !isLoading ? null : 
                <div className={classes.root}>
                    Cargando Archivo...
                    <LinearProgress color="secondary"/>
                </div>
            }
        </div>
    );
};

export default CargarExcel;