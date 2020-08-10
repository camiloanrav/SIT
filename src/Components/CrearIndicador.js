import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from "react-select";
import Button from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import {postData} from '../utils/api';

const FormularioIndicadorOrdenSuperior = ({orden, indicadores, niveles, categorias, setOrder, fuentes, periodicidades, tipos, unidades}) => {
    
    const [indicadorFiltrado, setIndicadorFiltrado] = useState([]);
    const [nombre, setNombre] = useState("");
    const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
    const [indicadorSeleccionado, setIndicadorSeleccionado] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    const [fuenteSeleccionada, setFuenteSeleccionada] = useState(null);
    const [periodicidadSeleccionada, setPeriodicidadSeleccionada] = useState(null);
    const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
    const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [messageSnackbar, setMessageSnackbar] = React.useState(false);

    useEffect(()=>{
        setIndicadorSeleccionado(null);
        setCategoriaSeleccionada(null);

        setFuenteSeleccionada(null);
        setPeriodicidadSeleccionada(null);
        setTipoSeleccionado(null);
        setUnidadSeleccionada(null);

        if(nivelSeleccionado != null){
            if(nivelSeleccionado.value==="1"){
                setIndicadorFiltrado(indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="0" && currentValue.unidad==="0"}));
            }else if(nivelSeleccionado.value==="2"){
                setIndicadorFiltrado(indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="1" && currentValue.unidad==="0"}));
            }else if(nivelSeleccionado.value==="3"){
                setIndicadorFiltrado(indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="2" && currentValue.unidad==="0"}));
            }else if(nivelSeleccionado.value==="4"){
                setIndicadorFiltrado(indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="3" && currentValue.unidad==="0"}));
            }
        }
        
    }, [nivelSeleccionado]);

    useEffect(()=>{
        setFuenteSeleccionada(null);
    },[categoriaSeleccionada, indicadorSeleccionado])

    useEffect(()=>{
        setPeriodicidadSeleccionada(null);
    },[fuenteSeleccionada]);

    useEffect(()=>{
        setTipoSeleccionado(null);
    },[periodicidadSeleccionada]);

    useEffect(()=>{
        setUnidadSeleccionada(null);
    },[tipoSeleccionado]);

    const handleChangeNivel = (valor,e) => {
        console.log(valor);
        setNivelSeleccionado(valor);
    }

    const handleChangeIndicador = (valor,e) => {
        console.log(valor);
        setIndicadorSeleccionado(valor);
    }

    const handleChangeCategoria = (valor,e) => {
        console.log(valor);
        setCategoriaSeleccionada(valor);
    }

    const handleChangeFuente = (valor,e) => {
        console.log(valor);
        setFuenteSeleccionada(valor);
    }

    const handleChangePeriodicidad = (valor,e) => {
        console.log(valor);
        setPeriodicidadSeleccionada(valor);
    }

    const handleChangeTipo = (valor,e) => {
        console.log(valor);
        setTipoSeleccionado(valor);
    }

    const handleChangeUnidad = (valor,e) => {
        console.log(valor);
        setUnidadSeleccionada(valor);
    }

    const CrearIndicador = () => {
        let indicadoresHijos = [];
        let indicadoresHijosSubst = [];
        let ultimoIndicador = 0;

        let indicadorFinalAux = '';
        let categoriaAux = {"value":""};
        let indicadorSuperiorAux = {"value":""};

        let position = parseInt(nivelSeleccionado.value) * 2 + 5;

        if(nivelSeleccionado.value === "0"){
            indicadoresHijos = indicadores.filter((i) => {
                return i.value.substring(0,position) === categoriaSeleccionada.value && i.value.length === 7;
            });
            console.log(indicadoresHijos);
        }else{
            /* indicadoresHijos = indicadores.filter(i => {
                return i.value.substring(0,position) === indicadorSeleccionado.value && i.nivel === nivelSeleccionado.value;
            });
            console.log(indicadoresHijos); */
            indicadoresHijos = indicadores.filter(i => {
                return i.padre === indicadorSeleccionado.value;
            });
            console.log(indicadoresHijos);
        }

        for(let i = 0; indicadoresHijos.length > i ; i++){
            indicadoresHijosSubst.push(parseInt(indicadoresHijos[i].value.substring(position, indicadoresHijos[i].length)));
            
            let nombreAux = indicadoresHijos[i].label.split("=>");
            console.log(nombre.toLowerCase().trim() + " - " + nombreAux[nombreAux.length-1].toLowerCase().trim());
            if(nombre.toLowerCase().trim() === nombreAux[nombreAux.length-1].toLowerCase().trim()){
                setMessageSnackbar("Un indicador de este mismo nivel ya tiene ese nombre. Por favor cambiarlo.");
                setOpenSnackbar(true);  
                return;
            }
        }

        console.log(indicadoresHijosSubst);
        
        if(indicadoresHijosSubst.length !== 0){
            //ultimoIndicador = Math.max(...indicadoresHijosSubst) + 1;
            indicadoresHijosSubst.sort(function(a, b){return a-b});
            console.log(indicadoresHijosSubst);

            for(let i = 0; indicadoresHijosSubst.length > i; i++){
                if(indicadoresHijosSubst[i+1] !== undefined){
                    let e = indicadoresHijosSubst[i+1] - indicadoresHijosSubst[i];
                    if(e > 1){
                        ultimoIndicador = indicadoresHijosSubst[i] + 1;
                        break;
                    }
                }else{
                    ultimoIndicador = indicadoresHijosSubst[i] + 1;
                }
            }
            console.log(ultimoIndicador);

            if(nivelSeleccionado.value !== "4"){
                if(ultimoIndicador>99){
                    setMessageSnackbar("A este indicador superior no se le pueden agregar más indicadores.");
                    setOpenSnackbar(true); 
                    return;
                }else{
                    if(ultimoIndicador > 9){
                        indicadorFinalAux = ultimoIndicador.toString();
                    }else{
                        indicadorFinalAux = "0" + ultimoIndicador;
                    }
                }
            }else{
                if(ultimoIndicador > 9){
                    setMessageSnackbar("A este indicador superior no se le pueden agregar más indicadores.");
                    setOpenSnackbar(true); 
                    return;
                }else{
                    indicadorFinalAux = ultimoIndicador.toString();
                }
            }

            if(nivelSeleccionado.value === "0"){
                indicadorFinalAux = categoriaSeleccionada.value + indicadorFinalAux;
                indicadorSuperiorAux={"value": "0"};
            }else{
                indicadorFinalAux = indicadorSeleccionado.value + indicadorFinalAux;
                categoriaAux={"value":indicadorFinalAux.substr(0,5)};
            }
        }else{
            if(nivelSeleccionado.value === "0"){
                indicadorFinalAux = categoriaSeleccionada.value + "01";
                indicadorSuperiorAux={"value": "0"};
            }else{
                if(nivelSeleccionado.value !== "4"){
                    indicadorFinalAux = indicadorSeleccionado.value + "01";
                }else{
                    indicadorFinalAux = indicadorSeleccionado.value + "1";
                }
                categoriaAux={"value":indicadorFinalAux.substr(0,5)};
            }
        }
        console.log(indicadorFinalAux);
        Crear(indicadorFinalAux, categoriaAux, indicadorSuperiorAux);// Modificar
    }

    const Crear = (indicadorFinal, categoriaAux, indicadorSuperiorAux) => {
        let aux;
        if(orden==="superior"){
            aux = {
                "idindicadores": indicadorFinal,
                "nombre": nombre,
                "periodicidad": "null",
                "tipo_valor": "null",
                "nivel": nivelSeleccionado.value,
                "fuentes_idfuentes": "0",
                "unidades_medida_idunidades": "0",
                "indicadores_idindicadores": indicadorSuperiorAux.value===""?indicadorSeleccionado.value:indicadorSuperiorAux.value,
                "categorias_idcategorias": categoriaAux.value===""?categoriaSeleccionada.value:categoriaAux.value
            }
        }else{
            aux = {
                "idindicadores": indicadorFinal,
                "nombre": nombre,
                "periodicidad": periodicidadSeleccionada.value,
                "tipo_valor": tipoSeleccionado.value,
                "nivel": nivelSeleccionado.value,
                "fuentes_idfuentes": fuenteSeleccionada.value,
                "unidades_medida_idunidades": unidadSeleccionada.value,
                "indicadores_idindicadores": indicadorSuperiorAux.value===""?indicadorSeleccionado.value:indicadorSuperiorAux.value,
                "categorias_idcategorias": categoriaAux.value===""?categoriaSeleccionada.value:categoriaAux.value
            }
        }
        
        if(aux.nombre.trim() === ""){
            setMessageSnackbar("El nombre no es valido.");
            setOpenSnackbar(true);
        }else{
            console.log(aux);
            postData('/indicador/create.php',aux).then(data => {
                if(data){
                    console.log(data.message!==undefined?data.message:"Error");
                    try {
                        setMessageSnackbar(data.message!==undefined?data.message:"Error");
                        setOpenSnackbar(true);
                    } catch (error) {
                        setMessageSnackbar("Error");
                        setOpenSnackbar(true);
                    }
                    setOrder('');
                }
            });
        }
    }
    
    return(
        <div style={{minWidth:'15em', width:'50em', margin:'2em 1em 0em 1em', textAlign:'left'}}>
            {/* {categoriaSeleccionada.value}
            {nivelSeleccionado.value} */}
            <TextField onChange={(event)=>{setNombre(event.target.value)}}/* value={values.newPass} onChange={handleChange('newPass')} */ type="text" fullWidth id="indicador" label="Nombre" />
            <div style={{margin:'1em 0em 1em 0em'}}>
                <div>Nivel</div>
                <Select options={
                    orden==="superior"?
                    niveles.filter((currentValue,i,array) => { return i !== array.length-1 })
                    :
                    niveles
                }
                        /* defaultValue={niveles[0]} */
                        value={nivelSeleccionado}
                        isSearchable={false}
                        onChange={handleChangeNivel}
                        name="nivel"
                        placeholder="Selecciona el nivel"
                />
            </div>
            {
                nivelSeleccionado!==null && nivelSeleccionado.value ==="0" ?
                <div style={{margin:'1em 0em 1em 0em'}}>
                    <div>Categoría</div>
                    <Select options={categorias}
                            isSearchable={true}
                            value={categoriaSeleccionada}
                            /* defaultValue={categorias[0]} */
                            onChange={handleChangeCategoria}
                            name="categoria"
                            placeholder="Selecciona la categoría"
                    />
                </div>
                :
                null
            }
            
            {
                nivelSeleccionado!==null && nivelSeleccionado.value !=="0" ?
                <div style={{margin:'1em 0em 1em 0em'}}>
                    <div>Indicador de orden superior</div>
                    <Select options={indicadorFiltrado}
                            value={indicadorSeleccionado}
                            isSearchable={true}
                            /* defaultValue={indicadores[0]} */
                            onChange={handleChangeIndicador}
                            name="indicadorSuperior"
                            placeholder="Selecciona el indicador"
                    />
                </div>
                :
                null
            }

            {
                (indicadorSeleccionado != null || categoriaSeleccionada!= null) && orden!=="superior" ?
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
                fuenteSeleccionada != null ?
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
                periodicidadSeleccionada != null ?
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
                tipoSeleccionado != null ?
                <div style={{margin:'1em 0em 1em 0em'}}>
                    <div>Unidad de medida</div>
                    <Select options={unidades}
                            value={unidadSeleccionada}
                            isSearchable={false}
                            onChange={handleChangeUnidad}
                            name="unidades_medida"
                            placeholder="Selecciona la unidad de medida"
                    />
                </div>
                :
                null
            }

            <div style={{display:'flex', justifyContent:'center', margin:'2em 0 0 0'}}>
                <Button color="default" variant="contained" onClick={()=>{setOrder('')}}>Cancelar</Button>
                {
                ((categoriaSeleccionada || indicadorSeleccionado) && orden==="superior") || (fuenteSeleccionada && periodicidadSeleccionada && tipoSeleccionado && unidadSeleccionada)?
                <Button onClick={()=>{CrearIndicador()}} color="secondary" style={{marginLeft:'0.5em',background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained">Crear indicador</Button>  
                :
                null
                }
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
                        <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{setOpenSnackbar(false)}}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                        </React.Fragment>
                    }
                />
        </div>
    );
}

const CrearIndicador = ({orden,setOrder,indicadores,fuentes,periodicidades,categorias,niveles,tipos,unidades}) => {
    
    return(
        <div style={{display:'flex', justifyContent:'center'}}>
            {
                orden === ""?
                null
                :
                <FormularioIndicadorOrdenSuperior orden={orden}  indicadores={indicadores} setOrder={setOrder} niveles={niveles} categorias={categorias} fuentes={fuentes} periodicidades={periodicidades} tipos={tipos} unidades={unidades}/>
            }
        </div>
    );
}

export default CrearIndicador;