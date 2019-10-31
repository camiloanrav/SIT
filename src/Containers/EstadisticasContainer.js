import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Footer from '../Components/Footer';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';

import {Line} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';


  const dataLine = (canvas) => {
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0,0,1,2000);
    gradient.addColorStop(0, 'rgba(50,50,250,1)');   
    gradient.addColorStop(1, 'rgba(250,0,50,0.5)');
    return {
        
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
        {
            label: 'My First dataset',
            fill: true,
            lineTension: 0.1,
            backgroundColor: gradient,
            borderColor: 'blue',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.1,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
        ]
    }
}

const dataDoughnut = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

const dataBar = (canvas) => {

    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0,0,1,2000);
    gradient.addColorStop(0, 'rgba(250,50,150,1)');   
    gradient.addColorStop(1, 'rgba(50,0,250,0.5)');
    return{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
        {
            label: 'My First dataset',
            backgroundColor: gradient,
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(250,50,150,0.5)',
            hoverBorderColor: 'rgba(250,50,150,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
        ]
    }
  }
  

  class EstadisticasContainer extends Component {
    // Declara una nueva variable de estado, la cual llamaremos “count”
    //const [gradient, setGradient] = useState("");
    constructor(props) {
      super(props);
      this.state = {
          espera: true,
          descripcion: null,
          nombre: null,
          valor: null,
          dimensiones: []
      };
  }
  render() {
      
    const {espera, nombre, descripcion, dimensiones} = this.state;

    return (
      <div>
        <NavBarDesktop></NavBarDesktop>
        <NavBarMovil></NavBarMovil>
       
        <div className="input-form select-input" >
                <label for="locality-dropdown">Elija</label>
                <select id="locality-dropdown" name="locality-dropdown" onChange={cargarCategorias}>   
                <option value="epa">Epita</option>                        
                </select>
        </div>
        <div className="input-form select-input" >
        <label for="dropdown-categorias">Elija</label>
        <select id="dropdown-categorias" name="categoty">
    <option value="defecto">Categorias</option>
  </select>
        </div>
        <div className="input-form select-input" >
        </div>
        <div className="input-form select-input" >
        </div>
        <div className="input-form select-input" >
        </div>
        <div className="input-form select-input" >
        </div>
        <div className="input-form select-input" >
        </div>
        <div className="input-form select-input" >
        </div>
        <div style={{height:'', width:'50rem'}}>
          <h2>Line Example</h2>
          <Line data={dataLine} width={100} height={50}/>
          <Doughnut data = {dataDoughnut} width={100} height={50}/>
          <Bar data = {dataBar} width={100} height={50}/>
        </div>
        <Footer></Footer>
      </div>
    );
  }

  async componentDidMount(){
    const array = [];
    axios.get("http://localhost/serpacificows/dimension/all.php").then(response => {
      iniciartodo();
    }).catch(error => console.log(error.response));
  }
  }

  function iniciartodo() {
    console.log("Entro");
    let dropdown = document.getElementById('locality-dropdown');
    dropdown.length = 0;
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Escoge una dimensíon';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'http://localhost/sitws/dimension/all.php';

    fetch(url, {
        method: 'GET',      
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.status !== 200) {
            console.warn('Parece que hay un problema. Status Code: ' + response.status);
            return;
        }
        // Examine the text in the response
        response.json().then(function (data) {
            let option;
            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].nombre;
                option.value = data[i].iddimensiones;
                dropdown.add(option);
            }
        });
    }).catch(function (err) {
        console.error('Fetch Error -', err);
    });
}


function cargarCategorias() {

  console.log("Epita");
  let dimensiones = document.getElementById("locality-dropdown");
  let idSeleccionada = dimensiones.options[dimensiones.selectedIndex].value;

  console.log(idSeleccionada);

  let dropdown = document.getElementById('dropdown-categorias');
  dropdown.length = 0;

  let defaultOption = document.createElement('option');
  defaultOption.text = 'Escoge una categoria';

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  const url = 'http://localhost/sitws/categoria/search.php?id=' + idSeleccionada;

  fetch(url, {
    method: 'GET', // or 'PUT'
    // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(
      function (response) {
        if (response.status !== 200) {
          console.warn('Parece que hay un problema. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response  
        response.json().then(function (data) {
          let option;

          for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.text = data[i].nombre;
            option.value = data[i].idcategorias;
            dropdown.add(option);
          }
        });
      }
    )
    .catch(function (err) {
      console.error('Fetch Error -', err);
    });
}

EstadisticasContainer.propTypes = {

};

export default EstadisticasContainer;
