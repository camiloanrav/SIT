import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
  

function EstadisticasContainer() {
    // Declara una nueva variable de estado, la cual llamaremos “count”
    //const [gradient, setGradient] = useState("");
    return (
      <div>
        <NavBarDesktop></NavBarDesktop>
        <NavBarMovil></NavBarMovil>
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

EstadisticasContainer.propTypes = {

};

export default EstadisticasContainer;
