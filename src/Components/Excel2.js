import React, {useEffect, useState} from 'react';
import XLSX from 'xlsx';
import {getData} from '../utils/api';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(5),
    },
  }));

const Excel = () => {

    const [indicadores,setIndicadores] = useState([]);
    const classes = useStyles();

    useEffect(()=>{
        getData('/indicador/all.php').then(data => {
            data.sort((a,b) => (a.idindicadores > b.idindicadores) ? 1 : ((b.idindicadores > a.idindicadores) ? -1 : 0));
            setIndicadores(data);
        }).catch(error => console.log(error.data));
    },[]);

    const ConvertJSON = () => {
        var new_workbook = XLSX.utils.book_new();
        new_workbook.SheetNames.push("Indicadores");
        new_workbook.Props = {
            Title: "Indicadores SER Pacífico",
            Subject: "Indicadores",
            Author: "SER Pacífico"
        }

        var data = [];
    
        for(let i = 0; i < indicadores.length; i++){
            let json = {};
            json.idindicadores = indicadores[i].idindicadores;
            json.nombre = indicadores[i].nombre;
            json.categorias_idcategorias = indicadores[i].categorias_idcategorias;
            json.indicadores_idindicadores = indicadores[i].indicadores_idindicadores;
            json.nivel = indicadores[i].nivel;
            json.periodicidad = indicadores[i].periodicidad;
            json.tipo_valor = indicadores[i].tipo_valor;
            json.unidades_medida_idunidades = indicadores[i].unidades_medida_idunidades;
            json.fuentes_idfuentes = indicadores[i].fuentes_idfuentes;
            data.push(json);   
        }
    
        var nombreArchivo = "Indicadores SER Pacífico";

        var wb = XLSX.utils.json_to_sheet(data, {skipHeader: false, header: ["idindicadores","nombre","categorias_idcategorias","indicadores_idindicadores","nivel","periodicidad","tipo_valor","unidades_medida_idunidades","fuentes_idfuentes"]});
        
        new_workbook.Sheets["Indicadores"] = wb;
        
    
        XLSX.writeFile(new_workbook, nombreArchivo+".xlsx", {bookType:'xlsx', type:'array'});
    }
    
    return (
        <div>
            
            <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                endIcon={<SaveIcon />}
                onClick={()=>ConvertJSON()}
            >
                Descargar
            </Button>
        </div>
    );
};



export default Excel;


/* import React, {Component, useState} from 'react';
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

export default Excel; */
