import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from "react-select";
import Button from '@material-ui/core/Button';

const FormularioIndicadorOrdenSuperior = ({indicador, indicadores, handleChange, niveles, categorias, setOrder}) => {
    const CrearIndicador = () => {
        /* indicadores
        indicador.categoria */
        console.log("1");
        
        let indicadoresDeLaCategoria = indicadores.filter((index) => {
            console.log(/* index.value.substring(0,5) + " - " +  */indicador);
            
            return index.value.substring(0,5) === indicador.categoria;
        });
        console.log(indicadoresDeLaCategoria);
        indicadoresDeLaCategoria.forEach(i => {
            let j = i.value.substring(5, i.length);
            console.log(j);
        });
    }
    return(
        <div style={{minWidth:'15em', width:'50em', margin:'2em 1em 0em 1em', textAlign:'left'}}>
            <TextField onChange={handleChange}/* value={values.newPass} onChange={handleChange('newPass')} */ type="text" fullWidth id="indicador" label="Nombre" />
            <div style={{margin:'1em 0em 1em 0em'}}>
                <div>Nivel</div>
                <Select options={niveles}
                        defaultValue={niveles[0]}
                        isSearchable={false}
                        onChange={handleChange}
                        name="nivel"
                />
            </div>
            <div style={{margin:'1em 0em 1em 0em'}}>
                <div>Categoría</div>
                <Select options={categorias} 
                        isSearchable={true}
                        defaultValue={categorias[0]}
                        onChange={handleChange}
                        name="categoria"
                />
            </div>
            {
                indicador.nivel===0 || indicador.nivel===''?
                null
                :
                <div style={{margin:'1em 0em 1em 0em'}}>
                    <div>Indicador de orden superior</div>
                    <Select options={niveles}
                            isSearchable={false}
                            defaultValue={niveles[0]}
                            onChange={handleChange}
                            name="indicadorSuperior"
                    />
                </div>
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

    /* useEffect(()=>{
        handleChange({value:categorias[0]},{name:"categoria"});
        handleChange({value:niveles[0]},{name:"nivel"});
    },[categorias,niveles]); */

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