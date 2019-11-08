import React, {Component} from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Footer from "../Components/Footer";
import NavBarDesktop from "../Components/NavBarDesktop";
import NavBarMovil from "../Components/NavBarMovil";

import Select from "react-select";

import {Line} from "react-chartjs-2";
import {Doughnut} from "react-chartjs-2";
import {Bar} from "react-chartjs-2";

const dataLine = canvas => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 1, 2000);
    gradient.addColorStop(0, "rgba(50,50,250,1)");
    gradient.addColorStop(1, "rgba(250,0,50,0.5)");
    return {
        labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio"
        ],
        datasets: [
            {
                label: "My First dataset",
                fill: true,
                lineTension: 0.1,
                backgroundColor: gradient,
                borderColor: "blue",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.1,
                borderJoinStyle: "miter",
                pointBorderColor: "black",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 10,
                pointHoverRadius: 10,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [
                    65,
                    59,
                    80,
                    81,
                    56,
                    55,
                    40
                ]
            }
        ]
    };
};

const dataDoughnut = {
    labels: [
        "Red", "Green", "Yellow"
    ],
    datasets: [
        {
            data: [
                300, 50, 100
            ],
            backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
    ]
};

const dataBar = canvas => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 1, 2000);
    gradient.addColorStop(0, "rgba(250,50,150,1)");
    gradient.addColorStop(1, "rgba(50,0,250,0.5)");
    return {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July"
        ],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: gradient,
                borderColor: "black",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(250,50,150,0.5)",
                hoverBorderColor: "rgba(250,50,150,1)",
                data: [
                    65,
                    59,
                    80,
                    81,
                    56,
                    55,
                    40
                ]
            }
        ]
    };
};

const options = [
    {
        value: "chocolate",
        label: "Chocolate"
    }, {
        value: "strawberry",
        label: "Strawberry"
    }, {
        value: "vanilla",
        label: "Vanilla"
    }, {
        value: "fresa",
        label: "Fresa"
    }, {
        value: "mango",
        label: "Mango"
    }, {
        value: "mandarina",
        label: "Mandarina"
    }, {
        value: "lulo",
        label: "Lulo"
    }, {
        value: "papaya",
        label: "Papaya"
    }, {
        value: "zapote",
        label: "Zapote"
    }, {
        value: "limon",
        label: "Limon"
    }, {
        value: "uva",
        label: "Uva"
    }, {
        value: "mora",
        label: "Mora"
    }, {
        value: "guayaba",
        label: "Guayaba"
    }, {
        value: "guanabana",
        label: "Guanabana"
    }, {
        value: "pera",
        label: "Pera"
    }, {
        value: "piña",
        label: "Piña"
    }
];

const options2 = [
    {
        value: "chocolate",
        label: "Chocolatee"
    }, {
        value: "strawberry",
        label: "Strawberryy"
    }, {
        value: "vanilla",
        label: "Vanilla"
    }, {
        value: "fresa",
        label: "Fresa"
    }, {
        value: "mango",
        label: "Mango"
    }, {
        value: "mandarina",
        label: "Mandarina"
    }, {
        value: "lulo",
        label: "Lulo"
    }, {
        value: "papaya",
        label: "Papaya"
    }, {
        value: "zapote",
        label: "Zapote"
    }, {
        value: "limon",
        label: "Limon"
    }, {
        value: "uva",
        label: "Uva"
    }, {
        value: "mora",
        label: "Mora"
    }, {
        value: "guayaba",
        label: "Guayaba"
    }, {
        value: "guanabana",
        label: "Guanabana"
    }, {
        value: "pera",
        label: "Pera"
    }, {
        value: "piña",
        label: "Piña"
    }
];

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

class EstadisticasContainer extends Component {
    // Declara una nueva variable de estado, la cual llamaremos “count”
    // const [gradient, setGradient] = useState("");
    constructor(props) {
        super(props);
        this.state = {
            espera: true,
            descripcion: null,
            nombre: null,
            valor: null,
            dimensiones: [],
            selectedOption:null, 
            selectedOption2:null,      
            seleccionadoDimension:null,
            opcionesDimensiones:optionsDims,    
            estadoCategorias:true,
            seleccionadoCategorias:null,
            opcionesCategorias: optionsCats,
            estadoSubcategorias:true,
            seleccionadoSubcategorias:null,
            opcionesSubcategorias:optionsSubcats,
            estadoIndicadores:true,
            seleccionadoIndicadores:null,
            opcionesIndicadores:optionsIndicas,
            estadoSubniv1:true,
            seleccionadoSubniv1:null,
            opcionesSubniv1:optionsSubniv1,
            estadoSubniv2:true,
            seleccionadoSubniv2:null,
            opcionesSubniv2:optionsSubniv2,
            estadoSubniv3:true,
            seleccionadoSubniv3:null,
            opcionesSubniv3:optionsSubniv3,
            estadoSubniv4:true,
            seleccionadoSubniv4:null,
            opcionesSubniv4:optionsSubniv4,
            estadoTerris:true,
            seleccionadoTerris:null,
            opcionesTerris:optionsTerris,
            estadoPeriodo:true,
            seleccionadoPeriodo:null,
            opcionesPeriodo:optionsPeriodo,
            idSeleccionada:null        
        };

        this.handleChange = selectedOption => {
            this.setState({
                selectedOption
            }, () => console.log(`Option selected:`, this.state.selectedOption));
        };

        this.handleChange2 = selectedOption2 => {
            this.setState({
                selectedOption2
            }, () => console.log(`Option selected:`, this.state.selectedOption2));
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
                this.cargarSubcats();});
               
        };

        this.cambioSubcategorias = seleccionadoSubcategorias => {
            this.setState({
                seleccionadoSubcategorias
            }, () => {
                console.log(`Subcategoria seleccionada:`, this.state.seleccionadoSubcategorias.value);
                this.cargarIndicas();});
        };

        this.cambioIndicadores = seleccionadoIndicadores => {
            this.setState({
                seleccionadoIndicadores
            }, () => {console.log(`Indicador seleccionado:`, this.state.seleccionadoIndicadores.value)
            this.cargarSubniv1();});
        };

        this.cambioSubniv1 = seleccionadoSubniv1 => {
            this.setState({
                seleccionadoSubniv1
            }, () => {
                console.log(`Subnivel 1 seleccionado:`, this.state.seleccionadoSubniv1.value);
                this.cargarSubniv2();});
        };

        this.cambioSubniv2 = seleccionadoSubniv2 => {
            this.setState({
                seleccionadoSubniv2
            }, () => {
                console.log(`Subnivel 2 seleccionado:`, this.state.seleccionadoSubniv2.value);
                this.cargarSubniv3();});
        };

        this.cambioSubniv3 = seleccionadoSubniv3 => {
            this.setState({
                seleccionadoSubniv3
            }, () => {
                console.log(`Subnivel 3 seleccionado:`, this.state.seleccionadoSubniv3.value);
                this.cargarSubniv4();});
        };

        this.cambioSubniv4 = seleccionadoSubniv4 => {
            this.setState({
                seleccionadoSubniv4
            }, () => {
                console.log(`Subnivel 4 seleccionado:`, this.state.seleccionadoSubniv4.value);
                this.cargarTerris();});
        };

        this.cambioTerris = seleccionadoTerris => {
            this.setState({
                seleccionadoTerris
            }, () => {
                console.log(`Territorio seleccionado:`, this.state.seleccionadoTerris.value);
                this.cargarPeriodo();});
        };

        this.cambioCategorias = this.cambioCategorias.bind(this);
        this.cambioSubcategorias = this.cambioSubcategorias.bind(this);
        this.cambioIndicadores = this.cambioIndicadores.bind(this);
        this.cambioSubniv1 = this.cambioSubniv1.bind(this);
        this.cambioSubniv2 = this.cambioSubniv2.bind(this);
        this.cambioSubniv3 = this.cambioSubniv3.bind(this);      
    }

    render() {
        const {
            espera,
            nombre,
            descripcion,
            dimensiones, 
            selectedOption,
            selectedOption2,         
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
            idSeleccionada
                   
         } = this.state;

        return (
            <div>
                <NavBarDesktop></NavBarDesktop>
                <NavBarMovil></NavBarMovil>
              
                <div style={
                    {
                        width: "25em",
                        textAlign: "left",
                        margin: "2em"
                    }
                }>  {espera ? '' :
                    <Select value={selectedOption}
                        onChange={
                            this.handleChange
                        }
                        options={options}
                        isSearchable={true}
                        placeholder={"Territorio"}
                        isMulti={true}
                        captureMenuScroll={true}/>}
                </div>
                <div style={
                    {
                        width: "25em",
                        textAlign: "left",
                        margin: "2em"
                    }
                }>
                    <Select value={selectedOption2}
                        onChange={
                            this.handleChange2
                        }
                        options={options2}
                        isSearchable={true}
                        placeholder={"Dimensiones"}
                        captureMenuScroll={true}/>
                </div>
                {/*-----------Dropdown de dimensiones------------*/}
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
                        placeholder={"Prueba"}
                        captureMenuScroll={true}/>
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
                    captureMenuScroll={true}/> }
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
                    captureMenuScroll={true}/> }
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
                    captureMenuScroll={true}/> }
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
                    captureMenuScroll={true}/> }
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
                    captureMenuScroll={true}/> }
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
                    captureMenuScroll={true}/> }
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
                    captureMenuScroll={true}/> }
                </div>   

                {/*-----------Dropdown de territorios------------*/}
                <div style={
                    {
                        width: "25em",
                        textAlign: "left",
                        margin: "2em"
                    }
                }> {estadoTerris ? '' :
                    <Select value={seleccionadoTerris}
                        onChange={
                            this.cambioTerris
                        }
                        options={opcionesTerris}
                        isSearchable={true}
                        placeholder={"Terrritorio"}
                    captureMenuScroll={true}/> }
                </div>   

                {/*-----------Dropdown de periodo------------*/}
                <div style={
                    {
                        width: "25em",
                        textAlign: "left",
                        margin: "2em"
                    }
                }> {estadoPeriodo ? '' :
                    <Select value={seleccionadoPeriodo}
                        onChange={
                            this.cambioPeriodo
                        }
                        options={opcionesPeriodo}
                        isSearchable={true}
                        placeholder={"Periodo"}
                    captureMenuScroll={true}/> }
                </div>                        

                <div className="input-form select-input">
                    <label for="locality-dropdown">Elija</label>
                    <select id="locality-dropdown" name="locality-dropdown"
                        onChange={cargarCategorias}>
                        <option value="epa">Epita</option>
                    </select>
                </div>
                <div className="input-form select-input">
                    <label for="dropdown-categorias">Elija</label>
                    <select id="dropdown-categorias" name="categoty">
                        <option value="defecto">Categorias</option>
                    </select>
                </div>
                <div className="input-form select-input"></div>
                <div className="input-form select-input"></div>
                <div className="input-form select-input"></div>
                <div className="input-form select-input"></div>
                <div className="input-form select-input"></div>
                <div className="input-form select-input"></div>
                <div style={
                    {
                        height: "",
                        width: "50rem"
                    }
                }>
                    <h2>Line Example</h2>
                    <Line data={dataLine}
                        width={100}
                        height={50}/>
                    <Doughnut data={dataDoughnut}
                        width={100}
                        height={50}/>
                    <Bar data={dataBar}
                        width={100}
                        height={50}/>
                </div>
                <Footer></Footer>
            </div>
        );
    }

    async componentDidMount() {
        const array = [];
        axios.get("http://localhost/serpacificows/dimension/all.php").then(response => {
            iniciartodo();     
            let daticos = response.data;
            optionsDims = daticos.map(getParsedDimension);         
            this.setState({opcionesDimensiones: optionsDims});
        }).catch(error => console.log(error.response));
    }

    cargarCats() {
        let idSearch = this.state.seleccionadoDimension.value;        
        axios.get("http://localhost/sitws/categoria/search.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsCats = daticosCat.map(getParsedCategories);
            this.setState({opcionesCategorias: optionsCats, estadoCategorias:false, estadoSubcategorias:true, estadoIndicadores:true, estadoSubniv1:true, estadoSubniv2:true, estadoSubniv3:true, estadoSubniv4:true, estadoTerris:true, estadoPeriodo:true});            
        }).catch(error => console.log(error.response));
    }

    cargarSubcats() {
        let idSearch = this.state.seleccionadoCategorias.value;        
        axios.get("http://localhost/sitws/categoria/subcat.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsSubcats = daticosCat.map(getParsedCategories);
            this.setState({opcionesSubcategorias: optionsSubcats, estadoSubcategorias:false, estadoIndicadores:true, estadoSubniv1:true, estadoSubniv2:true, estadoSubniv3:true, estadoSubniv4:true, estadoTerris:true, estadoPeriodo:true});           
        }).catch(error => console.log(error.response));
    }

    cargarIndicas() {
        let idSearch = this.state.seleccionadoSubcategorias.value;        
        axios.get("http://localhost/sitws/indicador/search.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsIndicas = daticosCat.map(getParsedIndicas);
            this.setState({opcionesIndicadores: optionsIndicas, estadoIndicadores:false, estadoSubniv1:true, estadoSubniv2:true, estadoSubniv3:true, estadoSubniv4:true, estadoTerris:true, estadoPeriodo:true});           
        }).catch(error => {console.log(error.response)
            this.setState({idSeleccionada:idSearch});
            this.cargarTerris();});
    }

    cargarSubniv1() {
        let idSearch = this.state.seleccionadoIndicadores.value;        
        axios.get("http://localhost/sitws/indicador/subniv.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsSubniv1 = daticosCat.map(getParsedIndicas);
            this.setState({opcionesSubniv1: optionsSubniv1, estadoSubniv1:false, estadoSubniv2:true, estadoSubniv3:true, estadoSubniv4:true, estadoTerris:true, estadoPeriodo:true});           
        }).catch(error => {console.log(error.response);
            this.setState({idSeleccionada:idSearch});
            this.cargarTerris();});
    }

    cargarSubniv2() {
        let idSearch = this.state.seleccionadoSubniv1.value;        
        axios.get("http://localhost/sitws/indicador/subniv.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsSubniv2 = daticosCat.map(getParsedIndicas);
            this.setState({opcionesSubniv2: optionsSubniv2, estadoSubniv2:false, estadoSubniv3:true, estadoSubniv4:true, estadoTerris:true, estadoPeriodo:true});           
        }).catch(error => {console.log(error.response);
            this.setState({idSeleccionada:idSearch});
            this.cargarTerris();});
    }

    cargarSubniv3() {
        let idSearch = this.state.seleccionadoSubniv2.value;        
        axios.get("http://localhost/sitws/indicador/subniv.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsSubniv3 = daticosCat.map(getParsedIndicas);
            this.setState({opcionesSubniv3: optionsSubniv3, estadoSubniv3:false, estadoSubniv4:true, estadoTerris:true, estadoPeriodo:true});           
        }).catch(error => {console.log(error.response)
            this.setState({idSeleccionada:idSearch});
            this.cargarTerris();});
    }

    cargarSubniv4() {
        let idSearch = this.state.seleccionadoSubniv3.value;        
        axios.get("http://localhost/sitws/indicador/subniv.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsSubniv4 = daticosCat.map(getParsedIndicas);
            this.setState({opcionesSubniv4: optionsSubniv4, estadoSubniv4:false, estadoTerris:true, estadoPeriodo:true});           
        }).catch(error => console.log(error.response));
    }

    cargarTerris() {
        let idSearch = this.state.idSeleccionada;       
        axios.get("http://localhost/sitws/indicaterri/search.php?id=" + idSearch).then(response => {
            let daticosCat = response.data;
            optionsTerris = daticosCat.map(getParsedTerris);        
            this.setState({opcionesTerris: optionsTerris, estadoTerris:false, estadoPeriodo:true});           
        }).catch(error => console.log(error.response));
    }

    cargarPeriodo() {
        let idTerritorio = this.state.seleccionadoTerris.value;
        let idIndicador = this.state.idSeleccionada;             
        axios.get("http://localhost/sitws/periodo/search.php?id=" + idIndicador + "&dane=" + idTerritorio).then(response => {
            let daticosCat = response.data;
            optionsPeriodo = daticosCat.map(getParsedPeriodo);
            this.setState({opcionesPeriodo: optionsPeriodo, estadoPeriodo:false});           
        }).catch(error => console.log(error.response));
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

function iniciartodo() {
    console.log("Entro");
    let dropdown = document.getElementById("locality-dropdown");
    dropdown.length = 0;
    let defaultOption = document.createElement("option");
    defaultOption.text = "Escoge una dimensíon";

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = "http://localhost/sitws/dimension/all.php";

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.status !== 200) {
            console.warn("Parece que hay un problema. Status Code: " + response.status);
            return;
        }
        // Examine the text in the response
        response.json().then(function (data) {
            let option;
            for (let i = 0; i < data.length; i++) {
                option = document.createElement("option");
                option.text = data[i].nombre;
                option.value = data[i].iddimensiones;
                dropdown.add(option);
            }
        });
    }).catch(function (err) {
        console.error("Fetch Error -", err);
    });
}

function cargarCategorias() {
    console.log("Epita");
    let dimensiones = document.getElementById("locality-dropdown");
    let idSeleccionada = dimensiones.options[dimensiones.selectedIndex].value;

    console.log(idSeleccionada);

    let dropdown = document.getElementById("dropdown-categorias");
    dropdown.length = 0;

    let defaultOption = document.createElement("option");
    defaultOption.text = "Escoge una categoria";

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = "http://localhost/sitws/categoria/search.php?id=" + idSeleccionada;

    fetch(url, {
        method: "GET",
        // or 'PUT'
        // data can be `string` or {object}!
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.status !== 200) {
            console.warn("Parece que hay un problema. Status Code: " + response.status);
            return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
            let option;

            for (let i = 0; i < data.length; i++) {
                option = document.createElement("option");
                option.text = data[i].nombre;
                option.value = data[i].idcategorias;
                dropdown.add(option);
            }
        });
    }).catch(function (err) {
        console.error("Fetch Error -", err);
    });
}

EstadisticasContainer.propTypes = {};

export default EstadisticasContainer;
