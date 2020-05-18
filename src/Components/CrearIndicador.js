import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from "react-select";
import Button from '@material-ui/core/Button';

import {postData} from '../utils/api';

const FormularioIndicadorOrdenSuperior = ({indicador, indicadores, handleChange, niveles, categorias, setOrder}) => {
    const [nivelSeleccionado, setNivelSeleccionado] = useState(false);
    const [indicadorFiltrado, setIndicadorFiltrado] = useState([]);
    const [indicadorSeleccionado, setIndicadorSeleccionado] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    const [indicadorFinal, setIndicadorFinal] = useState(null);

    useEffect(()=>{
        handleChange({value:''},{name:"indicadorSuperior"});
        handleChange({value:''},{name:"categoria"});
        handleChange({value:''},{name:"idindicador"});
        setIndicadorSeleccionado(null);
        setCategoriaSeleccionada(null);

        if(indicador.nivel==="1"){
            setIndicadorFiltrado(indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="0" && currentValue.unidad==="0"}));
        }else if(indicador.nivel==="2"){
            setIndicadorFiltrado(indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="1" && currentValue.unidad==="0"}));
        }else if(indicador.nivel==="3"){
            setIndicadorFiltrado(indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="2" && currentValue.unidad==="0"}));
        }
    }, [indicador.nivel]);

    useEffect(()=>{
        handleChange({value:''},{name:"idindicador"});
        handleChange({value:''},{name:"nombre"});
        handleChange({value:'null'},{name:"periodicidad"});
        handleChange({value:'null'},{name:"tipo_valor"});
        handleChange({value:'0'},{name:"nivel"});
        handleChange({value:'0'},{name:"fuentes_idfuentes"});
        handleChange({value:'0'},{name:"unidades_medida"});
        handleChange({value:''},{name:"indicadorSuperior"});
        handleChange({value:''},{name:"categoria"});
    },[]);

    const handleChangeNivel = (valor,e) => {
        console.log(valor);
        setNivelSeleccionado(valor);
    }

    const handleChangeIndicador = (valor,e) => {
        handleChange(valor,e);
        console.log(valor);
        setIndicadorSeleccionado(valor);
    }

    const handleChangeCategoria = (valor,e) => {
        handleChange(valor,e);
        console.log(valor);
        setCategoriaSeleccionada(valor);
    }

    const CrearIndicador = () => {
        handleChange({value:'null'},{name:"periodicidad"});
        handleChange({value:'null'},{name:"tipo_valor"});
        handleChange({value:'0'},{name:"fuentes_idfuentes"});
        handleChange({value:'0'},{name:"unidades_medida"});

        handleChange({value:''},{name:"idindicador"});
        
        let indicadoresDeLaCategoria = [];
        let indicadoresDeLaCategoriaSubst = [];
        let ultimoIndicador = 0;
        let indicadorFinalAux = '';

        if(indicador.nivel === "0"){
            indicadoresDeLaCategoria = indicadores.filter((i) => {
                return i.value.substring(0,5) === indicador.categoria && i.value.length === 7;
            });
            indicadoresDeLaCategoria.forEach(i => {
                indicadoresDeLaCategoriaSubst.push(parseInt(i.value.substring(5, i.length)));
            });
        }else if(indicador.nivel === "1"){
            console.log("Nivel 1");
            console.log(indicadores);
            
            indicadoresDeLaCategoria = indicadores.filter(i => {
                return i.value.substring(0,7) === indicador.indicadorSuperior  && i.nivel === indicador.nivel;
            });

            console.log(indicadoresDeLaCategoria);
            indicadoresDeLaCategoria.forEach(i => {
                indicadoresDeLaCategoriaSubst.push(parseInt(i.value.substring(7, i.length)));
            });
            console.log(indicadoresDeLaCategoriaSubst);
        }else if(indicador.nivel === "2"){
            console.log("Nivel 2");
            console.log(indicadores);
            
            indicadoresDeLaCategoria = indicadores.filter(i => {
                return i.value.substring(0,9) === indicador.indicadorSuperior  && i.nivel === indicador.nivel;
            });

            console.log(indicadoresDeLaCategoria);
            indicadoresDeLaCategoria.forEach(i => {
                indicadoresDeLaCategoriaSubst.push(parseInt(i.value.substring(9, i.length)));
            });
            console.log(indicadoresDeLaCategoriaSubst);
        }else if(indicador.nivel === "3"){
            console.log("Nivel 3");
            console.log(indicadores);
            
            indicadoresDeLaCategoria = indicadores.filter(i => {
                return i.value.substring(0,11) === indicador.indicadorSuperior  && i.nivel === indicador.nivel;
            });

            console.log(indicadoresDeLaCategoria);
            indicadoresDeLaCategoria.forEach(i => {
                indicadoresDeLaCategoriaSubst.push(parseInt(i.value.substring(11, i.length)));
            });
            console.log(indicadoresDeLaCategoriaSubst);
        }
        
        if(indicadoresDeLaCategoriaSubst.length !== 0){
            ultimoIndicador = Math.max(...indicadoresDeLaCategoriaSubst) + 1;

            if(ultimoIndicador > 9){
                indicadorFinalAux = ultimoIndicador.toString();
            }else{
                indicadorFinalAux = "0" + ultimoIndicador;
            }

            if(indicador.nivel === "0"){
                indicadorFinalAux = indicador.categoria + indicadorFinalAux;
                handleChange({value:'0'},{name:"indicadorSuperior"});
            }else{
                indicadorFinalAux = indicador.indicadorSuperior + indicadorFinalAux;
                handleChange({value:indicadorFinalAux.substr(0,5)},{name:"categoria"});
            }
        }else{
            indicadorFinalAux = indicador.indicadorSuperior + "01";
        }
        //indi
        console.log(indicadorFinalAux);
        handleChange({value:indicadorFinalAux},{name:"idindicador"});
        console.log(indicador);
        Crear(indicador);
    }

    const Crear = (i) => {
        if(i.nombre.trim() === ""){
            alert("El nombre no es valido");
        }else{
            console.log(i);
            
            /* postData('/indicador/create.php',i).then(data => {
                console.log(data.message);
                alert("Creado");
            }); */
        }
    }
    
    return(
        <div style={{minWidth:'15em', width:'50em', margin:'2em 1em 0em 1em', textAlign:'left'}}>
            {/* {indicador.categoria}
            {indicador.nivel} */}
            <TextField onChange={handleChange}/* value={values.newPass} onChange={handleChange('newPass')} */ type="text" fullWidth id="indicador" label="Nombre" />
            <div style={{margin:'1em 0em 1em 0em'}}>
                <div>Nivel</div>
                <Select options={niveles.filter((currentValue,i,array) => { return i !== array.length-1 })}
                        /* defaultValue={niveles[0]} */
                        isSearchable={false}
                        onChange={(e,name)=>{setNivelSeleccionado(true); handleChange(e,{name:'nivel'});}}
                        name="nivel"
                        placeholder="Selecciona el nivel"
                />
            </div>
            {
                indicador.nivel==="0" && nivelSeleccionado ?
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
                indicador.nivel!=="0" && nivelSeleccionado ?
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
                categoriaSeleccionada || indicadorSeleccionado?
                <div style={{display:'flex', justifyContent:'center', margin:'2em 0 0 0'}}>
                    <Button color="default" variant="contained" onClick={()=>{setOrder('')}}>Cancelar</Button>
                    <Button onClick={()=>{CrearIndicador()}} color="secondary" style={{marginLeft:'0.5em',background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained">Crear indicador</Button>  
                </div>
                :
                null
            }
        </div>
    );
}



const FormularioIndicadorOrdenInferior = ({indicador, indicadores, handleChange, niveles, categorias, setOrder, fuentes, periodicidades, tipos, unidades}) => {
    const [nivelSeleccionado, setNivelSeleccionado] = useState(false);
    const [indicadorFiltrado, setIndicadorFiltrado] = useState([]);
    const [indicadorSeleccionado, setIndicadorSeleccionado] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [fuenteSeleccionada, setFuenteSeleccionada] = useState(null);
    const [periodicidadSeleccionada, setPeriodicidadSeleccionada] = useState(null);
    const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
    const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
    const [acciones, setAcciones] = useState(false);

    useEffect(()=>{
        handleChange({value:''},{name:"indicadorSuperior"});
        handleChange({value:''},{name:"categoria"});
        handleChange({value:''},{name:"idindicador"});
        handleChange({value:''},{name:"fuentes_idfuentes"});
        handleChange({value:''},{name:"periodicidad"});
        handleChange({value:''},{name:"tipo_valor"});
        handleChange({value:''},{name:"unidades_medida"});
        setIndicadorSeleccionado(null);
        setCategoriaSeleccionada(null);
        setFuenteSeleccionada(null);
        setPeriodicidadSeleccionada(null);
        setTipoSeleccionado(null);
        setUnidadSeleccionada(null);

        if(indicador.nivel==="1"){
            setIndicadorFiltrado(indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="0" && currentValue.unidad==="0"}));
        }else if(indicador.nivel==="2"){
            setIndicadorFiltrado(indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="1" && currentValue.unidad==="0"}));
        }else if(indicador.nivel==="3"){
            setIndicadorFiltrado(indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="2" && currentValue.unidad==="0"}));
        }else if(indicador.nivel==="4"){
            setIndicadorFiltrado(indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="3" && currentValue.unidad==="0"}));
        }
    }, [indicador.nivel]);

    useEffect(()=>{
        if(indicadorSeleccionado!=null){
            setAcciones(true);
        }else{
            setAcciones(false);
        }
        setFuenteSeleccionada(null);
    },[indicadorSeleccionado])

    useEffect(()=>{
        if(categoriaSeleccionada!=null){
            setAcciones(true);
        }else{
            setAcciones(false);
        }
        setFuenteSeleccionada(null);
    },[categoriaSeleccionada])

    useEffect(()=>{
        setPeriodicidadSeleccionada(null);
    },[fuenteSeleccionada]);

    useEffect(()=>{
        setTipoSeleccionado(null);
    },[periodicidadSeleccionada]);

    useEffect(()=>{
        setUnidadSeleccionada(null);
    },[tipoSeleccionado]);

    useEffect(()=>{
        handleChange({value:''},{name:"idindicador"});
        handleChange({value:''},{name:"nombre"});
        handleChange({value:''},{name:"periodicidad"});
        handleChange({value:''},{name:"tipo_valor"});
        handleChange({value:''},{name:"nivel"});
        handleChange({value:''},{name:"fuentes_idfuentes"});
        handleChange({value:''},{name:"unidades_medida"});
        handleChange({value:''},{name:"indicadorSuperior"});
        handleChange({value:''},{name:"categoria"});
    },[]);

    const handleChangeIndicador = (valor,e) => {
        handleChange(valor,e);
        console.log(valor);
        setIndicadorSeleccionado(valor);
    }

    const handleChangeCategoria = (valor,e) => {
        handleChange(valor,e);
        console.log(valor);
        setCategoriaSeleccionada(valor);
    }

    const handleChangeFuente = (valor,e) => {
        handleChange(valor,e);
        console.log(valor);
        setFuenteSeleccionada(valor);
    }

    const handleChangePeriodicidad = (valor,e) => {
        handleChange(valor,e);
        console.log(valor);
        setPeriodicidadSeleccionada(valor);
    }

    const handleChangeTipo = (valor,e) => {
        handleChange(valor,e);
        console.log(valor);
        setTipoSeleccionado(valor);
    }

    const handleChangeUnidad = (valor,e) => {
        handleChange(valor,e);
        console.log(valor);
        setUnidadSeleccionada(valor);
    }

    const CrearIndicador = () => {
        handleChange({value:''},{name:"idindicador"});
        let indicadoresDeLaCategoria = [];
        let indicadoresDeLaCategoriaSubst = [];
        let indicadorMaximo = 0;
        let indicadorFinal = '';

        if(indicador.nivel === "0"){
            indicadoresDeLaCategoria = indicadores.filter((i) => {
                return i.value.substring(0,5) === indicador.categoria && i.value.length === 7;
            });
            indicadoresDeLaCategoria.forEach(i => {
                indicadoresDeLaCategoriaSubst.push(parseInt(i.value.substring(5, i.length)));
            });
        }else if(indicador.nivel === "1"){
            console.log("Nivel 1");
            console.log(indicadores);
            
            indicadoresDeLaCategoria = indicadores.filter(i => {
                return i.value.substring(0,7) === indicador.indicadorSuperior  && i.nivel === indicador.nivel;
            });

            console.log(indicadoresDeLaCategoria);
            indicadoresDeLaCategoria.forEach(i => {
                indicadoresDeLaCategoriaSubst.push(parseInt(i.value.substring(7, i.length)));
            });
            console.log(indicadoresDeLaCategoriaSubst);
        }else if(indicador.nivel === "2"){
            console.log("Nivel 2");
            console.log(indicadores);
            
            indicadoresDeLaCategoria = indicadores.filter(i => {
                return i.value.substring(0,9) === indicador.indicadorSuperior  && i.nivel === indicador.nivel;
            });

            console.log(indicadoresDeLaCategoria);
            indicadoresDeLaCategoria.forEach(i => {
                indicadoresDeLaCategoriaSubst.push(parseInt(i.value.substring(9, i.length)));
            });
            console.log(indicadoresDeLaCategoriaSubst);
        }else if(indicador.nivel === "3"){
            console.log("Nivel 3");
            console.log(indicadores);
            
            indicadoresDeLaCategoria = indicadores.filter(i => {
                return i.value.substring(0,11) === indicador.indicadorSuperior  && i.nivel === indicador.nivel;
            });

            console.log(indicadoresDeLaCategoria);
            indicadoresDeLaCategoria.forEach(i => {
                indicadoresDeLaCategoriaSubst.push(parseInt(i.value.substring(11, i.length)));
            });
            console.log(indicadoresDeLaCategoriaSubst);
        }else if(indicador.nivel === "4"){
            console.log("Nivel 4");
            console.log(indicadores);
            
            indicadoresDeLaCategoria = indicadores.filter(i => {
                return i.value.substring(0,13) === indicador.indicadorSuperior  && i.nivel === indicador.nivel;
            });

            console.log(indicadoresDeLaCategoria);
            indicadoresDeLaCategoria.forEach(i => {
                indicadoresDeLaCategoriaSubst.push(parseInt(i.value.substring(13, i.length)));
            });
            console.log(indicadoresDeLaCategoriaSubst);
        }
        
        if(indicadoresDeLaCategoriaSubst.length !== 0){
            indicadorMaximo = Math.max(...indicadoresDeLaCategoriaSubst) + 1;

            if(indicadorMaximo > 9){
                indicadorFinal = indicadorMaximo.toString();
            }else{
                if(indicador.nivel !== "4"){
                    indicadorFinal = "0" + indicadorMaximo;
                }else{
                    indicadorFinal = indicadorMaximo.toString();
                }
            }

            if(indicador.nivel === "0"){
                indicadorFinal = indicador.categoria + indicadorFinal;
                handleChange({value:'0'},{name:"indicadorSuperior"});
            }else{
                indicadorFinal = indicador.indicadorSuperior + indicadorFinal;
                handleChange({value:indicadorFinal.substr(0,5)},{name:"categoria"});
            }
        }else{
            if(indicador.nivel !== "4"){
                indicadorFinal = indicador.indicadorSuperior + "01";
            }else{
                indicadorFinal = indicador.indicadorSuperior + "1";
            }
            handleChange({value:indicadorFinal.substr(0,5)},{name:"categoria"});
        }
        //indi
        console.log(indicadorFinal);
        handleChange({value:indicadorFinal},{name:"idindicador"});
        console.log(indicador);
        Crear(indicador);
    }

    const Crear = (i) => {
        if(i.nombre.trim() === ""){
            alert("El nombre no es valido");
        }else{
            console.log(i);
            
            /* postData('/indicador/create.php',i).then(data => {
                console.log(data.message);
                alert("Creado");
            }); */
        }
    }
    
    return(
        <div style={{minWidth:'15em', width:'50em', margin:'2em 1em 0em 1em', textAlign:'left'}}>
            <TextField onChange={handleChange}/* value={values.newPass} onChange={handleChange('newPass')} */ type="text" fullWidth id="indicador" label="Nombre" />
            <div style={{margin:'1em 0em 1em 0em'}}>
                <div>Nivel</div>
                <Select options={niveles}
                        /* defaultValue={niveles[0]} */
                        isSearchable={false}
                        onChange={(e,name)=>{setNivelSeleccionado(true); handleChange(e,{name:'nivel'});}}
                        name="nivel"
                        placeholder="Selecciona el nivel"
                />
            </div>
            {
                indicador.nivel==="0" && nivelSeleccionado ?
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
                indicador.nivel!=="0" && nivelSeleccionado ?
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
                indicadorSeleccionado != null || categoriaSeleccionada!= null ?
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

            {
                acciones && fuenteSeleccionada && periodicidadSeleccionada && tipoSeleccionado && unidadSeleccionada ?
                <div style={{display:'flex', justifyContent:'center', margin:'2em 0 0 0'}}>
                    <Button color="default" variant="contained" onClick={()=>{setOrder('')}}>Cancelar</Button>
                    <Button onClick={()=>{CrearIndicador()}} color="secondary" style={{marginLeft:'0.5em',background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained">Crear indicador</Button>  
                </div>
                :
                null
            }
        </div>
    );
}

const CrearIndicador = ({indicador,handleChange,orden,setOrder,indicadores,fuentes,periodicidades,categorias,niveles,tipos,unidades}) => {
    
    return(
        <div style={{display:'flex', justifyContent:'center'}}>
            {
                orden === "superior"?<FormularioIndicadorOrdenSuperior indicador={indicador} indicadores={indicadores} handleChange={handleChange} setOrder={setOrder} niveles={niveles} categorias={categorias}/>:null
            }
            {
                orden === "inferior"?<FormularioIndicadorOrdenInferior indicador={indicador} indicadores={indicadores} handleChange={handleChange} setOrder={setOrder} niveles={niveles} categorias={categorias} fuentes={fuentes} periodicidades={periodicidades} tipos={tipos} unidades={unidades}/>:null
            }
        </div>
    );
}

export default CrearIndicador;