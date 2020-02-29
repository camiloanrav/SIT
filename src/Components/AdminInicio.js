import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '../Components/Accordion';



const AdminInicio = ({setTitulo}) => {
    const [section, setSection] = useState(false);
    const [id, setID] = useState(4);
    const [dimensions, setDimensions] = useState([]);
    const [map, setMap] = useState([]);
    setTitulo("Administrador / Inicio");

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        getDimensiones();
        getMap();
    });

    const getDimensiones = () =>{
        axios.get(`http://192.168.43.241/serpacificows/dimension/all.php`)
        .then(res => {
            /* setDimensions(renderDimensions(res.data)); */
            setDimensions(res.data);
        })
    }

    const getMap = () => {
        axios.get(`http://192.168.43.241/serpacificows/dimension/all.php`)
        .then(res => {
            /* setMap(RenderMap(res.data)); */
            setMap(res.data);
        })
    }

    /* function renderDimensions (data) {   

        return data.map(dimension => {
            const {iddimensiones, nombre, descripcion, rutaimagen} = dimension;

            return (
                <div key={iddimensiones} style={{backgroundColor:'#f4f4f4', borderRadius:'0.2em', minWidth:'15em', maxWidth:'38em', fontFamily:'roboto', boxShadow:'2px 2px 5px 1px rgba(0,0,0,0.3)', margin:'1.5em'}}>
                    <div style={{background:'linear-gradient(to right, rgba(70,70,70,1) 0%, rgba(0,0,0,1) 100%)', borderRadius:'0.2em 0.2em 0em 0em', padding:'0.5em'}}>
                        <p style={{ minHeight:'1.8em', lineHeight: '1.8em', color:'white', textAlign:'center', fontFamily:'roboto', fontSize:'1em'}}> 
                            {nombre}
                        </p>
                    </div>
                    
                    <div style={{padding:'1em 1em 1em 1em'}}>
                        <p style={{fontFamily:'roboto', textAlign:'left'}}>
                            {descripcion}
                        </p>
                    </div>
                    <div style={{position:'relative' , paddingBottom:'1em', paddingRight:'1em', textAlign:'right'}}>
                        <button style={{position:'relative', right:'1px', bottom:'1px'}} onClick={()=>handleSubmit(value, iddimensiones)} className="button-card-uao">
                            Editar
                            <i class="fas fa-chevron-right" style={{marginLeft:'1em'}}></i>
                        </button>
                    </div>
                </div>                  
            );
        });
    }

    function RenderMap(data){
        return data.map(dimension => {
            const {iddepartamento, nombre, capital, extension, poblacion, participacionPIB} = dimension;

            return (
                <div key={iddepartamento} style={{backgroundColor:'#f4f4f4', borderRadius:'0.2em', minWidth:'15em', maxWidth:'38em', fontFamily:'roboto', boxShadow:'2px 2px 5px 1px rgba(0,0,0,0.3)', margin:'1.5em'}}>
                    <div style={{background:'linear-gradient(to right, rgba(70,70,70,1) 0%, rgba(0,0,0,1) 100%)', borderRadius:'0.2em 0.2em 0em 0em', padding:'0.5em'}}>
                        <p style={{ minHeight:'1.8em', lineHeight: '1.8em', color:'white', textAlign:'center', fontFamily:'roboto', fontSize:'1em'}}> 
                            {nombre}
                        </p>
                    </div>
                    
                    <div style={{padding:'1em 1em 1em 1em'}}>
                        <p style={{fontFamily:'roboto', textAlign:'left'}}>
                            <ul>
                                <li>{capital}</li>
                                <li>{extension}</li>
                                <li>{poblacion}</li>
                                <li>{participacionPIB}</li>
                            </ul>
                        </p>
                    </div>
                    <div style={{position:'relative' , paddingBottom:'1em', paddingRight:'1em', textAlign:'right'}}>
                        <button style={{position:'relative', right:'1px', bottom:'1px'}} onClick={()=>handleSubmit(value, iddepartamento)} className="button-card-uao">
                            Editar
                            <i class="fas fa-chevron-right" style={{marginLeft:'1em'}}></i>
                        </button>
                    </div>
                </div>
            );
        });
    }

    function Show(){
        setSection(!section);
    } */

    return (
        <div >
            {/* <div style={{marginTop:'1em', textAlign:'center'}}>
                <h3>Dimensiones</h3>
            </div>
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                {dimensions}
            </div>
            <div style={{marginTop:'1em', textAlign:'center'}}>
                <h3>Mapa</h3>
            </div>
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                {map}
            </div> */}
            <Accordion>

            </Accordion>
            
            
            {/* <div class="pagination">
                <a href="#" class="prev ">
                    <span class="icon icon-angle-left"></span>
                    <span class="text">Anterior</span>
                </a>

                <ul class="pg-mobile">
                    <li><a href="#">1</a></li>
                    <li><a class="active" href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">...</a></li>
                    <li><a href="#">9</a></li>
                </ul>

                <div class="pg-desktop">
                    <span class="active">Página 2</span>
                    <span class="total">de 9</span>
                </div>

                <a href="#" class="next ">
                    <span class="text">Siguiente</span>
                    <span class="icon icon-angle-right"></span>
                </a>
            </div> */}
        </div>
    );
};

export default AdminInicio;