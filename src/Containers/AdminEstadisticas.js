import React, {useState,useEffect} from 'react';

import CargarExcel from '../Components/CargarExcel';
import Tabs from '../Components/Tabs';
import Buscador from '../Components/Buscador';
import Titulo from '../Components/Titulo';
import Footer from '../Components/Footer';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import CrearIndicador from '../Components/CrearIndicador';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Select from "react-select";

import {postData} from '../utils/api';
import {getData} from '../utils/api';


import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";

const ModificarIndicadores = () =>{
    const [buscar, setBuscar] = useState('');
    const [filtrado, setFiltrado] = useState([]);
    const [indicadorExistente, setIndicadorExistente] = useState(null);
    /* const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [tipoDeAccion, setTipoDeAccion] = useState(0);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [nombreIndicador, setNombreIndicador] = useState('NOMBRE_INDICADOR'); */

    const [unidades, setUnidades] = useState('');
    const [fuentes, setFuentes] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [indicadores, setindIndicadores] = useState([]);
    const [niveles] = useState([{value:"0",label:'Cero'},{value:"1",label:'Uno'}, {value:"2",label:'Dos'}, {value:"3",label:'Tres'}, {value:"4",label:'Cuatro'}]);
    const [tipos] = useState([{value:'null',label:'No Aplica'},{value:'Númerico',label:'Númerico'},{value:'Texto',label:'Texto'}]);
    const [periodicidades] = useState([{value:'null',label:'No Aplica'},{value:'Anual',label:'Texto'}, {value:'Trimestral',label:'Trimestral'}]);

    const [creando, setCreando] = useState(false);
    const [ordenIndicadorACrear, setOrdenIndicadorACrear] = useState('');
    const [gestionando, setGestionando] = useState(false);

    const [indicadorNuevoConHijoschecked, setIndicadorNuevoConHijosChecked] = React.useState(false);

    const [indicador, setIndicador] = useState({
        idindicador: '',
        nombre: '',
        periodicidad: 'null',
        tipo_valor:'null',
        nivel:'0',
        fuentes_idfuentes: '',
        unidades_medida: '',
        indicadorSuperior: '',
        categoria: '',
    });

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

            //handleChange({value:temp[0].value},{name:"categoria"});
            setCategorias(temp);
        }).catch(error => console.log(error.data));

        getData('/indicador/all.php').then(data => {
            console.log(data);
            var tempIDMalo = [];
            var tempNivelMalo = [];
            var nombres = [];
            var periodicidades = [];

            data.forEach(dato => {
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
            console.log(tempNivelMalo);

            let tempData = [];
            let temp = [];

            /* for(let i = 0; data.length > i; i++){
                if(data[i].unidades_medida_idunidades !== "0"){
                    let p = "";
                    p = data.find(padre => padre.idindicadores === data[i].indicadores_idindicadores);
                    if(p !== undefined){
                        data[i].nombre = p.nombre + " => " + data[i].nombre.toLowerCase();
                    }
                }
                temp.push({value: data[i].idindicadores , label:data[i].nombre.charAt(0).toUpperCase() + data[i].nombre.slice(1), unidad:data[i].unidades_medida_idunidades, periodicidad:data[i].periodicidad, tipo_valor:data[i].tipo_valor, nivel: data[i].nivel, padre: data[i].indicadores_idindicadores, fuente:data[i].fuentes_idfuentes, categoria:data[i].categorias_idcategorias});
            }

            console.log(temp);
            
            setindIndicadores(temp); */

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
    }, [] );

    const handleClose = () => {
        setCreando(false);
    };

    /* const handleChange = prop => event => {
        console.log('Probando');
        console.log(event.target.value);
        
        setIndicador({ ...indicador, [prop]: event.target.value });
    }; */
    const handleChange = (selectedOption,e) => {
        /* console.log(selectedOption);
        console.log(e); */
        
        
        e!==undefined?
        setIndicador({ ...indicador, [e.name]: selectedOption.value })
        :
        setIndicador({ ...indicador, "nombre": selectedOption.target.value })
    };

    const handleOpen = (accion) => {
    }

    const handleSearch = () => {
        if(indicador.idindicador !== ''){
            //Se llama la petición para validar que existe el indicador
            setIndicadorExistente(true);
        }
    }

    const handleCancel = () => {
        setIndicadorExistente(null);
        indicador.idindicador = '';
    }

    const handleCreate = () => {

    }

    return(
        <div>
            <div style={{minHeight:'14em'}}>
                <CrearIndicador
                    indicador={indicador}
                    handleChange={handleChange} 
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
                    </div>
                }
                
                {
                    gestionando ?
                    <div>
                        <div style={{margin:'2em 2.5em 2em 2.5em', textAlign:'left'}}>
                            <div style={{margin:'0em 0em 1em 0em', textAlign:'center'}}>
                                Primero selecciona un indicador...
                            </div>
                            <Select options={indicadores} 
                                    isSearchable={true}
                                    placeholder='Seleccionar Indicador...'
                            />
                        </div>
                        <div >
                            <Button color="primary" variant="outlined" onClick={()=>{setGestionando(false)}}>Cancelar</Button>
                            <Button color="default" style={{marginLeft:'0.5em'}} variant="contained" onClick={()=>{}}>Modificar indicador</Button>
                            <Button color="secondary" style={{marginLeft:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained" onClick={()=>{}}>Eliminar indicador</Button>  
                        </div>
                    </div>
                    :
                    null
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
            <Dialog
                /* open={openCrearIndicadorHijoDialog} */
                onClose={handleClose}
                scroll={"body"}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                >
                <DialogTitle id="alert-dialog-title">Titulo</DialogTitle>
                <DialogContent>
                {/* <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText> */}
                    <div>
                        <TextField /* value={values.newPass} onChange={handleChange('newPass')} */ type="text" fullWidth id="indicador" label="Nombre" />
                        <div style={{margin:'1em 0em 1em 0em'}}>
                            <div>Nivel</div>
                            <Select options={niveles} 
                                    defaultValue={niveles[0]}
                                    isSearchable={false}
                            />
                        </div>
                        <div style={{margin:'1em 0em 1em 0em'}}>
                            <div>Categoría</div>
                            <Select options={categorias} 
                                    isSearchable={true}
                                    defaultValue={categorias[0]}
                            />
                        </div>
                        <div style={{margin:'1em 0em 0em 0em'}}>
                            <div>Indicador de orden superior</div>
                            <Select options={tipos} 
                                    isSearchable={false}
                                    defaultValue={periodicidades[0]}
                            />
                        </div>
                        <div style={{margin:'1em 0em 1em 0em'}}>
                            <div>Fuente</div>
                            <Select options={fuentes} 
                                    isSearchable={true}
                                    defaultValue={fuentes[0]}
                            />
                        </div>
                        <div>
                            <div>Unidad</div>
                            <Select options={unidades} 
                                    isSearchable={true}
                                    defaultValue={unidades[0]}
                            />
                        </div>
                        <div style={{margin:'1em 0em 0em 0em'}}>
                            <div>Tipo de valor</div>
                            <Select options={tipos} 
                                    isSearchable={true}
                                    defaultValue={tipos[0]}
                            />
                        </div>
                        <div style={{margin:'1em 0em 0em 0em'}}>
                            <div>Periodicidad</div>
                            <Select options={tipos} 
                                    isSearchable={false}
                                    defaultValue={periodicidades[0]}
                            />
                        </div>
                        
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button size="small" variant="outlined" onClick={handleClose} color="default">
                        Cancelar
                    </Button>
                    <Button size="small" variant="contained" onClick={handleCreate} color="secondary" style={{margin:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const AdminEstadisticas = () => {
    let titulo = "Administrador / Estadísticas";
    const [indice, setindice] = useState(1);

    return (
        <div style={{minHeight:'26em'}}>
            <NavBarDesktop user={"administrador"}></NavBarDesktop>
            <NavBarMovil user={"administrador"}></NavBarMovil>
            <Titulo titulo={titulo}></Titulo>
            <Tabs setindice={setindice} tab1="Gestionar Indicadores" tab2="Cargar Excel"></Tabs>
            {indice === 1 ? <ModificarIndicadores/> : <CargarExcel/> }
            <div className="footer-admin"></div>
            <Footer></Footer>
        </div>
    );
};

export default AdminEstadisticas;