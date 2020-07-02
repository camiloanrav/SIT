import React, {useState, useEffect} from 'react';

import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Select from "react-select";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import {getData} from '../utils/api';
import {getData2} from '../utils/api';

import EqualizerIcon from '@material-ui/icons/Equalizer';
import ShowChartIcon from '@material-ui/icons/ShowChart';

import Excel from "../Components/Excel";

import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
    },
}));

const EstadisticasTres = () => {
    //const [indicadores, setIndicadores] = useState([]);
    const [indicadoresN0, setIndicadoresN0] = useState([]);
    const [indicadorN0Seleccionado, setIndicadorN0Seleccionado] = useState(null);
    const [indicadoresN1, setIndicadoresN1] = useState([]);
    const [indicadorN1Seleccionado, setIndicadorN1Seleccionado] = useState(null);
    const [indicadoresN2, setIndicadoresN2] = useState([]);
    const [indicadorN2Seleccionado, setIndicadorN2Seleccionado] = useState(null);
    const [indicadoresN3, setIndicadoresN3] = useState([]);
    const [indicadorN3Seleccionado, setIndicadorN3Seleccionado] = useState(null);
    const [indicadoresN4, setIndicadoresN4] = useState([]);
    const [indicadorN4Seleccionado, setIndicadorN4Seleccionado] = useState(null);

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

    const [dimensiones, setDimensiones] = useState([]);
    const [dimensionSeleccionada, setDimensionSeleccionada] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [subcategorias, setSubcategorias] = useState([]);
    const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(null);

    const [graficaBarras, setGraficaBarras] = useState(true);
    const [graficaLineas, setGraficaLineas] = useState(false);

    const [opcionesPeriodos, setOpcionesPeriodos] = useState([]);

    const [unidad, setUnidad] = useState(null);
    const [fuente, setFuente] = useState(null);

    const[cargando, setCargando] = useState(false);
    const[noGrafica, setNoGrafica] = useState(false);

    const [location] = useState(useLocation());

    const classes = useStyles();

    useEffect(()=>{
        getIndicadores();
        getDimensiones();
        getCategorias();
    },[]);

    useEffect(()=>{
        setCategoriaSeleccionada(null);
        ReiniciarEstados();
    },[dimensionSeleccionada]);

    useEffect(()=>{
        setSubcategoriaSeleccionada(null);
        ReiniciarEstados();
    },[categoriaSeleccionada]);

    useEffect(()=>{
        setIndicadorN0Seleccionado(null);
        ReiniciarEstados();
    },[subcategoriaSeleccionada]);

    useEffect(()=>{
        setIndicadorN1Seleccionado(null);
        ReiniciarEstados();
        
        if(indicadorN0Seleccionado && indicadorN0Seleccionado.unidad !=="0"){
            setIndicadorSeleccionado(indicadorN0Seleccionado);
            setBotonIndicador(true);
        }else{
            setBotonIndicador(false);
        }
    },[indicadorN0Seleccionado]);

    useEffect(()=>{
        setIndicadorN2Seleccionado(null);
        ReiniciarEstados();

        if(indicadorN1Seleccionado && indicadorN1Seleccionado.unidad !=="0"){
            setIndicadorSeleccionado(indicadorN1Seleccionado);
            setBotonIndicador(true);
        }else{
            setBotonIndicador(false);
        }
    },[indicadorN1Seleccionado]);

    useEffect(()=>{
        setIndicadorN3Seleccionado(null);
        ReiniciarEstados();

        if(indicadorN2Seleccionado && indicadorN2Seleccionado.unidad !=="0"){
            setIndicadorSeleccionado(indicadorN2Seleccionado);
            setBotonIndicador(true);
        }else{
            setBotonIndicador(false);
        }
    },[indicadorN2Seleccionado]);

    useEffect(()=>{
        setIndicadorN4Seleccionado(null);
        ReiniciarEstados();

        if(indicadorN3Seleccionado && indicadorN3Seleccionado.unidad !=="0"){
            setIndicadorSeleccionado(indicadorN3Seleccionado);
            setBotonIndicador(true);
        }else{
            setBotonIndicador(false);
        }
    },[indicadorN3Seleccionado]);

    useEffect(()=>{
        
        ReiniciarEstados();

        if(indicadorN4Seleccionado && indicadorN4Seleccionado.unidad !=="0"){
            setIndicadorSeleccionado(indicadorN4Seleccionado);
            setBotonIndicador(true);
        }else{
            setBotonIndicador(false);
        }
    },[indicadorN4Seleccionado]);

    const ReiniciarEstados = () => {
        setTerritorios([]);
        setTerritorioSeleccionado(null); 
        setBotonTerritorio(false);

        setPeriodos([]);
        setPeriodoSeleccionado(null);
        setBotonPeriodo(false);

        setGraficar(false);
        setDatosGrafica(null);
    }

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

    const getDimensiones = () => {
        getData('/dimension/all.php').then(data => {
            let temp = [];
            for(let i = 0; data.length > i; i++){
                temp.push({value: data[i].iddimensiones , label:data[i].nombre });
            }
            setDimensiones(temp);
            if(location.pathname[location.pathname.length-1] === "0"){
                setDimensionSeleccionada(temp[0]);
            }else if(location.pathname[location.pathname.length-1] === "1"){
                setDimensionSeleccionada(temp[1]);
            }else if(location.pathname[location.pathname.length-1] === "2"){
                setDimensionSeleccionada(temp[2]);
            }else if(location.pathname[location.pathname.length-1] === "3"){
                setDimensionSeleccionada(temp[3]);
            }
        }).catch(error => console.log(error.data));
    }

    const getCategorias = () => {
        getData('/categoria/all.php').then(data => {
            let tempCategorias = [];
            let tempSubcategorias = [];
            for(let i = 0; data.length > i; i++){
                if(data[i].subcategoria === "NO"){
                    tempCategorias.push({value: data[i].idcategorias , label:data[i].nombre });
                }else{
                    tempSubcategorias.push({value: data[i].idcategorias , label:data[i].nombre });
                }
            }
            setCategorias(tempCategorias);
            setSubcategorias(tempSubcategorias);
        }).catch(error => console.log(error.data));
    }

    const getIndicadores = () => {
        setCargando(true);
        getData('/indicador/all.php').then(data => {
            console.log(data);

            data.sort((a,b) => (a.idindicadores > b.idindicadores) ? 1 : ((b.idindicadores > a.idindicadores) ? -1 : 0));
            let tempN0 = []; 
            let tempN1 = []; 
            let tempN2 = []; 
            let tempN3 = []; 
            let tempN4 = [];
            
            

            for(let i = 0; data.length > i; i++){
                if(data[i].nivel === "0"){
                    tempN0.push({value: data[i].idindicadores , label:data[i].nombre.charAt(0).toUpperCase() + data[i].nombre.slice(1), unidad:data[i].unidades_medida_idunidades, periodicidad:data[i].periodicidad, tipo_valor:data[i].tipo_valor, nivel: data[i].nivel, padre: data[i].indicadores_idindicadores, fuente:data[i].fuentes_idfuentes, categoria:data[i].categorias_idcategorias});
                }else if(data[i].nivel === "1"){
                    tempN1.push({value: data[i].idindicadores , label:data[i].nombre.charAt(0).toUpperCase() + data[i].nombre.slice(1), unidad:data[i].unidades_medida_idunidades, periodicidad:data[i].periodicidad, tipo_valor:data[i].tipo_valor, nivel: data[i].nivel, padre: data[i].indicadores_idindicadores, fuente:data[i].fuentes_idfuentes, categoria:data[i].categorias_idcategorias});
                }else if(data[i].nivel === "2"){
                    tempN2.push({value: data[i].idindicadores , label:data[i].nombre.charAt(0).toUpperCase() + data[i].nombre.slice(1), unidad:data[i].unidades_medida_idunidades, periodicidad:data[i].periodicidad, tipo_valor:data[i].tipo_valor, nivel: data[i].nivel, padre: data[i].indicadores_idindicadores, fuente:data[i].fuentes_idfuentes, categoria:data[i].categorias_idcategorias});
                }else if(data[i].nivel === "3"){
                    tempN3.push({value: data[i].idindicadores , label:data[i].nombre.charAt(0).toUpperCase() + data[i].nombre.slice(1), unidad:data[i].unidades_medida_idunidades, periodicidad:data[i].periodicidad, tipo_valor:data[i].tipo_valor, nivel: data[i].nivel, padre: data[i].indicadores_idindicadores, fuente:data[i].fuentes_idfuentes, categoria:data[i].categorias_idcategorias});
                }else if(data[i].nivel === "4"){
                    tempN4.push({value: data[i].idindicadores , label:data[i].nombre.charAt(0).toUpperCase() + data[i].nombre.slice(1), unidad:data[i].unidades_medida_idunidades, periodicidad:data[i].periodicidad, tipo_valor:data[i].tipo_valor, nivel: data[i].nivel, padre: data[i].indicadores_idindicadores, fuente:data[i].fuentes_idfuentes, categoria:data[i].categorias_idcategorias});
                }
            }

            setIndicadoresN0(tempN0);
            setIndicadoresN1(tempN1);
            setIndicadoresN2(tempN2);
            setIndicadoresN3(tempN3);
            setIndicadoresN4(tempN4);

            //Valida los indicadores padres que tienen mal la unidad y la fuente
            /* let errores = [];
            for (let i = 0; i < data.length; i++) {
                let aux = [];
                if(data[i].unidades_medida_idunidades !== "0" || data[i].fuentes_idfuentes !== "0"){
                    aux = data.filter((datoActual, j, array)=>{
                        return  data[i].idindicadores === datoActual.idindicadores.substring(0,data[i].idindicadores.length) && parseInt(datoActual.nivel) > parseInt(data[i].nivel);
                    });
                    if(aux.length > 0){
                        errores.push({nombre:data[i].nombre, indicador: data[i].idindicadores, hijos:aux});
                    }
                }
                
            }
            console.log(errores); */

            let cero = ["2060103"];
            let uno = ["202010103", "202010203", "206010401", "206010402", "206010701", "206010702", "206010703"];
            let dos = ["10102020501", "10102020502", "10102020503", "10102020504", "10102040201", "20601050101", "20601050102", "20601050103", "20601050104", "20601050105", "20601050106", "20601050107", "20601050108", "20601050109", "20601050110", "20601050111", "20601050112", "20601050113", "20601050114", "20601050115", "20601050116", "20601050117", "20601050201", "20601050202", "20601050203", "20601050204", "20601050205", "20601050206", "20601050207", "20601050208", "20601050209", "20601050210", "20601050211", "20601050212", "20601050213", "20601050214", "20601050215", "20601050216", "20601050217", "20601060101", "20601060201", "20601070401", "20601070402", "20601070501", "20601070502", "20601070504"];
            let tres =  ["2060106010201", "2060106010202", "2060106010301", "2060106010401", "2060106010501", "2060106020201", "2060106020202", "2060106020301", "2060106020401", "2060106020501", "2060107040301", "2060107040302", "2060107040303", "2060107040304", "2060107040401", "2060107050301", "2060107050302", "2060107050303", "2060107050304", "2060107050501"];
            let cuatro = ["10102020208021", "10102020208022", "10102020208023", "10102020208024", "20601060103021", "20601060103022", "20601060104021", "20601060104022", "20601060105021", "20601060105022", "20601060203021", "20601060203022", "20601060204021", "20601060204022", "20601060205021", "20601060205022", "20601070404021", "20601070404022", "20601070505021", "20601070505022"];
            let todos = [];

            todos = todos.concat(cero);
            todos = todos.concat(uno);
            todos = todos.concat(dos);
            todos = todos.concat(tres);
            todos = todos.concat(cuatro);
            todos.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
            console.log(todos);
            
            
            /* console.log(tempN1.length);
            let respuestas = 0;
            let consultas = 0;
            let ind = [];
            for (let i = 0; i < tempN1.length; i++) {
                if(tempN1[i].unidad !== "0"){
                    consultas++;
                }
            }
            
            for (let i = 0; i < tempN1.length; i++) {
                if(tempN1[i].unidad !== "0"){
                    getData2('/indicaterri/search.php?id=' + tempN1[i].value).then(d => {
                        respuestas++;
                        console.log(respuestas);
                        //console.log(d);
                        
                        if(d.statusText !== "OK"){
                            ind.push(tempN1[i].value);
                            if(ind.length > 1){
                                ind.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
                            }
                            console.log(ind);
                            
                        }
                        if(consultas === respuestas){
                            console.log("Terminó");
                            
                            ind.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
                            console.log(ind);
                        }
                    }).catch(error => console.log(error.data));
                }
            } */
            
            
            
            setCargando(false);
        }).catch(error => console.log(error.data));
    }

    const getTerritorios = () => {
        setCargando(true);
        getData('/indicaterri/search.php?id=' + indicadorSeleccionado.value).then(data => {
            console.log(data);
            
            let temp = [];

            let departamentos = [];

            let choco = [];
            let valle = [];
            let cauca = [];
            let narino = [];

            data.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0)); 

            for(let i = 0; data.length > i; i++){
                temp.push({value: data[i].codigo_dane , label:data[i].nombre});
                if(data[i].codigo_dane.substring(0,2) === "19" && data[i].codigo_dane !== "19000"){
                    cauca.push({value: data[i].codigo_dane , label:data[i].nombre});
                }else if(data[i].codigo_dane.substring(0,2) === "27" && data[i].codigo_dane !== "27000"){
                    choco.push({value: data[i].codigo_dane , label:data[i].nombre});
                }else if(data[i].codigo_dane.substring(0,2) === "52" && data[i].codigo_dane !== "52000"){
                    narino.push({value: data[i].codigo_dane , label:data[i].nombre});
                }else if(data[i].codigo_dane.substring(0,2) === "76" && data[i].codigo_dane !== "76000"){
                    valle.push({value: data[i].codigo_dane , label:data[i].nombre});
                }
            }

            departamentos.push(
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
            
            cauca.length === 0 || valle.length === 0 || narino.length === 0 || choco.length === 0 ?
            setTerritorios(temp)
            :
            setTerritorios(departamentos)
            
            setCargando(false);

            /* data.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0)); 
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
        for(let i = 0; i < territorioSeleccionado.length; i++){
            getData('/periodo/search.php?id=' + indicadorSeleccionado.value + "&dane=" + territorioSeleccionado[i].value).then((data) => {
                console.log(data);
                
                let aux = []; 
                for(let j = 0; data.length > j; j++){
                    aux.push({value: data[j].valor , label: data[j].periodo, municipio: territorioSeleccionado[i].label});
                }
                tempPeriodos.push(aux);
                console.log(aux);
                if(tempPeriodos.length === territorioSeleccionado.length){
                    console.log(tempPeriodos);
                    setPeriodos(tempPeriodos);
                    let opcionesPeriodosAux = [];
                    opcionesPeriodosAux.push({value:"0",label:"TODOS", isDisabled: false})
                    for(let i = 0; i < aux.length; i++){
                        opcionesPeriodosAux.push({value:(i+1).toString(),label:aux[i].label, isDisabled: false})
                    }
                    setOpcionesPeriodos(opcionesPeriodosAux);
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
                }else{
                    valores.push(parseFloat(valor.value.split(",").join(".")));
                }
            }
            console.log(valores);
            
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            let rgba = `rgba(${r},${g},${b},1)`;
            let rgbaHover = `rgba(${r},${g},${b},0.7)`;

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

        console.log(datasets);
        console.log(aniosAux);
        
        setDatosGrafica({
            labels: aniosAux,
            datasets: datasets
        });
    }

    return (
        <div>
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', minHeight:'28em', padding:'1.5em 2.1em 3em 2.1em', textAlign:'left', width:'100%'}}>
                
                    <div style={{minWidth:'18em', width:'25em', backgroundColor:'rgba(255,255,255,1)', padding:'1em 1em 1em 1em', borderRadius:'0.5em', minHeight:'16em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        Dimensiones:
                        <Select options={dimensiones} 
                            isSearchable={true}
                            value={dimensionSeleccionada}
                            isDisabled={cargando}
                            onChange={(i)=>{setDimensionSeleccionada(i)}}
                            name="dimension"
                            placeholder='Seleccionar Dimensión...'
                        />
                    {
                        dimensionSeleccionada!=null &&
                        <div style={{margin:'0.5em 0 0 0'}}>
                            Categorías:
                            <Select options={
                                categorias.length !== 0 ?
                                categorias.filter((datoActual,i,arreglo)=>{
                                    //console.log(datoActual.value[0] + " === "+ dimensionSeleccionada.value);
                                    return datoActual.value[0] === dimensionSeleccionada.value;
                                })
                                :
                                []
                                } 
                                isSearchable={true}
                                value={categoriaSeleccionada}
                                isDisabled={cargando}
                                onChange={(i)=>{setCategoriaSeleccionada(i)}}
                                name="categoria"
                                placeholder='Seleccionar Categoria...'
                            />
                        </div>
                    }
                    {
                        categoriaSeleccionada!=null &&
                        <div style={{margin:'0.5em 0 0 0'}}>
                            Subcategorías:
                            <Select options={
                                //subcategorias.length !== 0 ?
                                subcategorias.filter((datoActual,i,arreglo)=>{
                                    //console.log(datoActual.value + " === " + categoriaSeleccionada.value);
                                    return datoActual.value.substring(0, 3) === categoriaSeleccionada.value;
                                })
                                //:
                                //[]
                                } 
                                isSearchable={true}
                                value={subcategoriaSeleccionada}
                                isDisabled={cargando}
                                onChange={(i)=>{setSubcategoriaSeleccionada(i)}}
                                name="Subcategoria"
                                placeholder='Seleccionar Subcategoria...'
                            />
                        </div>
                    }
                    {
                        subcategoriaSeleccionada!=null &&
                        <div style={{margin:'0.5em 0 0 0'}}>
                            Indicadores de Nivel 0:
                            <Select options={
                                //indicadoresN0.length !== 0 ?
                                indicadoresN0.filter((datoActual,i,arreglo)=>{
                                    //console.log(datoActual.value + " === " + subcategoriaSeleccionada.value);
                                    return datoActual.value.substring(0, 5) === subcategoriaSeleccionada.value;
                                })
                                //:
                                //[]
                                } 
                                isSearchable={true}
                                value={indicadorN0Seleccionado}
                                isDisabled={cargando}
                                onChange={(i)=>{setIndicadorN0Seleccionado(i)}}
                                name="IndicadorN0"
                                placeholder='Seleccionar Indicador Nivel 0...'
                            />
                        </div>
                    }
                    {
                        indicadorN0Seleccionado!=null && indicadorN0Seleccionado.unidad ==="0" &&
                        <div style={{margin:'0.5em 0 0 0'}}>
                            Indicadores de Nivel 1:
                            <Select options={
                                indicadoresN1.length !== 0 ?
                                indicadoresN1.filter((datoActual,i,arreglo)=>{
                                    //console.log(datoActual.value + " === " + indicadorN0Seleccionado.value);
                                    return datoActual.value.substring(0, 7) === indicadorN0Seleccionado.value;
                                })
                                :
                                []
                                } 
                                isSearchable={true}
                                value={indicadorN1Seleccionado}
                                isDisabled={cargando}
                                onChange={(i)=>{setIndicadorN1Seleccionado(i)}}
                                name="IndicadorN1"
                                placeholder='Seleccionar Indicador Nivel 1...'
                            />
                        </div>
                    }
                    {
                        indicadorN1Seleccionado!=null && indicadorN1Seleccionado.unidad ==="0" &&
                        <div style={{margin:'0.5em 0 0 0'}}>
                            Indicadores de Nivel 2:
                            <Select options={
                                indicadoresN2.length !== 0 ?
                                indicadoresN2.filter((datoActual,i,arreglo)=>{
                                    //console.log(datoActual.value + " === " + indicadorN1Seleccionado.value);
                                    return datoActual.value.substring(0, 9) === indicadorN1Seleccionado.value;
                                })
                                :
                                []
                                } 
                                isSearchable={true}
                                value={indicadorN2Seleccionado}
                                isDisabled={cargando}
                                onChange={(i)=>{setIndicadorN2Seleccionado(i)}}
                                name="IndicadorN2"
                                placeholder='Seleccionar Indicador Nivel 2...'
                            />
                        </div>
                    }
                    {
                        indicadorN2Seleccionado!=null && indicadorN2Seleccionado.unidad ==="0" &&
                        <div style={{margin:'0.5em 0 0 0'}}>
                            Indicadores de Nivel 3:
                            <Select options={
                                indicadoresN3.length !== 0 ?
                                indicadoresN3.filter((datoActual,i,arreglo)=>{
                                    //console.log(datoActual.value + " === " + indicadorN2Seleccionado.value);
                                    return datoActual.value.substring(0, 11) === indicadorN2Seleccionado.value;
                                })
                                :
                                []
                                } 
                                isSearchable={true}
                                value={indicadorN3Seleccionado}
                                isDisabled={cargando}
                                onChange={(i)=>{setIndicadorN3Seleccionado(i)}}
                                name="IndicadorN3"
                                placeholder='Seleccionar Indicador Nivel 3...'
                            />
                        </div>
                    }
                    {
                        indicadorN3Seleccionado!=null && indicadorN3Seleccionado.unidad ==="0" &&
                        <div style={{margin:'0.5em 0 0 0'}}>
                            Indicadores de Nivel 4:
                            <Select options={
                                indicadoresN4.length !== 0 ?
                                indicadoresN4.filter((datoActual,i,arreglo)=>{
                                    //console.log(datoActual.value + " === " + indicadorN3Seleccionado.value);
                                    return datoActual.value.substring(0, 13) === indicadorN3Seleccionado.value;
                                })
                                :
                                []
                                } 
                                isSearchable={true}
                                value={indicadorN4Seleccionado}
                                isDisabled={cargando}
                                onChange={(i)=>{setIndicadorN4Seleccionado(i)}}
                                name="IndicadorN4"
                                placeholder='Seleccionar Indicador Nivel 4...'
                            />
                        </div>
                    }
                    {
                        botonIndicador &&
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
                                
                                
                                if(p && p.length > 0 && p[0].label !== undefined &&  p[0].label === "TODOS"){
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
                            <LinearProgress color="secondary" />
                        </div>
                    }
                    </div>
                    
                    {/* <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        style={{width:'100%', margin:'0em 0 1em 0', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}}
                        onClick={()=>{setNoGrafica(false); setGraficar(false); setDatosGrafica(null)}}
                        startIcon={<CreateIcon />}
                    >
                        Editar Datos de la gráfica
                    </Button> */}
                    {
                        datosGrafica == null &&
                        <div style={{minWidth:'18em', width:'60%', height:'13em', position:'relative', margin:'0em 0 0 0em', backgroundColor:'rgba(200,200,200,0.97)', padding:'2em 2em 2em 2em', borderRadius:'0.5em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                            {
                                dimensionSeleccionada== null &&
                                <div style={{fontSize:'20px', fontFamily:'roboto'}}>Una DIMENSIÓN es el componente macro en donde se agrupan las diferentes categorias.</div>
                            }
                            {
                                dimensionSeleccionada != null && categoriaSeleccionada == null &&
                                <div style={{fontSize:'20px', fontFamily:'roboto'}}> Las CATEGORIAS son un conjunto de objetos agrupados normalmente con un criterio de máxima homogeneidad. 
                                Corresponde a la categoría de análisis que contiene subcategorías y los indicadores.</div>
                            }
                            {
                                categoriaSeleccionada != null && subcategoriaSeleccionada ==null &&
                                <div style={{fontSize:'20px', fontFamily:'roboto'}}>Una SUBCATEGORIA es un agrupamiento de objetos en conjuntos homogéneos de acuerdo con criterios preestablecidos y en función del uso que tendrá la subcategoría. 
                                Corresponde a la desagregación que tiene una categoría de análisis y en las cuales se encontraran los indicadores.</div>
                            }
                            {
                                subcategoriaSeleccionada != null&&
                                <div style={{fontSize:'20px', fontFamily:'roboto'}}>Los INDICADORES son datos o información que sirve para conocer o valorar las categorías y subcategorías y la intensidad de un hecho o para determinar su evolución futura. Es decir, aquellos medibles con base en información secundaria. 
                                Los indicadores son jerárquicos y se presentan indicadores de nivel 1, nivel 2, nivel 3 y hasta nivel 4.</div>
                            }
                            
                        </div>
                    }
                
                {
                    (datosGrafica != null /* && graficar!==false */ && graficaBarras && !noGrafica) &&
                    <div style={{minWidth:'18em', width:'60%', position:'relative', margin:'0em 0 0 0em', backgroundColor:'rgba(255,255,255,0.97)', padding:'3em 0.5em 0.5em 0.5em', borderRadius:'0.5em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
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
                        height={35}
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
                    (datosGrafica != null /* && graficar!==false */ && graficaLineas && !noGrafica) &&
                    <div style={{minWidth:'18em', width:'60%', position:'relative',margin:'0em 0 0 0', backgroundColor:'rgba(255,255,255,0.97)', padding:'3em 0.5em 0.5em 0.5em', borderRadius:'0.5em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        
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
                        height={35}
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
                    <div style={{minWidth:'18em', width:'60%',textAlign:'center', margin:'5em 0 0 0'}}>
                        <h3>Estos datos son de caracter cualitativo y no se pueden graficar.</h3>
                        <Excel titulo={indicadorSeleccionado.label} datosExcel={datosGrafica.datasets} aniosExcel={datosGrafica.labels}></Excel>
                    </div>
                }
            </div>
        </div>
    );
};

export default EstadisticasTres;