import React, {useState,useEffect} from 'react';

import CargarExcel from './CargarExcel';
import Tabs from '../Components/Tabs';
import Buscador from '../Components/Buscador';

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
    const [indicadorExistente, setIndicadorExistente] = useState(null);
    const [open, setOpen] = useState(false);
    const [tipoDeAccion, setTipoDeAccion] = useState(0);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [nombreIndicador, setNombreIndicador] = useState('NOMBRE_INDICADOR');

    const [unidades, setUnidades] = useState('');
    const [fuentes, setFuentes] = useState('');
    const [categorias, setCategorias] = useState('');
    const [niveles] = useState([{value:1,label:'Uno'}, {value:2,label:'Dos'}, {value:3,label:'Tres'}, {value:4,label:'Cuatro'}]);

    const handleClose = () => {
        setOpen(false);
    };

    const [indicador, setIndicador] = useState({
        idindicador: '',
        nombre: '',
        peridiocidad: '',
        tipo_valor:'',
        nivel:'',
        fuentes_idfuentes: '',
        unidades_medida: '',
        indicadorSuperior: '',
        categoria: '',
    });

    useEffect(() => {
        getData('/unidad/all.php').then(data => {
            let temp = [];
            for(let i = 0; data.length > i; i++){
                temp.push({value: data[i].idunidades , label:data[i].nombre});                
            }
            setUnidades(temp);
        }).catch(error => console.log(error.data));
    
        getData('/fuente/all.php').then(data => {
            let temp = [];
            for(let i = 0; data.length > i; i++){
                temp.push({value: data[i].idfuentes , label:data[i].nombre});                
            }
            setFuentes(temp);
        }).catch(error => console.log(error.data));
    
        getData('/categoria/all.php').then(data => {
            let temp = [];
            for(let i = 0; data.length > i; i++){
                temp.push({value: data[i].idcategorias , label:data[i].nombre});                
            }
            setCategorias(temp);
        }).catch(error => console.log(error.data));
    }, [] );

    const handleChange = prop => event => {
        setIndicador({ ...indicador, [prop]: event.target.value });
    };

    const handleOpen = (accion) => {
        setTipoDeAccion(accion);
        if(accion === 0){
            setTitle("Eliminar indicador");
            setMessage("¿Seguro desea eliminar el indicador " + nombreIndicador + "?");
        }else if( accion === 1) {
            setTitle("Modificar indicador");
            setMessage("¿Seguro desea modificar el indicador " + nombreIndicador + "?");
        }else if(accion === 2) {
            setTitle("Agregar indicador");
            setMessage("¿Seguro desea agregar el indicador?");
        }
        setOpen(true);
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
        <div style={{marginTop:'5em', display:'flex', justifyContent:'center', textAlign:'left'}}>
            <div style={{maxWidth:'35em', minWidth:'15em' , margin:'1em',   padding:'1em', backgroundColor:'#eee', borderRadius:'1em'}}>
                <TextField type="number" value={indicador.idindicador} onChange={handleChange('idindicador')} style={{margin:'0.5em'}} fullWidth id="indicador" label="ID Indicador" />
                
                {
                    indicadorExistente === null ? 
                    <Button onClick={() => {handleSearch()}} style={{margin:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained" size="small" color="secondary">
                        Buscar
                    </Button>
                    :
                    indicadorExistente ? 
                    <div>
                        <Button onClick={() => {handleOpen(0)}} variant="contained" size="small" color="default">
                            Eliminar
                        </Button>
                        <Button onClick={() => {handleOpen(1)}} style={{margin:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained" size="small" color="secondary">
                            Modificar
                        </Button>
                    </div>
                    :
                    <div>
                        
                        <div style={{margin:'0.5em'}}>El indicador {indicador.idindicador} no existe.</div>
                        <Button onClick={() => {handleCancel()}}  variant="outlined" size="small" color="default">
                            Cancelar
                        </Button>
                        <Button onClick={() => {handleOpen(2)}} style={{margin:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained" size="small" color="secondary">
                            Agregar
                        </Button>
                    </div>
                }
                
                
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="body"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
                {
                    tipoDeAccion === 0 ? null : 
                    <div>
                        <TextField /* value={values.newPass} onChange={handleChange('newPass')} */ type="text" fullWidth id="indicador" label="Nombre" />
                        <div style={{margin:'1em 0em 1em 0em'}}>
                            <div>Categoría</div>
                            <Select options={categorias} 
                                    isSearchable={true}
                                    defaultValue={categorias[0]}
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
                            <div>Nivel</div>
                            <Select options={niveles} 
                                    defaultValue={niveles[0]}
                                    isSearchable={false}
                            />
                        </div>
                        <TextField /* value={values.newPass} onChange={handleChange('newPass')} */ type="number" fullWidth id="indicador" label="Peridiocidad" />
                        <TextField /* value={values.newPass} onChange={handleChange('newPass')} */ fullWidth id="indicador" label="Tipo de valor" />
                        <TextField /* value={values.newPass} onChange={handleChange('newPass')} */ fullWidth id="indicador" label="Indicador de orden superior" />
                    </div>
                }
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

const AdminEstadisticas = ({setTitulo}) => {
    const [indice, setindice] = useState(1);
    
    setTitulo("Administrador / Estadísticas");

    return (
        <div style={{minHeight:'26em'}}>
            <Tabs setindice={setindice} tab1="Modificar Indicadores" tab2="Cargar Excel"></Tabs>
            {indice === 1 ? <ModificarIndicadores/> : <CargarExcel/> }
        </div>
    );
};

export default AdminEstadisticas;