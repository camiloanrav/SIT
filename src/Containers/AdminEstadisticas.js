import React, {useState,useEffect} from 'react';

import CargarExcel from '../Components/CargarExcel';
import Tabs from '../Components/Tabs';

import Titulo from '../Components/Titulo';
import Footer from '../Components/Footer';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import CrearIndicador from '../Components/CrearIndicador';
import ModificarIndicador from '../Components/ModificarIndicador';

import Excel2 from '../Components/Excel2';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Select from "react-select";

import {postData} from '../utils/api';
import {getData} from '../utils/api';

import  { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
    },
}));


const AdministrarIndicadores = ({indicadores, getIndicadores}) =>{
    const classes = useStyles();
    const [unidades, setUnidades] = useState('');
    const [fuentes, setFuentes] = useState('');
    const [categorias, setCategorias] = useState([]);
    
    const [niveles] = useState([{value:"0",label:'Cero'},{value:"1",label:'Uno'}, {value:"2",label:'Dos'}, {value:"3",label:'Tres'}, {value:"4",label:'Cuatro'}]);
    const [tipos] = useState([{value:'Numérico',label:'Numérico'},{value:'Texto',label:'Texto'}]);
    const [periodicidades] = useState([{value:'Anual',label:'Anual'}, {value:'Trimestral',label:'Trimestral'}]);

    const [creando, setCreando] = useState(false);
    const [eliminando, setEliminando] = useState(false);
    const [ordenIndicadorACrear, setOrdenIndicadorACrear] = useState('');
    const [gestionando, setGestionando] = useState(false);
    const [modificando, setModificando] = useState(false);

    const [postEliminando, setPostEliminando] = useState(false);

    const [indicadorSeleccionado, setIndicadorSeleccionado] = useState(null);

    useEffect(() => {
        getData('/unidad/all.php').then(data => {
            let temp = [];
            data.forEach(dato => {
                temp.push({value: dato.idunidades , label:dato.nombre});
            });
            setUnidades(temp);
        }).catch(error => console.log(error.data));
    
        getData('/fuente/all.php').then(data => {
            let temp = [];
            data.forEach(dato => {
                temp.push({value: dato.idfuentes , label:dato.nombre});
            });
            setFuentes(temp);
        }).catch(error => console.log(error.data));
    
        getData('/categoria/all.php').then(data => {
            let temp = [];
            data.forEach(dato => {
                if(dato.subcategoria === "SI"){
                    temp.push({value: dato.idcategorias , label:dato.nombre});
                }
            });
            setCategorias(temp);
        }).catch(error => console.log(error.data));
    }, [] );

    useEffect(()=>{
        getIndicadores();
    },[modificando,eliminando,creando,gestionando]);

    const handleClose = () => {
        setCreando(false);
        setEliminando(false);
    };

    const Eliminar = (indicadorAEliminar) => {

        let indicadoresHijos = indicadores.filter(i => {
            return i.padre === indicadorAEliminar.value;
        });

        console.log(indicadoresHijos);
        
        if(indicadoresHijos.length!==0){
            alert("El indicador tiene otros indicadores que dependen de él, borre primero esos indicadores.");
            setEliminando(false);
            setGestionando(false);
            setIndicadorSeleccionado(null);
        }else{
            let aux = {"idindicadores":indicadorAEliminar.value};
            let aux2 = {"indicadores_idindicadores":indicadorAEliminar.value};
            setPostEliminando(true);
            postData('/indicaterri/deletegroup.php',aux2).then(data => {
                if(data!==undefined){
                    console.log(data.message);
                }
                
                postData('/indicador/delete.php',aux).then(data => {
                    if(data!==undefined){
                        console.log(data.message);
                    }
                    
                    alert("Eliminado");
                    setPostEliminando(false);
                    setEliminando(false);
                    setGestionando(false);
                    setIndicadorSeleccionado(null);
                });
            });
            
            
        }
    }

    const handleChangeIndicadorSeleccionado = (valor,e) => {
        console.log(valor);
        setIndicadorSeleccionado(valor);
    }

    return(
        <div>
            <div style={{minHeight:'14em'}}>
                <CrearIndicador
                    orden={ordenIndicadorACrear}
                    setOrder={setOrdenIndicadorACrear} 
                    indicadores={indicadores} 
                    fuentes={fuentes} 
                    periodicidades={periodicidades} 
                    categorias={categorias} 
                    niveles={niveles}
                    tipos={tipos}
                    unidades={unidades}
                    >
                </CrearIndicador>
                {
                    gestionando ||  ordenIndicadorACrear!=='' ?
                    null
                    : 
                    <div style={{marginTop:'6em'}}>
                        <Button onClick={()=>{setCreando(true);}} color="default" style={{marginLeft:'0.5em'}} variant="contained">Crear un nuevo Indicador</Button>
                        <Button onClick={()=>{setGestionando(true)}} color="secondary" style={{marginLeft:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained">Gestionar un Indicador</Button>  
                        <Excel2></Excel2>
                    </div>
                }
                
                {
                    gestionando && !modificando ?
                    <div>
                        <div style={{margin:'2em 2.5em 2em 2.5em', textAlign:'left'}}>
                            <div style={{margin:'0em 0em 1em 0em', textAlign:'center'}}>
                                Primero selecciona un indicador...
                            </div>
                            <Select options={indicadores} 
                                    isSearchable={true}
                                    isDisabled={postEliminando}
                                    value={indicadorSeleccionado}
                                    onChange={handleChangeIndicadorSeleccionado}
                                    name="indicador"
                                    placeholder='Seleccionar Indicador...'
                            />
                        </div>
                        {
                            indicadorSeleccionado != null && !postEliminando ?
                            <div>
                                <div style={{margin:'0 0 1em 0'}}>
                                    Indicador con ID: {indicadorSeleccionado.value}
                                </div>
                                <Button color="primary" variant="outlined" onClick={()=>{setGestionando(false); setIndicadorSeleccionado(null)}}>Cancelar</Button>
                                <Button color="default" style={{marginLeft:'0.5em'}} variant="contained" onClick={()=>{setModificando(true)}}>Modificar indicador</Button>
                                <Button color="secondary" style={{marginLeft:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained" onClick={()=>{setEliminando(true)}}>Eliminar indicador</Button>  
                            </div>
                            :
                            null
                        }
                        {
                            indicadorSeleccionado != null && postEliminando &&
                            <div className={classes.root}>
                                Eliminando Indicador: {indicadorSeleccionado.label}...
                                <LinearProgress color="secondary"/>
                            </div>
                        }
                    </div>
                    :
                    null
                }
                {
                    modificando?
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <ModificarIndicador setIndicadorSeleccionado={setIndicadorSeleccionado} setGestionando={setGestionando} setModificando={setModificando} indicadorSeleccionado={indicadorSeleccionado} fuentes={fuentes} periodicidades={periodicidades} tipos={tipos} unidades={unidades}></ModificarIndicador>
                    </div>
                    : null
                }
            </div>
            
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={creando}>
                <DialogTitle id="simple-dialog-title">Tipo de indicador a crear</DialogTitle>
                <Button onClick={() => {setOrdenIndicadorACrear('superior'); handleClose();}} style={{margin:'1em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained" size="small" color="secondary">
                    Indicador de orden superior 
                </Button>
                <Button onClick={() => {setOrdenIndicadorACrear('inferior'); handleClose();}} style={{margin:'1em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained" size="small" color="secondary">
                    Indicador de orden inferior
                </Button>
                <Button onClick={() => {handleClose()}} style={{margin:'1em'}}  variant="outlined" size="small" color="default">
                    Cancelar
                </Button>
            </Dialog>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={eliminando}>
                <DialogTitle id="simple-dialog-title">¿Desea eliminar el indicador {indicadorSeleccionado?indicadorSeleccionado.label:null}? Tenga en cuenta que también se eliminarán todos los datos relacionados a este indicador.</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={()=>{Eliminar(indicadorSeleccionado)}} color="primary" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const AdminEstadisticas = () => {
    let titulo = "Administrador / Estadísticas";
    const [indice, setindice] = useState(1);
    const [indicadores, setindIndicadores] = useState([]);

    useEffect(()=>{
        //getIndicadores();
    },[]);

    const ProtectedComponent = () => {
        if (sessionStorage.getItem("login")){
            return null
        }else{
            return <Redirect to='/ser/login'  />
        }
    }

    const getIndicadores = () => {
        getData('/indicador/all.php').then(data => {
            /* console.log(data); */
            var tempIDMalo = [];
            var tempNivelMalo = [];
            var nombres = [];
            var periodicidades = [];

            data.sort((a,b) => (a.idindicadores > b.idindicadores) ? 1 : ((b.idindicadores > a.idindicadores) ? -1 : 0));

            /* data.forEach(dato => {
                let hijo = 1;

                if(dato.nivel === "1"){
                    hijo = dato.idindicadores.substring(0,7);
                }else if(dato.nivel === "2"){
                    hijo = dato.idindicadores.substring(0,9);
                }else if(dato.nivel === "3"){
                    hijo = dato.idindicadores.substring(0,11);
                }else if(dato.nivel === "4"){
                    hijo = dato.idindicadores.substring(0,13);
                }

                if(dato.nivel === "1" && dato.idindicadores.length !== 9){
                    tempNivelMalo.push({hijo: dato.idindicadores , padre:dato.indicadores_idindicadores, nivel:dato.nivel});
                }else if(dato.nivel === "2" && dato.idindicadores.length !== 11){
                    tempNivelMalo.push({hijo: dato.idindicadores , padre:dato.indicadores_idindicadores, nivel:dato.nivel});
                }else if(dato.nivel === "3" && dato.idindicadores.length !== 13){
                    tempNivelMalo.push({hijo: dato.idindicadores , padre:dato.indicadores_idindicadores, nivel:dato.nivel});
                }else if(dato.nivel === "4" && dato.idindicadores.length !== 14){
                    tempNivelMalo.push({hijo: dato.idindicadores , padre:dato.indicadores_idindicadores, nivel:dato.nivel});
                }
                
                nombres.push(dato.nombre);
                periodicidades.push(dato.periodicidad);

                if(hijo !== dato.indicadores_idindicadores && dato.nivel !== "0"){
                    tempIDMalo.push({hijo: dato.idindicadores , padre:dato.indicadores_idindicadores, nivel:dato.nivel});            
                }
            });
            
            let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
            let findUnique = arr => arr.filter((value,index,self) => self.indexOf(value) === index );

            console.log(findDuplicates(nombres)) // All duplicates
            console.log([...new Set(findDuplicates(nombres))]) // Unique duplicates

            console.log(findUnique(periodicidades)) // All duplicates
            
            console.log(tempIDMalo);
            console.log(tempNivelMalo);*/

            let temp = []; 

            for(/* data[i].unidades_medida_idunidades !== "0" && */let i = 0; data.length > i; i++){
                if(data[i].nivel !== "0"){
                    let p = "";
                    p = data.find(padre => padre.idindicadores === data[i].indicadores_idindicadores);
                    if(p !== undefined){
                        data[i].nombre = p.nombre + " => " + data[i].nombre.toLowerCase();
                    }
                }
                temp.push({value: data[i].idindicadores , label:data[i].nombre.charAt(0).toUpperCase() + data[i].nombre.slice(1), unidad:data[i].unidades_medida_idunidades, periodicidad:data[i].periodicidad, tipo_valor:data[i].tipo_valor, nivel: data[i].nivel, padre: data[i].indicadores_idindicadores, fuente:data[i].fuentes_idfuentes, categoria:data[i].categorias_idcategorias});
            }
            console.log(temp);
            //handleChange({value:temp[0].value},{name:"indicadorSuperior"});
            setindIndicadores(temp);

        }).catch(error => console.log(error.data));
    }

    return (
        <div style={{minHeight:'26em'}}>
            <NavBarDesktop user={"administrador"}></NavBarDesktop>
            <NavBarMovil user={"administrador"}></NavBarMovil>
            <Titulo titulo={titulo}></Titulo>
            <Tabs setindice={setindice} tab1="Gestionar Indicadores" tab2="Cargar Excel"></Tabs>
            {indice === 1 ? <AdministrarIndicadores indicadores={indicadores} getIndicadores={getIndicadores}/> : <CargarExcel indicadores={indicadores}/> }
            <div className="footer-admin"></div>
            <ProtectedComponent></ProtectedComponent>
            <Footer></Footer>
        </div>
    );
};

export default AdminEstadisticas;