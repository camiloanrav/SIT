import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from "react-select";
import Button from '@material-ui/core/Button';

const FormularioIndicadorOrdenSuperior = ({indicador, indicadores, handleChange, niveles, categorias, setOrder}) => {
    const [nivelSeleccionado, setNivelSeleccionado] = useState(false);

    function reiniciarIndicador () {
        handleChange({value:''},{name:"idindicador"});
        handleChange({value:''},{name:"nombre"});
        handleChange({value:'null'},{name:"periodicidad"});
        handleChange({value:'null'},{name:"tipo_valor"});
        handleChange({value:'0'},{name:"nivel"});
        handleChange({value:''},{name:"fuentes_idfuentes"});
        handleChange({value:''},{name:"unidades_medida"});
        handleChange({value:''},{name:"indicadorSuperior"});
        handleChange({value:''},{name:"categoria"});
    }

    const CrearIndicador = () => {
        reiniciarIndicador();
        let indicadoresDeLaCategoria = [];
        let indicadoresDeLaCategoriaSubst = [];
        let ultimoIndicador = 0;
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
                return i.value.substring(0,7) === indicador.indicadorSuperior  && i.nivel === "1";
            });

            console.log(indicadoresDeLaCategoria);
            indicadoresDeLaCategoria.forEach(i => {
                indicadoresDeLaCategoriaSubst.push(parseInt(i.value.substring(7, i.length)));
            });
            console.log(indicadoresDeLaCategoriaSubst);
        }
        
        if(indicadoresDeLaCategoriaSubst.length !== 0){
            ultimoIndicador = Math.max(...indicadoresDeLaCategoriaSubst) + 1;

            if(ultimoIndicador > 9){
                indicadorFinal = ultimoIndicador.toString();
            }else{
                indicadorFinal = "0" + ultimoIndicador;
            }

            if(indicador.nivel === "0"){
                indicadorFinal = indicador.categoria + indicadorFinal;
            }else{
                indicadorFinal = indicador.indicadorSuperior + indicadorFinal;
            }
        }else{
            indicadorFinal = indicador.indicadorSuperior + "01";
        }
        //indi
        handleChange({value:indicadorFinal},{name:"idindicador"});
        console.log({id:indicadorFinal,nombre:indicador.nombre,categoria:indicador.categoria,indicadorSuperior:indicador.indicadorSuperior});
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
                        onChange={(e,name)=>{setNivelSeleccionado(true); handleChange(e,{name:'nivel'})}}
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
                            /* defaultValue={categorias[0]} */
                            onChange={handleChange}
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
                    <Select options={
                                indicador.nivel==="1"?indicadores.filter((currentValue,i,array) => { return currentValue.nivel ==="0" && currentValue.unidad==="0"}):null
                            }
                            isSearchable={false}
                            /* defaultValue={indicadores[0]} */
                            onChange={handleChange}
                            name="indicadorSuperior"
                            placeholder="Selecciona el indicador"
                    />
                </div>
                :
                null
            }
            <div style={{display:'flex', justifyContent:'center', margin:'2em 0 0 0'}}>
                <Button color="default" variant="contained" onClick={()=>{setOrder('')}}>Cancelar</Button>
                <Button onClick={()=>{CrearIndicador()}} color="secondary" style={{marginLeft:'0.5em',background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained">Crear indicador</Button>  
            </div>
        </div>
    );
}

const FormularioIndicadorOrdenInferior = ({indicador, handleChange, niveles, categorias, periodicidades, tipos}) => {
    return(
        <div>
            Indicador Orden Inferior
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
                orden === "inferior"?<FormularioIndicadorOrdenInferior indicador={indicador} handleChange={handleChange} setOrder={setOrder}/>:null
            }
        </div>
    );
}

export default CrearIndicador;