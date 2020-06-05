import React, {useState, useEffect, useRef} from 'react';
import XLSX from 'xlsx';
import {postData} from '../utils/api';
//import { make_cols } from './MakeColumns';
//import { SheetJSFT } from './types';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import LinearProgress from '@material-ui/core/LinearProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    table: {
        minWidth: 400,
        backgroundColor: theme.palette.common.red
    },
  }));

const CargarExcel = ({indicadores}) => {
    const classes = useStyles();
    const [file, setFile] = useState();
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [erroresEnArchivoExcel, setErroresEnArchivoExcel] = useState([]);
    const [indicadoresErroneos, setIndicadoresErroneos] = useState([]);

    const refContainer = useRef(null);

    const SheetJSFT = [
        "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
    ].map(function(x) { return "." + x; }).join(",");

    const make_cols = (refstr) => {
        var o = [];
        var range = XLSX.utils.decode_range(refstr);
        for(var i = 0; i <= range.e.c; ++i) {
            o.push({name: XLSX.utils.encode_col(i), key:i});
        }
        return o;
    }

    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]){
            setFile(files[0]);
            setName("Archivo seleccionado: " + e.target.value);
            setErroresEnArchivoExcel([]);
            setIndicadoresErroneos([]);
        }
    };

    const handleFile = () => {
        console.time();
        setIsLoading(true);
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            let datos = [];
            let col = [];
            let problemaArchivo = [];
            let indicadorErroneo = [];
            
            for(let i = 0; i < wb.SheetNames.length; i++){

                let nombreHojaExcel = wb.SheetNames[i];
                let ws = wb.Sheets[nombreHojaExcel];
                let datosHojaExcel = XLSX.utils.sheet_to_json(ws);
                let problemaArchivoAux = [];
                
                /* col = make_cols(ws['!ref']); */

                let existeIndicador = indicadores.find(e=> e.value === datosHojaExcel[0].indicadores_idindicadores.toString()  && e.unidad !== "0");
                
                if(existeIndicador === undefined){
                    indicadorErroneo.push({"hoja":nombreHojaExcel, "label":"El indicador no existe o no admite datos", "value":datosHojaExcel[0].indicadores_idindicadores});
                }

                datosHojaExcel.forEach((element,i) => {

                    if(element.valor === undefined){
                        //problemaArchivoAux.push({"hoja":nombreHojaExcel, "label":"valor", "value":i+2});
                        element.valor = "";
                    }
            
                    if(element.periodo === undefined){
                        problemaArchivoAux.push({"hoja":nombreHojaExcel, "label":"periodo", "value":i+2});
                    }
            
                    if(element.indicadores_idindicadores === undefined){
                        problemaArchivoAux.push({"hoja":nombreHojaExcel, "label":"indicadores_idindicadores","value":i+2});
                    }
            
                    if(element.territorios_codigo_dane === undefined){
                        problemaArchivoAux.push({"hoja":nombreHojaExcel, "label":"territorios_codigo_dane", "value":i+2});
                    }

                    if(element.indicadores_idindicadores !== undefined && element.territorios_codigo_dane !== undefined && element.periodo !== undefined){
                        element.id = element.indicadores_idindicadores.toString() + '99' + element.territorios_codigo_dane.toString() + element.periodo.toString();
                    }
                });

                problemaArchivo = problemaArchivo.concat(problemaArchivoAux);
                datos = datos.concat(datosHojaExcel);
            }
            
            if(datos !== undefined && datos != null){

                console.log(datos.length);
                
                console.log(datos);
                console.log(col);
                
                if(problemaArchivo.length===0 && indicadorErroneo.length === 0){
                    postData('/indicaterri/create.php',datos).then((datos) => {
                        setIsLoading(false);
                        setName('El archivo ha sido cargado correctamente.');
                        console.timeEnd();
                    });
                    /* setIsLoading(false);
                    setName('El archivo ha sido cargado correctamente.');
                    setFile(null);
                    console.timeEnd(); */
                }else{
                    setName('El archivo Excel tiene problemas en su estructura.');
                    console.log(problemaArchivo);
                    console.log(indicadorErroneo);
                    setErroresEnArchivoExcel(problemaArchivo);
                    setIndicadoresErroneos(indicadorErroneo);
                    setIsLoading(false);
                    console.timeEnd();
                }
            }else{
                alert("Error en el archivo");
            }
        }

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
        <div style={{padding:'3em', marginTop:'3em'}}>
            <Button
                variant="contained"
                component="label"
                >
                SELECCIONAR ARCHIVO
                <input style={{ display: 'none' }} ref={refContainer} type="file" className="form-control" id="raised-button-file" accept={SheetJSFT} onChange={handleChange} />
            </Button>
            {
                name === '' || name ==='El archivo ha sido cargado correctamente.' || name ==='El archivo Excel tiene problemas en su estructura.' ? null : 
                <Button color="secondary" style={{marginLeft:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained" onClick={handleFile}>CARGAR</Button> 
            }
            <p style={{marginTop:'1em', fontFamily:'roboto'}}>{name}</p>
            <br />
            {
                isLoading &&
                <div className={classes.root}>
                    Cargando Archivo...
                    <LinearProgress color="secondary"/>
                </div>
            }

            {  erroresEnArchivoExcel.length !== 0 &&
                <TableContainer style={{backgroundColor:'#E8E8E8'}} component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead style={{backgroundColor:'LightCoral'}}>
                        <TableRow>
                            <TableCell>Error en hoja de Excel</TableCell>
                            <TableCell align="right">Columna</TableCell>
                            <TableCell align="right">Fila</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {erroresEnArchivoExcel.map((row,i) => (
                            <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                {row.hoja}
                            </TableCell>
                            <TableCell align="right">{row.label}</TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            {
                indicadoresErroneos.length !== 0 &&
                <hr></hr>
            }
            {   
            
                indicadoresErroneos.length !== 0 &&
                <TableContainer style={{backgroundColor:'#E8E8E8'}} component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead style={{backgroundColor:'LightCoral'}}>
                        <TableRow>
                            <TableCell>Hoja de Excel</TableCell>
                            <TableCell align="right">Error</TableCell>
                            <TableCell align="right">Indicador</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {indicadoresErroneos.map((row,i) => (
                            <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                {row.hoja}
                            </TableCell>
                            <TableCell align="right">{row.label}</TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    );
};

export default CargarExcel;