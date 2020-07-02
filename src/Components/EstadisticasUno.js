import React, {useState, useEffect} from 'react';

import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import { defaults } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import {getData} from '../utils/api';

import EqualizerIcon from '@material-ui/icons/Equalizer';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CreateIcon from '@material-ui/icons/Create';

import Excel from "../Components/Excel";
import Login from '../Containers/Login';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
    },
}));

const EstadisticasUno = () => {
    const [indicadores, setIndicadores] = useState([]);
    const [indicadorSeleccionado, setIndicadorSeleccionado] = useState(null);
    const [territorios, setTerritorios] = useState([]);
    const [territorioSeleccionado, setTerritorioSeleccionado] = useState(null);
    const [periodos, setPeriodos] = useState([]);
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);
    const [graficar, setGraficar] = useState(false);
    const [datosGrafica, setDatosGrafica] = useState(null);
    const [botonIndicador, setBotonIndicador] = useState(false);
    const [botonTerritorio, setBotonTerritorio] = useState(false);
    const [botonPeriodo, setBotonPeriodo] = useState(false);

    const [graficaBarras, setGraficaBarras] = useState(true);
    const [graficaLineas, setGraficaLineas] = useState(false);

    const [opcionesPeriodos, setOpcionesPeriodos] = useState([]);

    const [unidad, setUnidad] = useState(null);
    const [fuente, setFuente] = useState(null);

    const[cargando, setCargando] = useState(false);
    const[noGrafica, setNoGrafica] = useState(false);

    const [departamentos, setDepartamentos] = useState([]);
    const [porcentajeDeCarga, setPorcentajeDeCarga] = useState(0);
    const [masDeUnoDepartamento, setMasDeUnoDepartamento] = useState(false);

    const classes = useStyles();

    useEffect(()=>{
        getIndicadores();
    },[]);

    const getUnidad = () => {
        getData('/unidad/search.php?id='+indicadorSeleccionado.value).then(data => {
            setUnidad(data[0].nombre);
        }).catch(error => console.log(error.data));
    }

    const getFuente = () => {
        getData('/fuente/search.php?id='+indicadorSeleccionado.value).then(data => {
            setFuente(data[0].nombre);
        }).catch(error => console.log(error.data));
    }

    const getIndicadores = () => {
        setCargando(true);
        getData('/indicador/all.php').then(data => {
            /* console.log(data); */

            data.sort((a,b) => (a.idindicadores > b.idindicadores) ? 1 : ((b.idindicadores > a.idindicadores) ? -1 : 0));
            let temp = []; 
            for(let i = 0; data.length > i; i++){
                if(data[i].nivel !== "0"){
                    let p = "";
                    p = data.find(padre => padre.idindicadores === data[i].indicadores_idindicadores);
                    if(p !== undefined){
                        data[i].nombre = p.nombre + " => " + data[i].nombre.toLowerCase();
                    }
                }
                if(data[i].unidades_medida_idunidades !== "0"){
                    temp.push({value: data[i].idindicadores , label:data[i].nombre.charAt(0).toUpperCase() + data[i].nombre.slice(1), unidad:data[i].unidades_medida_idunidades, periodicidad:data[i].periodicidad, tipo_valor:data[i].tipo_valor, nivel: data[i].nivel, padre: data[i].indicadores_idindicadores, fuente:data[i].fuentes_idfuentes, categoria:data[i].categorias_idcategorias});
                }
            }
            console.log(temp);
            setIndicadores(temp);
            setCargando(false);
        }).catch(error => console.log(error.data));
    }

    const getTerritorios = () => {
        setCargando(true);
        getData('/indicaterri/search.php?id=' + indicadorSeleccionado.value).then(data => {
            let temp = [];

            let departamentosAux = [];

            let cauca = [{value:'0', label:'TODOS CAUCA', isDisabled: false}];
            let choco = [{value:'1', label:'TODOS CHOCÓ', isDisabled: false}];
            let narino = [{value:'2', label:'TODOS NARIÑO', isDisabled: false}];
            let valle = [{value:'3', label:'TODOS VALLE', isDisabled: false}];

            data.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0)); 

            for(let i = 0; data.length > i; i++){
                temp.push({value: data[i].codigo_dane , label:data[i].nombre});
                if(data[i].codigo_dane.substring(0,2) === "19" && data[i].codigo_dane !== "19000"){
                    cauca.push({value: data[i].codigo_dane , label:data[i].nombre, isDisabled: false});
                }else if(data[i].codigo_dane.substring(0,2) === "27" && data[i].codigo_dane !== "27000"){
                    choco.push({value: data[i].codigo_dane , label:data[i].nombre, isDisabled: false});
                }else if(data[i].codigo_dane.substring(0,2) === "52" && data[i].codigo_dane !== "52000"){
                    narino.push({value: data[i].codigo_dane , label:data[i].nombre, isDisabled: false});
                }else if(data[i].codigo_dane.substring(0,2) === "76" && data[i].codigo_dane !== "76000"){
                    valle.push({value: data[i].codigo_dane , label:data[i].nombre, isDisabled: false});
                }
            }

            departamentosAux.push(
                {
                    label:'Cauca',
                    options: cauca,
                },
                {
                    label:'Choco',
                    options: choco,
                },
                {
                    label:'Nariño',
                    options: narino,
                },
                {
                    label:'Valle del Cauca',
                    options: valle,
                },
            );
            
            cauca.length === 1 || valle.length === 1 || narino.length === 1 || choco.length === 1 ?
            setTerritorios(temp)
            :
            setTerritorios(departamentosAux);

            setDepartamentos(departamentosAux);
            
            setCargando(false);
            /* let temp = []; 
            for(let i = 0; data.length > i; i++){
                temp.push({value: data[i].codigo_dane , label:data[i].nombre});
            }
            setTerritorios(temp);
            setCargando(false); */
        }).catch(error => console.log(error.data));
    }

    const getPeriodos = () => {
        setCargando(true);
        let tempPeriodos = [];

        let auxTerritorio = [...territorioSeleccionado];

        if(departamentos.length > 0){
            let tamanoInicial = departamentos.length;
            let contieneDepartamento = false;
            for (let i = 0; i < auxTerritorio.length; i++) {
                if(auxTerritorio[i].label.substring(0,5) === "TODOS"){
                    contieneDepartamento = true;
                    let departamento = [...departamentos[parseInt(auxTerritorio[i].value)].options];
                    
                    if(parseInt(departamento[0].value) < 5){
                        departamento.shift();
                    }
                    auxTerritorio = auxTerritorio.concat(departamento);
                }
            }
            if(contieneDepartamento){
                auxTerritorio.splice(0,tamanoInicial);
            }
        }
        
        console.log(auxTerritorio);
        var contadorDeCarga = 0;
        for(let i = 0; i < auxTerritorio.length; i++){
            getData('/periodo/search.php?id=' + indicadorSeleccionado.value + "&dane=" + auxTerritorio[i].value).then((data) => {
                //console.log(data);
                
                let aux = [];
                for(let j = 0; data.length > j; j++){
                    aux.push({value: data[j].valor , label: data[j].periodo, municipio: auxTerritorio[i].label});
                }
                tempPeriodos.push(aux);

                contadorDeCarga ++;
                setPorcentajeDeCarga((contadorDeCarga/(auxTerritorio.length/100)).toFixed(1));
                
                if(tempPeriodos.length === auxTerritorio.length){
                    
                    console.log(tempPeriodos);
                    setPeriodos(tempPeriodos);
                    let opcionesPeriodosAux = [];
                    opcionesPeriodosAux.push({value:"0",label:"TODOS", isDisabled: false})
                    for(let i = 0; i < aux.length; i++){
                        opcionesPeriodosAux.push({value:(i+1).toString(),label:aux[i].label, isDisabled: false})
                    }
                    setOpcionesPeriodos(opcionesPeriodosAux);
                    setPorcentajeDeCarga(0);
                    setCargando(false);
                }
            }).catch(error => console.log(error));
        }
    }

    const PintarGrafica = () => {
        console.log(periodos);

        console.log(periodoSeleccionado);
        console.log(periodoSeleccionado[0].label);
        console.log(parseInt( periodoSeleccionado[0].value));
        let aniosAux = [];
        let datasets = [];

        let auxPeriodos = [...periodoSeleccionado];

        if(auxPeriodos[0].label === "TODOS"){
            for(let i = 1; i < opcionesPeriodos.length; i++){
                aniosAux.push(parseInt(opcionesPeriodos[i].label));
            }
        }else{
            auxPeriodos.forEach(element => {
                aniosAux.push(parseInt(element.label));
            });
        }

        console.log(aniosAux);
        aniosAux.sort(function(a, b){return a-b});
        console.log(aniosAux);
        for(let i = 0; i < aniosAux.length; i ++){
            aniosAux[i] = aniosAux[i].toString();
        }

        console.log(aniosAux);

        for(let i = 0; i < periodos.length; i++){
            let valores = [];
            let dataset = null;
            let municipio = periodos[i][0].municipio;
            console.log(municipio);
            for(let j = 0; j < aniosAux.length; j++){
                let valor = null;
                console.log(aniosAux[j]);
                valor = periodos[i].find((valorActual) => {
                    return valorActual.label === aniosAux[j];
                });
                console.log(valor);

                if(isNaN(valor.value.split(",").join("."))){
                    setNoGrafica(true);
                    valores.push(valor.value);
                }else if(masDeUnoDepartamento){
                    setNoGrafica(true);
                    valores.push(parseFloat(valor.value.split(",").join("."))/* .toFixed(3) */);
                }else{
                    valores.push(parseFloat(valor.value.split(",").join("."))/* .toFixed(3) */);
                }
            }
            console.log(valores);
            
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            let rgba = `rgba(${r},${g},${b},1)`;
            let rgbaHover = `rgba(${r},${g},${b},0.8)`;

            dataset = {
                label: municipio,
                backgroundColor: rgba,
                borderColor: rgba,
                fill: false,
                borderWidth: 1,
                hoverBackgroundColor: rgbaHover,
                hoverBorderColor: rgbaHover,
                data: valores
            }
            datasets.push(dataset);
        }

        setDatosGrafica({
            labels: aniosAux,
            datasets: datasets
        });
    }

    return (
        <div>
            <div style={{minHeight:'28em', padding:'1.5em 2.1em 3em 2.1em', textAlign:'left', width:'100%'}}>
                {
                    (!graficar && datosGrafica==null) ?
                    <div style={{backgroundColor:'rgba(255,255,255,1)', padding:'1em 1em 1em 1em', borderRadius:'0.5em', minHeight:'16em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                    Indicadores:
                    <Select options={indicadores} 
                            isSearchable={true}
                            value={indicadorSeleccionado}
                            isDisabled={cargando}
                            onChange={(i)=>{
                                setIndicadorSeleccionado(i); 
                                setBotonIndicador(true); 

                                setTerritorios([]);
                                setTerritorioSeleccionado(null); 
                                setBotonTerritorio(false);

                                setPeriodos([]);
                                setPeriodoSeleccionado(null);
                                setBotonPeriodo(false);

                                setGraficar(false);
                                setDatosGrafica(null);
                            }}
                            name="indicador"
                            placeholder='Seleccionar Indicador...'
                    />
                    {
                        botonIndicador && indicadorSeleccionado!=null &&
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Button onClick={()=>{getTerritorios(); setBotonIndicador(false); getUnidad(); getFuente();}} color="secondary" style={{margin:'1.5em 1em 1em 1em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained">Seleccionar Indicador</Button>  
                        </div>
                    }
                    {
                        territorios.length !== 0 &&
                        <div style={{margin:'0.5em 0 0 0'}}>
                            Territorios:
                            <Select options={territorios} 
                            isSearchable={true}
                            isMulti
                            isDisabled={cargando}
                            value={territorioSeleccionado}
                            onChange={(t)=>{
                                setTerritorioSeleccionado(t);
                                setBotonTerritorio(true);
                                
                                let tAux = [];

                                territorios[0].options[0].isDisabled = false;
                                territorios[1].options[0].isDisabled = false;
                                territorios[2].options[0].isDisabled = false;
                                territorios[3].options[0].isDisabled = false;
                                
                                tAux = t?.filter((element)=>{
                                    return parseInt(element.value) < 5;
                                })
                                
                                if(tAux !== undefined && tAux.length>0){
                                    let auxTerritorios = territorios;
                                    for (let i = 0; i < auxTerritorios.length; i++) {
                                        if(!tAux.some((element)=>{return element.value === i.toString()})){
                                            for(let j = 0; j < auxTerritorios[i].options.length; j++){
                                                auxTerritorios[i].options[j].isDisabled = false;
                                            }
                                        }
                                    }
                                    setTerritorios(auxTerritorios);
                                }

                                if(t === null || t.length=== 0){
                                        let auxTerritorios = territorios;
                                        for(let i = 0; i < auxTerritorios.length; i++){
                                            for(let j = 0; j < auxTerritorios[i].options.length; j++){
                                                auxTerritorios[i].options[j].isDisabled = false;
                                            }
                                        }
                                        setTerritorios(auxTerritorios);
                                }else{
                                    for (let k = 0; k < t.length; k++) {
                                        if(t && t.length > 0 && t[k].label !== undefined && t[k].label.substring(0,5) === "TODOS"){
                                            let auxTerritorios = territorios;
                                            for(let i = 1; i < auxTerritorios[parseInt(t[k].value)].options.length; i++){
                                                auxTerritorios[parseInt(t[k].value)].options[i].isDisabled = true;
                                            }
                                            setTerritorios(auxTerritorios);
                                        }else if(t && t.length > 0 && t[k].label !== undefined && t[k].label.substring(0,5) !== "TODOS"){
                                            let auxTerritorios = territorios;
                                            t.forEach(element => {
                                                if(element.value.substring(0,2) === "19"){
                                                    auxTerritorios[0].options[0].isDisabled = true;
                                                }else if(element.value.substring(0,2) === "27"){
                                                    auxTerritorios[1].options[0].isDisabled = true;
                                                }else if(element.value.substring(0,2) === "52"){
                                                    auxTerritorios[2].options[0].isDisabled = true;
                                                }else if(element.value.substring(0,2) === "76"){
                                                    auxTerritorios[3].options[0].isDisabled = true;
                                                }
                                            });
                                        }
                                    }
                                }

                                if(tAux?.length>1){
                                    setMasDeUnoDepartamento(true);
                                }else{
                                    setMasDeUnoDepartamento(false);
                                }


                                
                                setPeriodos([]);
                                setPeriodoSeleccionado(null);
                                setBotonPeriodo(false);
                                
                                setGraficar(false);
                                setDatosGrafica(null);
                            }}
                            name="indicador"
                            placeholder='Seleccionar Territorios...'
                            />
                        </div>
                        
                    }
                    {
                        botonTerritorio && territorioSeleccionado!= null &&
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Button onClick={()=>{getPeriodos(); setBotonTerritorio(false);}} color="secondary" style={{margin:'1.5em 1em 1em 1em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained">Seleccionar Territorio</Button>  
                        </div>
                    }
                    {
                        periodos.length !== 0 &&
                        <div style={{margin:'0.5em 0 0 0'}}>
                            Periodos:
                            <Select options={opcionesPeriodos} 
                            isSearchable={true}
                            isMulti
                            isDisabled={cargando}
                            value={periodoSeleccionado}
                            onChange={(p)=>{
                                setPeriodoSeleccionado(p);
                                setBotonPeriodo(true);
                                
                                setGraficar(false);
                                setDatosGrafica(null);

                                console.log(opcionesPeriodos);
                                
                                
                                if(p && p.length > 0 && p[0].label !== undefined && p[0].label === "TODOS"){
                                    let aux = opcionesPeriodos;
                                    for(let i = 1; i < aux.length; i++){
                                        aux[i].isDisabled = true;
                                    }
                                    setOpcionesPeriodos(aux);
                                }else if(p && p.length > 0 && p[0].label !== undefined && p[0].label !== "TODOS"){
                                    let aux = opcionesPeriodos;
                                    aux[0].isDisabled = true;
                                    setOpcionesPeriodos(aux);
                                }
                                else if(p==null || p.length === 0){
                                    let aux = opcionesPeriodos;
                                    for(let i = 0; i < aux.length; i++){
                                        aux[i].isDisabled = false;
                                    }
                                    setOpcionesPeriodos(aux);
                                }
                            }}
                            name="indicador"
                            placeholder='Seleccionar Periodos...'
                            />
                        </div>
                    }
                    {
                        /* botonPeriodo && */ periodoSeleccionado!= null  &&
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Button startIcon={<EqualizerIcon />} onClick={()=>{setGraficar(true); /* setBotonPeriodo(false); */ PintarGrafica();}} color="secondary" style={{margin:'1.5em 1em 1em 1em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained">Graficar</Button>  
                        </div>
                    }
                    
                    {
                        cargando &&
                        <div className={classes.root} style={{textAlign:'center'}}>
                            Procesando...
                            {
                                porcentajeDeCarga !== 0 ? " " + porcentajeDeCarga + " %" : null
                                
                            }
                            <LinearProgress color="secondary" />
                        </div>
                    }
                    </div>
                    :
                    
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        style={{width:'100%', margin:'0em 0 1em 0', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}}
                        onClick={()=>{setNoGrafica(false); setGraficar(false); setDatosGrafica(null)}}
                        startIcon={<CreateIcon />}
                    >
                        Editar Datos de la gráfica
                    </Button>
                }
                
                {
                    (datosGrafica != null && graficar!==false && graficaBarras && !noGrafica) &&
                    <div style={{position:'relative', margin:'0em 0 0 0', backgroundColor:'rgba(255,255,255,0.97)', padding:'3em 0.5em 0.5em 0.5em', borderRadius:'0.5em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        <div style={{margin:'0.5em 0.5em 0 0.5em', position:'absolute', top:'0', right:'0'}}>
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<EqualizerIcon />}
                                style={{margin:'0.5em'}}
                                onClick={()=>{setGraficaBarras(true); setGraficaLineas(false);}}
                            >
                                Barras
                            </Button>
                            <Button
                                variant="outlined"
                                color="default"
                                className={classes.button}
                                startIcon={<ShowChartIcon />}
                                style={{margin:'0.5em'}}
                                onClick={()=>{setGraficaBarras(false); setGraficaLineas(true);}}
                            >
                                Lineas
                            </Button>
                        </div>
                        <Bar data={datosGrafica}
                        width={70}
                        height={32}
                        options={{
                            title: {
                                display: true,
                                text: indicadorSeleccionado.label,
                                fontSize: 20
                            },
                            scales: {
                                yAxes: [{                            
                                    ticks: {
                                        beginAtZero: true                        
                                    },
                                    scaleLabel:{
                                        display: true,
                                        labelString: unidad
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel:{
                                        display: true,
                                        labelString: "Años"
                                    }
                                }]
                            },
                            animation: {
                                duration: 1000
                            },
                            
                            tooltips: {
                                callbacks: {
                                    label: function(tooltipItem, data) {
                                        let label = tooltipItem.yLabel;
                                        if(!Number.isInteger(label)){
                                            if(label.toString().split('.')[0].length > 1){
                                                label = label.toFixed(2);
                                            }else{
                                                label = label.toFixed(4);
                                            }
                                        }
                                        label += '';
                                        let x = label.split('.');
                                        let x1 = x[0];
                                        let x2 = x.length > 1 ? '.' + x[1] : '';
                                        let rgx = /(\d+)(\d{3})/;
                                        while (rgx.test(x1)) {
                                            x1 = x1.replace(rgx, '$1' + ',' + '$2');
                                        }
                                        let nombre = data.datasets[tooltipItem.datasetIndex].label
                                        
                                        return nombre + " " + (x1 + x2);
                                    },
                                    title:function(tooltipItem, data){
                                        console.log(data);
                                        console.log(tooltipItem);
                                        return "Año: " + tooltipItem[0].xLabel;
                                    }
                                }
                            }
                        }}   
                        />
                        <div style={{textAlign:'center', fontWeight:'bold', fontSize:'14px', fontFamily:'roboto', margin:'0.5em 1em 0.5em 1em'}}>Fuente: {fuente}</div>
                        <div style={{textAlign:'right'}}>
                            <Excel titulo={indicadorSeleccionado.label} datosExcel={datosGrafica.datasets} aniosExcel={datosGrafica.labels}></Excel>
                        </div>
                    </div>
                }
                {
                    (datosGrafica != null && graficar!==false && graficaLineas && !noGrafica) &&
                    <div style={{position:'relative',margin:'0em 0 0 0', backgroundColor:'rgba(255,255,255,0.97)', padding:'3em 0.5em 0.5em 0.5em', borderRadius:'0.5em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        
                        <div style={{margin:'0.5em 0.5em 0 0.5em', position:'absolute', top:'0', right:'0'}}>
                            <Button
                                variant="outlined"
                                color="default"
                                className={classes.button}
                                startIcon={<EqualizerIcon />}
                                style={{margin:'0.5em'}}
                                onClick={()=>{setGraficaBarras(true); setGraficaLineas(false);}}
                            >
                                Barras
                            </Button>
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<ShowChartIcon />}
                                style={{margin:'0.5em'}}
                                onClick={()=>{setGraficaBarras(false); setGraficaLineas(true);}}
                            >
                                Lineas
                            </Button>
                        </div>

                        <Line data={datosGrafica}
                        width={70}
                        height={32}
                        options={{
                            title: {
                                display: true,
                                text: indicadorSeleccionado.label,
                                fontSize: 20
                            },
                            scales: {
                                yAxes: [{                            
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    scaleLabel:{
                                        display: true,
                                        labelString: unidad
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel:{
                                        display: true,
                                        labelString: "Años"
                                    }
                                }]
                            },
                            animation: {
                                duration: 1000
                            },
                            tooltips: {
                                callbacks: {
                                    label: function(tooltipItem, data) {
                                        let label = tooltipItem.yLabel;
                                        if(!Number.isInteger(label)){
                                            if(label.toString().split('.')[0].length > 1){
                                                label = label.toFixed(2);
                                            }else{
                                                label = label.toFixed(4);
                                            }
                                        }
                                        label += '';
                                        let x = label.split('.');
                                        let x1 = x[0];
                                        let x2 = x.length > 1 ? '.' + x[1] : '';
                                        let rgx = /(\d+)(\d{3})/;
                                        while (rgx.test(x1)) {
                                            x1 = x1.replace(rgx, '$1' + ',' + '$2');
                                        }
                                        let nombre = data.datasets[tooltipItem.datasetIndex].label
                                        
                                        return nombre + " " + (x1 + x2);
                                    },
                                    title:function(tooltipItem, data){
                                        console.log(data);
                                        console.log(tooltipItem);
                                        return "Año: " + tooltipItem[0].xLabel;
                                    }
                                }
                            }
                        }}   
                        />
                        <div style={{textAlign:'center', fontWeight:'bold', fontSize:'14px', fontFamily:'roboto', margin:'0.5em 1em 0.5em 1em'}}>Fuente: {fuente}</div>
                        <div style={{textAlign:'right'}}>
                            <Excel titulo={indicadorSeleccionado.label} datosExcel={datosGrafica.datasets} aniosExcel={datosGrafica.labels}></Excel>
                        </div>
                    </div>
                }
                {
                    noGrafica &&
                    <div style={{textAlign:'center', margin:'5em 0 0 0'}}>
                        {masDeUnoDepartamento?
                        <h3 style={{margin:'0 0 0.5em 0'}}>Para la consulta de los datos totales de más de un departamento, solo se dispone del Excel. </h3>
                        :
                        <h3 style={{margin:'0 0 0.5em 0'}}>Estos datos son de caracter cualitativo y no se pueden graficar.</h3>
                        }
                        <Excel titulo={indicadorSeleccionado.label} style={{textAlign:'center'}} datosExcel={datosGrafica.datasets} aniosExcel={datosGrafica.labels}></Excel>
                    </div>
                }
            </div>
        </div>
    );
};

export default EstadisticasUno;