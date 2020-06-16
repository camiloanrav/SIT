import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Footer from "../Components/Footer";
import NavBarDesktop from "../Components/NavBarDesktop";
import NavBarMovil from "../Components/NavBarMovil";
import Excel from "../Components/Excel";

import Select from "react-select";

import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";


var optionsDims = [];
var optionsCats = [];
var optionsSubcats = [];
var optionsIndicas = [];
var optionsSubniv1 = [];
var optionsSubniv2 = [];
var optionsSubniv3 = [];
var optionsSubniv4 = [];
var optionsTerris = [];
var optionsPeriodo = [];
var arrEjes = ['January'];
var arrDatos = [95];
var arrPrueba = ["Nada"];
var territorios = [];
var periodos = [];
var arrPeriodos = ['2010'];
var datosPruebas = [];
var promises = [];
var jsonFinal = {};
var acumulador = [];

var datos = {
    labels: arrEjes,
    datasets: [
        {      
            label: 'Rainfall',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: arrDatos
        }
    ]
}

var wepaje = {
    labels: arrEjes,
    datasets: [
        {             
            label: 'Rainfall',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: arrDatos
        }
    ]
}

var datosMultiples = {
    labels: arrEjes,
    datasets: arrPrueba
}

class EstadisticasContainer extends Component {


    // Declara una nueva variable de estado, la cual llamaremos “count”
    // const [gradient, setGradient] = useState("");
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            espera: true,
            descripcion: null,
            nombre: null,
            valor: null,
            dimensiones: [],
            selectedOption: null,
            selectedOption2: null,
            seleccionadoDimension: null,
            opcionesDimensiones: optionsDims,
            estadoCategorias: true,
            seleccionadoCategorias: null,
            opcionesCategorias: optionsCats,
            estadoSubcategorias: true,
            seleccionadoSubcategorias: null,
            opcionesSubcategorias: optionsSubcats,
            estadoIndicadores: true,
            seleccionadoIndicadores: null,
            opcionesIndicadores: optionsIndicas,
            estadoSubniv1: true,
            seleccionadoSubniv1: null,
            opcionesSubniv1: optionsSubniv1,
            estadoSubniv2: true,
            seleccionadoSubniv2: null,
            opcionesSubniv2: optionsSubniv2,
            estadoSubniv3: true,
            seleccionadoSubniv3: null,
            opcionesSubniv3: optionsSubniv3,
            estadoSubniv4: true,
            seleccionadoSubniv4: null,
            opcionesSubniv4: optionsSubniv4,
            estadoTerris: true,
            seleccionadoTerris: null,
            opcionesTerris: optionsTerris,
            estadoPeriodo: true,
            seleccionadoPeriodo: null,
            opcionesPeriodo: optionsPeriodo,
            idSeleccionada: null,
            indicadorSeleccionado: null,
            estadoGrafica: true,
            multiTerri: null,
            multiPeriodo: null,
            estadoBoton: true,
            pintar: null,
            informativo: "Una DIMENSIÓN es el componente macro en donde se agrupan las diferentes categorias.", 
            estadoInformativo: false,
            unidad: null,
            fuente: null,
            estadoLimpiar:true,
            estadoGraficaLinea:true,
            estadoFuente: true,
            estadoTextoNo: true
        };

        this.cambioDimensiones = seleccionadoDimension => {
            this.setState({
                seleccionadoDimension
            }, () => {
                console.log(`Dimension Seleccionada:`, this.state.seleccionadoDimension.value);
                this.cargarCats();
            });
        };

        this.cambioCategorias = seleccionadoCategorias => {
            this.setState({
                seleccionadoCategorias
            }, () => {
                console.log(`Categoria seleccionada:`, this.state.seleccionadoCategorias.value)
                this.cargarSubcats();
            });

        };

        this.cambioSubcategorias = seleccionadoSubcategorias => {
            this.setState({
                seleccionadoSubcategorias
            }, () => {
                console.log(`Subcategoria seleccionada:`, this.state.seleccionadoSubcategorias.value);
                this.cargarIndicas();
            });
        };

        this.cambioIndicadores = seleccionadoIndicadores => {
            this.setState({
                seleccionadoIndicadores
            }, () => {
                console.log(`Indicador seleccionado:`, this.state.seleccionadoIndicadores.value)
                this.cargarSubniv1();
            });
        };

        this.cambioSubniv1 = seleccionadoSubniv1 => {
            this.setState({
                seleccionadoSubniv1
            }, () => {
                console.log(`Subnivel 1 seleccionado:`, this.state.seleccionadoSubniv1.value);
                this.cargarSubniv2();
            });
        };

        this.cambioSubniv2 = seleccionadoSubniv2 => {
            this.setState({
                seleccionadoSubniv2
            }, () => {
                console.log(`Subnivel 2 seleccionado:`, this.state.seleccionadoSubniv2.value);
                this.cargarSubniv3();
            });
        };

        this.cambioSubniv3 = seleccionadoSubniv3 => {
            this.setState({
                seleccionadoSubniv3
            }, () => {
                console.log(`Subnivel 3 seleccionado:`, this.state.seleccionadoSubniv3.value);
                this.cargarSubniv4();
            });
        };

        this.cambioSubniv4 = seleccionadoSubniv4 => {
            this.setState({
                seleccionadoSubniv4
            }, () => {
                console.log(`Subnivel 4 seleccionado:`, this.state.seleccionadoSubniv4.value);
                this.acumularTerris();
            });
        };

        this.cambioTerris = seleccionadoTerris => {
            this.setState({
                seleccionadoTerris
            }, () => {
                console.log(`Territorio seleccionado:`, this.state.seleccionadoTerris.value);
                this.cargarPeriodo();
            });
        };

        this.cambioPeriodo = seleccionadoPeriodo => {
            this.setState({
                seleccionadoPeriodo
            }, () => {
                console.log(`Valor del periodo:`, this.state.seleccionadoPeriodo.value);
                this.pintarGrafico();
            });
        };

        this.acumularTerritorios = seleccionadoTerris => {
            this.setState({
                seleccionadoTerris
            }, () => {
                console.log(`Territorios acumulados:`, territorios);
                //this.acumularTerris();
                this.acumularTerris();
                this.cargarPeriodo();
            });
        };

        this.acumularPeriodos = seleccionadoPeriodo => {
            this.setState({
                seleccionadoPeriodo
            }, () => {
                console.log(`Periodos acumulados:`, periodos);
                this.acumularPeris();
                this.buscarUnidad();
                this.mostrarBoton();
            });
            //this.pintarGrafico();
        };

        this.showButton = estadoBoton => {
            this.setState({
                estadoBoton: false
            }, () => {
                console.log("Prueba");
                this.pintarGrafico();
            });
            //this.pintarGrafico();
        };

        this.cambiarGrafico = estadoBoton => {
            this.setState({
                estadoGrafica: true,
                estadoGraficaLinea: false
            }, () => {
                console.log("Cambiando Grafico");
                 });
       
        };

        this.cambiarGraficoBarras = estadoBoton => {
            this.setState({
                estadoGrafica: false,
                estadoGraficaLinea: true
            }, () => {
                console.log("Cambiando Grafico");
                 });
       
        };

        this.limpiar = estadoLimpiar => {
            this.setState({
                estadoLimpiar: true
            }, () => {              
                this.limpiarTodo();
            });
            //this.pintarGrafico();
        };

        this.graficar = multiTerri => {
            this.setState({
                estadoGrafica: false,
                estadoFuente: false
            }, () => {
                console.log("Final");
            });
        };

        this.cambioCategorias = this.cambioCategorias.bind(this);
        this.cambioSubcategorias = this.cambioSubcategorias.bind(this);
        this.cambioIndicadores = this.cambioIndicadores.bind(this);
        this.cambioSubniv1 = this.cambioSubniv1.bind(this);
        this.cambioSubniv2 = this.cambioSubniv2.bind(this);
        this.cambioSubniv3 = this.cambioSubniv3.bind(this);
        this.graficar = this.graficar.bind(this);

    }

    render() {
        const {
            espera,
            opcionesDimensiones,
            seleccionadoDimension,
            estadoCategorias,
            opcionesCategorias,
            seleccionadoCategorias,
            estadoSubcategorias,
            opcionesSubcategorias,
            seleccionadoSubcategorias,
            estadoIndicadores,
            opcionesIndicadores,
            seleccionadoIndicadores,
            estadoSubniv1,
            opcionesSubniv1,
            seleccionadoSubniv1,
            estadoSubniv2,
            opcionesSubniv2,
            seleccionadoSubniv2,
            estadoSubniv3,
            opcionesSubniv3,
            seleccionadoSubniv3,
            estadoSubniv4,
            opcionesSubniv4,
            seleccionadoSubniv4,
            estadoTerris,
            opcionesTerris,
            seleccionadoTerris,
            estadoPeriodo,
            opcionesPeriodo,
            seleccionadoPeriodo,
            idSeleccionada,
            indicadorSeleccionado,
            estadoGrafica,
            territorios,
            multiTerri,
            multiPeriodo,
            estadoBoton,
            pintar,
            informativo,
            estadoInformativo, 
            unidad,
            fuente,
            estadoLimpiar,
            estadoGraficaLinea,
            estadoFuente, 
            estadoTextoNo

        } = this.state;

        return (
            <div>
                <NavBarDesktop></NavBarDesktop>
                <NavBarMovil></NavBarMovil>
                <div style={{ display: "flex" , marginBottom:"20em "}}>

                    {/*-----------Dropdown de dimensiones------------*/}
                    <div style={{
                        border: "1px solid gray", padding: "2px", boxShadow: "2px 2px 5px 1px rgba(0,0,0,0.3)", width: "35em",
                        textAlign: "left", borderRadius: "5px", margin: "2em"
                    }}>
                        <div style={
                            {
                                width: "25em",
                                textAlign: "left",
                                margin: "2em"
                            }
                        }>
                            <Select value={seleccionadoDimension}
                                onChange={
                                    this.cambioDimensiones
                                }
                                options={opcionesDimensiones}
                                isSearchable={true}
                                placeholder={"Dimension"}
                                captureMenuScroll={true} />
                        </div>

                        {/*-----------Dropdown de categorias------------*/}
                        <div style={
                            {
                                width: "25em",
                                textAlign: "left",
                                margin: "2em"
                            }
                        }> {estadoCategorias ? '' :
                            <Select value={seleccionadoCategorias}
                                onChange={
                                    this.cambioCategorias
                                }
                                options={opcionesCategorias}
                                isSearchable={true}
                                placeholder={"Categoria"}
                                captureMenuScroll={true} />}
                        </div>
                        {/*-----------Dropdown de subcategorias------------*/}
                        <div style={
                            {
                                width: "25em",
                                textAlign: "left",
                                margin: "2em"
                            }
                        }> {estadoSubcategorias ? '' :
                            <Select value={seleccionadoSubcategorias}
                                onChange={
                                    this.cambioSubcategorias
                                }
                                options={opcionesSubcategorias}
                                isSearchable={true}
                                placeholder={"Subcategoria"}
                                captureMenuScroll={true} />}
                        </div>

                        {/*-----------Dropdown de indicadores------------*/}
                        <div style={
                            {
                                width: "25em",
                                textAlign: "left",
                                margin: "2em"
                            }
                        }> {estadoIndicadores ? '' :
                            <Select value={seleccionadoIndicadores}
                                onChange={
                                    this.cambioIndicadores
                                }
                                options={opcionesIndicadores}
                                isSearchable={true}
                                placeholder={"Indicador"}
                                captureMenuScroll={true} />}
                        </div>

                        {/*-----------Dropdown de indicadores nivel 1------------*/}
                        <div style={
                            {
                                width: "25em",
                                textAlign: "left",
                                margin: "2em"
                            }
                        }> {estadoSubniv1 ? '' :
                            <Select value={seleccionadoSubniv1}
                                onChange={
                                    this.cambioSubniv1
                                }
                                options={opcionesSubniv1}
                                isSearchable={true}
                                placeholder={"Indicador primer nivel"}
                                captureMenuScroll={true} />}
                        </div>

                        {/*-----------Dropdown de indicadores nivel 2------------*/}
                        <div style={
                            {
                                width: "25em",
                                textAlign: "left",
                                margin: "2em"
                            }
                        }> {estadoSubniv2 ? '' :
                            <Select value={seleccionadoSubniv2}
                                onChange={
                                    this.cambioSubniv2
                                }
                                options={opcionesSubniv2}
                                isSearchable={true}
                                placeholder={"Indicador segundo nivel"}
                                captureMenuScroll={true} />}
                        </div>
                        {/*-----------Dropdown de indicadores nivel 3------------*/}
                        <div style={
                            {
                                width: "25em",
                                textAlign: "left",
                                margin: "2em"
                            }
                        }> {estadoSubniv3 ? '' :
                            <Select value={seleccionadoSubniv3}
                                onChange={
                                    this.cambioSubniv3
                                }
                                options={opcionesSubniv3}
                                isSearchable={true}
                                placeholder={"Indicador tercer nivel"}
                                captureMenuScroll={true} />}
                        </div>

                        {/*-----------Dropdown de indicadores nivel 4------------*/}
                        <div style={
                            {
                                width: "25em",
                                textAlign: "left",
                                margin: "2em"
                            }
                        }> {estadoSubniv4 ? '' :
                            <Select value={seleccionadoSubniv4}
                                onChange={
                                    this.cambioSubniv4
                                }
                                options={opcionesSubniv4}
                                isSearchable={true}
                                placeholder={"Indicador cuarto nivel"}
                                captureMenuScroll={true} />}
                        </div>

                        {/*-----------Dropdown multiple de territorios------------*/}
                        <div style={
                            {
                                width: "25em",
                                textAlign: "left",
                                margin: "2em"
                            }
                        }>{estadoTerris ? '' :
                            <Select
                                value={seleccionadoTerris}
                                options={opcionesTerris}
                                isSearchable={true}
                                isMulti
                                onChange={
                                    this.acumularTerritorios
                                }
                                placeholder={"Escoja territorios"}
                                captureMenuScroll={true} />}
                        </div>

                        {/*-----------Dropdown multiple de periodos------------*/}
                        <div style={
                            {
                                width: "25em",
                                textAlign: "left",
                                margin: "2em"
                            }
                        }>{estadoPeriodo ? '' :
                            <Select
                                value={seleccionadoPeriodo}
                                options={opcionesPeriodo}
                                isSearchable={true}
                                isMulti
                                onChange={
                                    this.acumularPeriodos
                                }
                                placeholder={"Escoja periodos"}
                                captureMenuScroll={true} />}
                        </div>
                        {/*-----------Botón Graficar------------*/}
                        <div style={
                            {
                                width: "25em",
                                textAlign: "left",
                                margin: "2em"
                            }
                        }>{estadoBoton ? '' :
                            <button className="button-card-uao " onClick={this.showButton} >
                                Graficar
                          </button>}
                          {estadoLimpiar ? '':
                            <button style={{marginLeft:"2em", marginRight:"2em"}}className="button-card-uao " onClick={this.limpiar}>
                            Limpiar
                            </button>
                          }</div>
                    </div>
                    {/* Caja izquierda hasta aquí */}

                    {/*-----------Información------------*/}
                    {estadoInformativo ? '' : <div style={
                        {   
                            whiteSpace:"pre-wrap",
                            borderRadius:"5px",
                            width:"200%",
                            backgroundColor:"#CCD8E8",
                            /*background: "#ada996", 
                            background: "-webkit-linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea)", 
                            background: "linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea)", */
                            textAlign: "right",
                            margin: "auto auto",
                            marginLeft: "5em",                
                            padding:"2em",
                            fontSize:"1.2em",
                            textAlign:"left"                            
                        }
                    }> {informativo}
                       </div> }

                    {/*----Texto de cuando no se puede graficar*/}               

                  
                    {estadoTextoNo ? '' :  
                    <blockquote class="feature-text" >
                    <div>Estos datos son cualitativos, solo estan disponibles para descarga</div>

                </blockquote>}  


                    {/*-----------Grafica que se genera------------*/}
                    <div style={
                        {
                            //display: "flex",
                            width: "50em",
                            textAlign: "left",
                            margin:"auto auto",
                            marginLeft: "2em",
                            textAlign:"center"
                        }
                    }>
                    {estadoGrafica ? '' :
                            <div style={
                                {
                                    textAlign: "left",
                                    margin: "0em",
                                    marginLeft: "1em"
                                }
                            }>
                    
                    <button className="button-card-uao " onClick={this.cambiarGrafico} >
                        Ver Como Lineas
                    </button> </div>}
                    {estadoGraficaLinea ? '' :
                            <div style={
                                {
                                    textAlign: "left",
                                    margin: "0em",
                                    marginLeft: "1em"
                                }
                            }>
                    
                    <button className="button-card-uao " onClick={this.cambiarGraficoBarras} >
                        Ver Como Barras
                    </button> </div>}
                        {estadoGrafica ? '' : <Bar
                        data={jsonFinal}
                        options={{
                            title: {
                                display: true,
                                text: indicadorSeleccionado,
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
                            },
                            legend: {
                                display: true,                                
                                position: 'right'
                            }
                        }}                     
                        
                    /> 
                        }

                        {/*----------------Grafica de Lineas-----*/}

                        {estadoGraficaLinea ? '' : <Line
                        data={jsonFinal}
                        options={{
                            title: {
                                display: true,
                                text: indicadorSeleccionado,
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
                            },
                            legend: {
                                display: true,                                
                                position: 'right'
                            }
                        }}                     
                        
                    /> 
                        }
                        {/*----Fuente datos----*/}

                        {estadoFuente ? '':  <div style={
                        {
                            textAlign: "left",
                            margin: "0em",
                            marginLeft: "1em"
                        }
                    }><i><b>Fuente: </b>{fuente}</i></div>}
                        {estadoFuente ? '' : <Excel datos={arrPrueba} years={jsonFinal.labels}></Excel>}
                    </div>                   
                </div>
                <Footer ></Footer>
            </div>

        );
    }

    async componentDidMount() {

        const array = [];
        datos = "";
        axios.get("http://localhost/serpacificows/dimension/all.php").then(response => {
            let daticos = response.data;
            optionsDims = daticos.map(getParsedDimension);
            this.setState({ opcionesDimensiones: optionsDims });
        }).catch(error => console.log(error.response));
    }

    cargarCats() {
        let idSearch = this.state.seleccionadoDimension.value;
        axios.get("http://localhost/serpacificows/categoria/search.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsCats = daticosCat.map(getParsedCategories);
            this.setState({ seleccionadoTerris:null, seleccionadoPeriodo:null, seleccionadoCategorias:null, opcionesCategorias: optionsCats, estadoCategorias: false, estadoSubcategorias: true, estadoIndicadores: true, estadoSubniv1: true, estadoSubniv2: true, estadoSubniv3: true, estadoSubniv4: true, estadoGrafica:true ,estadoTerris: true, estadoPeriodo: true, informativo: "Las CATEGORIAS son un conjunto de objetos agrupados normalmente con un criterio de máxima homogeneidad. \n Corresponde a la categoría de análisis que contiene subcategorías y los indicadores."});
        }).catch(error => console.log(error.response));
    }

    cargarSubcats() {
        let idSearch = this.state.seleccionadoCategorias.value;
        axios.get("http://localhost/serpacificows/categoria/subcat.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsSubcats = daticosCat.map(getParsedCategories);
            this.setState({ seleccionadoTerris:null, seleccionadoPeriodo:null, seleccionadoSubcategorias:null, opcionesSubcategorias: optionsSubcats, estadoSubcategorias: false, estadoIndicadores: true, estadoSubniv1: true, estadoSubniv2: true, estadoSubniv3: true, estadoSubniv4: true, estadoGrafica:true,estadoTerris: true, estadoPeriodo: true, informativo: "Una SUBCATEGORIA es un agrupamiento de objetos en conjuntos homogéneos de acuerdo con criterios preestablecidos y en función del uso que tendrá la subcategoría. \n Corresponde a la desagregación que tiene una categoría de análisis y en las cuales se encontraran los indicadores." });
        }).catch(error => console.log(error.response));
    }

    cargarIndicas() {
        let idSearch = this.state.seleccionadoSubcategorias.value;
        axios.get("http://localhost/serpacificows/indicador/search.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsIndicas = daticosCat.map(getParsedIndicas);
            this.setState({ seleccionadoTerris:null, seleccionadoPeriodo:null, seleccionadoIndicadores:null, opcionesIndicadores: optionsIndicas, estadoIndicadores: false, estadoSubniv1: true, estadoSubniv2: true,estadoGrafica:true,estadoSubniv3: true, estadoSubniv4: true, estadoTerris: true, estadoPeriodo: true, informativo: "Los INDICADORES son datos o información que sirve para conocer o valorar las categorías y subcategorías y la intensidad de un hecho o para determinar su evolución futura. Es decir, aquellos medibles con base en información secundaria. \n \n  Los indicadores son jerárquicos y se presentan indicadores de nivel 1, nivel 2, nivel 3 y hasta nivel 4."});
        }).catch(error => {
            console.log(error.response)
            this.setState({ idSeleccionada: idSearch });
            this.buscarUnidad(idSearch);
            this.buscarFuente(idSearch);
            this.acumularTerris();
        });
    }

    cargarSubniv1() {
        let idSearch = this.state.seleccionadoIndicadores.value;
        axios.get("http://localhost/serpacificows/indicador/subniv.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsSubniv1 = daticosCat.map(getParsedIndicas);
            this.setState({seleccionadoTerris:null, seleccionadoPeriodo:null, opcionesSubniv1: optionsSubniv1, estadoSubniv1: false, estadoSubniv2: true, estadoSubniv3: true, estadoSubniv4: true, estadoTerris: true, estadoPeriodo: true, estadoGrafica:true });
        }).catch(error => {
            console.log(error.response);
            this.setState({seleccionadoTerris:null, seleccionadoPeriodo:null, idSeleccionada: idSearch, indicadorSeleccionado: this.state.seleccionadoIndicadores.label, estadoGrafica:true });
            this.buscarUnidad(idSearch);
            this.buscarFuente(idSearch);
            this.acumularTerris();
        });
    }

    cargarSubniv2() {
        let idSearch = this.state.seleccionadoSubniv1.value;
        axios.get("http://localhost/serpacificows/indicador/subniv.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsSubniv2 = daticosCat.map(getParsedIndicas);
            this.setState({seleccionadoTerris:null, seleccionadoPeriodo:null, opcionesSubniv2: optionsSubniv2, estadoSubniv2: false, estadoSubniv3: true, estadoSubniv4: true, estadoTerris: true, estadoPeriodo: true, estadoGrafica:true, estadoFuente:true, estadoGraficaLinea:true });
        }).catch(error => {
            console.log(error.response);
            this.setState({seleccionadoTerris:null, seleccionadoPeriodo:null, idSeleccionada: idSearch, indicadorSeleccionado: this.state.seleccionadoSubniv1.label, estadoGrafica:true, estadoFuente:true, estadoGraficaLinea:true });
            this.buscarUnidad(idSearch);
            this.buscarFuente(idSearch);
            this.acumularTerris();           
        });
    }

    cargarSubniv3() {
        let idSearch = this.state.seleccionadoSubniv2.value;
        axios.get("http://localhost/serpacificows/indicador/subniv.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsSubniv3 = daticosCat.map(getParsedIndicas);
            this.setState({seleccionadoPeriodo:null, opcionesSubniv3: optionsSubniv3, estadoSubniv3: false, estadoSubniv4: true, estadoTerris: true, estadoPeriodo: true, estadoGrafica:true, estadoFuente:true, estadoGraficaLinea:true });
        }).catch(error => {
            console.log(error.response)
            this.setState({seleccionadoPeriodo:null, idSeleccionada: idSearch, indicadorSeleccionado: this.state.seleccionadoSubniv2.label, estadoGrafica:true, estadoFuente:true, estadoGraficaLinea:true });
            this.buscarUnidad(idSearch);
            this.buscarFuente(idSearch);
            this.acumularTerris();           
        });
    }

    cargarSubniv4() {
        let idSearch = this.state.seleccionadoSubniv3.value;
        axios.get("http://localhost/serpacificows/indicador/subniv.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsSubniv4 = daticosCat.map(getParsedIndicas);
             this.buscarUnidad(idSearch);
             this.buscarFuente(idSearch);
            this.setState({seleccionadoPeriodo:null, opcionesSubniv4: optionsSubniv4, estadoSubniv4: false, estadoTerris: true, estadoPeriodo: true, indicadorSeleccionado: this.state.seleccionadoSubniv3.label, estadoGrafica:true, estadoFuente:true, estadoGraficaLinea:true });
        }).catch(error => console.log(error.response));
    }

    cargarTerris() {
        let idSearch = this.state.idSeleccionada;
        console.log("PRUEBA");
        axios.get("http://localhost/serpacificows/indicaterri/search.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsTerris = daticosCat.map(getParsedTerris);
            this.setState({ opcionesTerris: optionsTerris, estadoTerris: false, estadoPeriodo: true, estadoGrafica:true, estadoFuente:true, estadoGraficaLinea:true });
        }).catch(error => console.log(error.response));
    }

    cargarPeriodo() {
        console.log(this.state.seleccionadoTerris);
        let idTerritorio = this.state.seleccionadoTerris[0].value;
        let idIndicador = this.state.idSeleccionada;
        axios.get("http://localhost/serpacificows/periodo/search.php?id=" + idIndicador + "&dane=" + idTerritorio).then(response => {
            let daticosCat = response.data;
            optionsPeriodo = daticosCat.map(getParsedPeriodo);
            this.setState({ opcionesPeriodo: optionsPeriodo, estadoPeriodo: false, estadoGrafica:true });
        }).catch(error => console.log(error.response));
    }

    acumularTerris() {
        let idSearch = this.state.idSeleccionada;
        axios.get("http://localhost/serpacificows/indicaterri/search.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsTerris = daticosCat.map(getParsedTerris);
            this.setState({ opcionesTerris: optionsTerris, estadoTerris: false, estadoGrafica:true, estadoFuente:true, estadoGraficaLinea:true});
        }).catch(error => console.log(error.response));
        let daticosMulti = this.state.multiTerri;
        territorios = daticosMulti;

    }

    acumularPeris() {
        //console.log(this.state.seleccionadoTerris);
        let idTerritorio = this.state.seleccionadoTerris[0].value;
        let idIndicador = this.state.idSeleccionada;
        console.log(idTerritorio);
        console.log(idIndicador);
        axios.get("http://localhost/serpacificows/periodo/search.php?id=" + idIndicador + "&dane=" + idTerritorio).then(response => {
            let daticosCat = response.data;
            console.log(response.data);
            optionsPeriodo = daticosCat.map(getParsedPeriodo);
            console.log(optionsPeriodo);
            this.setState({ opcionesPeriodo: optionsPeriodo, estadoPeriodo: false, estadoGrafica:true });
        }).catch(error => console.log(error.response));
        let periodosMulti = this.state.multiPeriodo;    
        periodos = periodosMulti;        
    }

    buscarUnidad(idIndicador) {
        console.log(periodos);
        console.log("Lo que llega: " + idIndicador);
        //let idIndicador = this.state.idSeleccionada;
        axios.get("http://localhost/serpacificows/unidad/search.php?id=" + idIndicador).then(response => {
            let unidadMedida = response.data[0].nombre; 
            console.log(unidadMedida);      
            this.setState({ unidad: unidadMedida });
        }).catch(error => console.log(error.response));
        //let periodosMulti = this.state.multiPeriodo;
        //periodos = periodosMulti;
    }
  
    buscarFuente(idIndicador) {
        console.log("Lo que llega: " + idIndicador);
        //let idIndicador = this.state.idSeleccionada;
        axios.get("http://localhost/serpacificows/fuente/search.php?id=" + idIndicador).then(response => {
            let fuenteValue = response.data[0].nombre; 
            console.log(fuenteValue);      
            this.setState({ fuente: fuenteValue });
        }).catch(error => console.log(error.response));
    }

    mostrarBoton() {
        this.setState({ estadoBoton: false });
    }

    limpiarTodo(){
        this.setState({ estadoGraficaLinea:true, estadoFuente:true, estadoLimpiar:true, seleccionadoTerris:null, seleccionadoPeriodo:null, seleccionadoCategorias:null, opcionesCategorias: optionsCats, estadoCategorias: false, estadoSubcategorias: true, estadoIndicadores: true, estadoSubniv1: true, estadoSubniv2: true, estadoSubniv3: true, estadoSubniv4: true, estadoGrafica:true ,estadoTerris: true, estadoPeriodo: true, informativo: "Las CATEGORIAS son un conjunto de objetos agrupados normalmente con un criterio de máxima homogeneidad. \n Corresponde a la categoría de análisis que contiene subcategorías y los indicadores." });
    }

    pintarGrafico() {
        arrEjes.length = 0;
        arrDatos.length = 0;
        arrPrueba.length = 0;
        promises.length = 0;
        this.setState({ estadoInformativo: true, estadoLimpiar: false, estadoFuente: false});
        let idIndicador = this.state.idSeleccionada;
        territorios = this.state.seleccionadoTerris;
        periodos = this.state.seleccionadoPeriodo;

        for (var i = 0; i < territorios.length; i++) {
            //De aqui para abajo
            let terreno = territorios[i].label;
            axios.get("http://localhost/serpacificows/periodo/search.php?id=" + idIndicador + "&dane=" + territorios[i].value).then(response => {
                let daticosCat = response.data;
                //console.log(response.data);
                let aux = daticosCat.map(getParsedPeriodo);
                let arreglito = [];
                for (var j = 0; j < periodos.length; j++) {
                    for (var k = 0; k < aux.length; k++) {
                        if (periodos[j].label == aux[k].label) {
                            // acumulador.push(aux[k].label); 
                            let tt = aux[k].value;
                            tt = tt.replace(/,/g, '.');
                            if(isNaN(tt)){this.setState({ estadoTextoNo: false})};
                            arreglito.push(tt);                            
                        }
                    }
                }
                //console.log(acumulador);
                //arreglito.push(parseFloat(aux[i].value)); 
                let colorTemporal =  getRandomColor();            
                let jsonPrueba = { label: terreno, backgroundColor: colorTemporal, borderColor: colorTemporal, fill:false, data: arreglito };
                datosMultiples.datasets.push(jsonPrueba);
                promises.push(jsonPrueba);
            }).catch(error => console.log(error.response));
            if (i == (territorios.length - 1)) {
                axios.all(promises).then(this.finish());
            }
        }

        //Función para dar diferentes colores a las graficas
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            //Devuelve un hexadecimal diferente
            return color;
        }
    }

    finish() {
        arrEjes.push(this.state.seleccionadoPeriodo.label);
        console.log("arraPrueba: ", arrPrueba);
        console.log(promises);
        console.log(datosMultiples);

        three().then(response => {
            console.log(jsonFinal);
            this.setState({
                estadoGrafica: false
            });
        });

        function one() {
            return new Promise(resolve => {
                setTimeout(() => {
                    jsonFinal = {
                        //labels: arrEjes,
                        labels: periodos,
                        datasets: arrPrueba
                    }
                    console.log(jsonFinal);
                    resolve();
                }, 200);
            });
        }

        function two() {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log(jsonFinal);                    
                    resolve();
                }, 200);
            });
        }

        function three() {
            return new Promise(resolve => {
                setTimeout(() => {
                    let periodoFilter = [];
                    for (var i = 0; i < periodos.length; i++) {
                        periodoFilter.push(periodos[i].label);
                    }
                    jsonFinal = {
                        labels: periodoFilter,
                        datasets: arrPrueba
                    }
                    resolve();
                }, 500);

            });
        }
        one().then(two).then(three);
        console.log("A este punto, los datos ya deben estar en la grafica");
    }

    fin() {
        jsonFinal = {
            labels: arrEjes,
            datasets: arrPrueba
        }    
        var devolver = 5;
        //this.setState({estadoGrafica:false}); 
        return devolver;
    }
}

function getParsedDimension(item) {
    var opcionTemp = {
        value: item.iddimensiones,
        label: item.nombre
    };
    return opcionTemp;
}

function getParsedCategories(item) {
    var opcionTemp = {
        value: item.idcategorias,
        label: item.nombre
    };
    return opcionTemp;
}

function getParsedIndicas(item) {
    var opcionTemp = {
        value: item.idindicadores,
        label: item.nombre
    };
    return opcionTemp;
}

function getParsedTerris(item) {
    var opcionTemp = {
        value: item.codigo_dane,
        label: item.nombre
    };
    return opcionTemp;
}

function getParsedPeriodo(item) {
    var opcionTemp = {
        value: item.valor,
        label: item.periodo
    };
    return opcionTemp;
}

EstadisticasContainer.propTypes = {};

export default EstadisticasContainer;