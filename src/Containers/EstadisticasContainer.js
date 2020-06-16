import React, {useState, useEffect} from 'react';

import NavBarDesktop from "../Components/NavBarDesktop";
import NavBarMovil from "../Components/NavBarMovil";
import Footer from "../Components/Footer";

import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Select from "react-select";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import {getData} from '../utils/api';

import background from '../background.png';

import EqualizerIcon from '@material-ui/icons/Equalizer';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
    },
}));

const EstadisticasContainer = () => {
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


    const [unidad, setUnidad] = useState(null);

    const[cargando, setCargando] = useState(false);

    const classes = useStyles();

    useEffect(()=>{
        getIndicadores();
    },[]);

    useEffect(()=>{
        getIndicadores();
    },[]);

    const getUnidad = () => {
        getData('/unidad/search.php?id='+indicadorSeleccionado.value).then(data => {
            setUnidad(data[0].nombre);
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
            for(let i = 0; data.length > i; i++){
                temp.push({value: data[i].codigo_dane , label:data[i].nombre});
            }
            setTerritorios(temp);
            setCargando(false);
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
        let anios = [];
        let datasets = [];

        let auxPeriodos = periodoSeleccionado;

        auxPeriodos.forEach(element => {
            anios.push(parseInt(element.label));
        });
        console.log(anios);
        anios.sort(function(a, b){return a-b});
        console.log(anios);
        for(let i = 0; i < anios.length; i ++){
            anios[i] = anios[i].toString();
        }

        console.log(anios);

        for(let i = 0; i < periodos.length; i++){
            let valores = [];
            let dataset = null;
            let municipio = periodos[i][0].municipio;
            console.log(municipio);
            for(let j = 0; j < anios.length; j++){
                let valor = null;
                console.log(anios[j]);
                valor = periodos[i].find((valorActual) => {
                    return valorActual.label === anios[j];
                });
                console.log(valor);
                valores.push(parseFloat(valor.value.split(",").join(".")));
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
            labels: anios,
            datasets: datasets
        });
    }

    return (
        <div>
            <NavBarDesktop></NavBarDesktop>
            <NavBarMovil></NavBarMovil>
            <div style={{minHeight:'28em', padding:'1.5em 1.5em 3em 1.5em', textAlign:'left', width:'100%', background: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.9)), url(${background})`/* ,  backgroundImage:`url(${background})` */, backgroundPosition:'center', backgroundRepeat:'repeat', backgroundSize:'cover'}}>
                {
                    (!graficar && datosGrafica==null) ?
                    <div style={{backgroundColor:'rgba(255,255,255,0.97)', padding:'1em 1em 1em 1em', borderRadius:'0.5em', minHeight:'16em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
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
                            <Button onClick={()=>{getTerritorios(); setBotonIndicador(false); getUnidad();}} color="secondary" style={{margin:'1.5em 1em 1em 1em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained">Seleccionar Indicador</Button>  
                        </div>
                    }
                    {
                        territorios.length !== 0 &&
                        <div style={{margin:'1em 0 0 0'}}>
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
                        <div style={{margin:'1em 0 0 0'}}>
                            Periodos:
                            <Select options={periodos[0]} 
                            isSearchable={true}
                            isMulti
                            isDisabled={cargando}
                            value={periodoSeleccionado}
                            onChange={(p)=>{
                                setPeriodoSeleccionado(p);
                                setBotonPeriodo(true);
                                
                                setGraficar(false);
                                setDatosGrafica(null);
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
                    :
                    
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        style={{width:'100%', margin:'0em 0 1em 0', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}}
                        onClick={()=>{setGraficar(false); setDatosGrafica(null)}}
                        startIcon={<CreateIcon />}
                    >
                        Editar Datos de la gráfica
                    </Button>
                }
                
                {
                    (datosGrafica != null && graficar!==false && graficaBarras) &&
                    <div style={{position:'relative', margin:'0em 0 0 0', backgroundColor:'rgba(255,255,255,0.97)', padding:'0.5em 0.5em 0.5em 0.5em', borderRadius:'0.5em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
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
                            }
                        }}   
                        />
                    </div>
                }
                {
                    (datosGrafica != null && graficar!==false && graficaLineas) &&
                    <div style={{position:'relative',margin:'0em 0 0 0', backgroundColor:'rgba(255,255,255,0.97)', padding:'0.5em 0.5em 0.5em 0.5em', borderRadius:'0.5em', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        
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
                            }
                        }}   
                        />
                    </div>
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default EstadisticasContainer;