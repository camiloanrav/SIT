import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from "react-select";
import Button from '@material-ui/core/Button';

import {postData} from '../utils/api';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const ModificarIndicador = ({setIndicadorSeleccionado, setGestionando, setModificando,indicadorSeleccionado,fuentes,periodicidades,tipos,unidades}) => {
    
    const [nombre, setNombre] = useState(()=>{
        let a = indicadorSeleccionado.label.split("=>");
        return a[a.length-1];
    });

    const [fuenteSeleccionada, setFuenteSeleccionada] = useState(fuentes.find((i)=>{return i.value === indicadorSeleccionado.fuente}));
    const [periodicidadSeleccionada, setPeriodicidadSeleccionada] = useState(periodicidades.find((i)=>{return i.value.toLowerCase() === indicadorSeleccionado.periodicidad.trim().toLowerCase()}));
    const [tipoSeleccionado, setTipoSeleccionado] = useState(tipos.find((i)=>{
        return i.value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === indicadorSeleccionado.tipo_valor.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }));
    const [unidadSeleccionada, setUnidadSeleccionada] = useState(
        indicadorSeleccionado.unidad !== "0"?
        unidades.find((i)=>{return i.value === indicadorSeleccionado.unidad})
        :
        null
    );

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [messageSnackbar, setMessageSnackbar] = React.useState(false);

    const handleChangeFuente = (valor,e) => {
        setFuenteSeleccionada(valor);
    }
    const handleChangeTipo = (valor,e) => {
        setTipoSeleccionado(valor);
    }
    const handleChangeUnidad = (valor,e) => {
        setUnidadSeleccionada(valor);
    }
    const handleChangePeriodicidad = (valor,e) => {
        setPeriodicidadSeleccionada(valor);
    }

    const Modificar = () => {
        let aux;
        if(indicadorSeleccionado.unidad !== "0"){
            aux = {
                "idindicadores": indicadorSeleccionado.value,
                "nombre": nombre,
                "periodicidad": periodicidadSeleccionada.value,
                "tipo_valor": tipoSeleccionado.value,
                "nivel": indicadorSeleccionado.nivel,
                "fuentes_idfuentes": fuenteSeleccionada.value,
                "unidades_medida_idunidades": unidadSeleccionada.value,
                "indicadores_idindicadores": indicadorSeleccionado.padre,
                "categorias_idcategorias": indicadorSeleccionado.categoria
            }
        }else{
            aux = {
                "idindicadores": indicadorSeleccionado.value,
                "nombre": nombre,
                "periodicidad": indicadorSeleccionado.periodicidad,
                "tipo_valor": indicadorSeleccionado.tipo_valor,
                "nivel": indicadorSeleccionado.nivel,
                "fuentes_idfuentes": indicadorSeleccionado.fuente,
                "unidades_medida_idunidades": indicadorSeleccionado.unidad,
                "indicadores_idindicadores": indicadorSeleccionado.padre,
                "categorias_idcategorias": indicadorSeleccionado.categoria
            }
        }
        
    if(aux.nombre.trim() !==""){
        postData('/indicador/update.php',aux).then(data => {
            setMessageSnackbar(data.message);
            setOpenSnackbar(true);
            setModificando(false);
            setGestionando(false);
            setIndicadorSeleccionado(null);
        });
    }else{
        setMessageSnackbar("El nombre no es valido.");
        setOpenSnackbar(true);
    }
        
    }

    return (
        <div style={{minWidth:'15em', width:'50em', margin:'2em 1em 0em 1em', textAlign:'left'}}>
            <TextField onChange={(event)=>{setNombre(event.target.value)}} value={nombre} type="text" fullWidth id="indicador" label="Nombre" />
            {
                fuenteSeleccionada!=null?
                <div style={{margin:'1em 0em 1em 0em'}}>
                    <div>Fuentes</div>
                    <Select options={fuentes}
                            value={fuenteSeleccionada}
                            isSearchable={true}
                            onChange={handleChangeFuente}
                            name="fuentes_idfuentes"
                            placeholder="Selecciona la fuente"
                    />
                </div>
                :
                null
            }
            {
                periodicidadSeleccionada!=null?
                <div style={{margin:'1em 0em 1em 0em'}}>
                    <div>Periodicidad</div>
                    <Select options={periodicidades}
                            value={periodicidadSeleccionada}
                            isSearchable={false}
                            onChange={handleChangePeriodicidad}
                            name="periodicidad"
                            placeholder="Selecciona la periodicidad"
                    />
                </div>
                :
                null
            }
            {
                tipoSeleccionado!=null?
                <div style={{margin:'1em 0em 1em 0em'}}>
                    <div>Tipo de valor</div>
                    <Select options={tipos}
                            value={tipoSeleccionado}
                            isSearchable={false}
                            onChange={handleChangeTipo}
                            name="tipo_valor"
                            placeholder="Selecciona el tipo de valor"
                    />
                </div>
                :
                null
            }
            {
                unidadSeleccionada!=null?
                <div style={{margin:'1em 0em 1em 0em'}}>
                    <div>Unidad de medida</div>
                    <Select options={unidades}
                            value={unidadSeleccionada}
                            isSearchable={true}
                            onChange={handleChangeUnidad}
                            name="unidades_medida"
                            placeholder="Selecciona la unidad de medida"
                    />
                </div>
                :
                null
            }
            
            <div style={{display:'flex', justifyContent:'center', margin:'2em 0 0 0'}}>
                <Button color="default" variant="contained" onClick={()=>{setModificando(false)}}>Cancelar</Button>
                <Button onClick={()=>{Modificar()}} color="secondary" style={{marginLeft:'0.5em',background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained">Modificar indicador</Button>  
            </div>
            <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    open={openSnackbar}
                    autoHideDuration={4000}
                    onClose={()=>{setOpenSnackbar(false)}}
                    message={messageSnackbar}
                    action={
                        <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{setOpenSnackbar(false);}}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                        </React.Fragment>
                    }
                />
        </div>
    );
};

export default ModificarIndicador;