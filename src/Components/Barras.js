import React from 'react';
import {Bar} from "react-chartjs-2";

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

class Barra extends React.Component {
    render() {
        const {datos, ancho, alto} = this.props;
        const pintarBarras = (
            <div>
                <Bar data={databar}
                    width={ancho}
                    height={alto}/>
            </div>
        );

        const mensajeCarga = <span className="d-flex m-auto">Cargando grafica...</span>;

        return (
            <div> {
                cargando ? mensajeCarga : pintarBarras
            } </div>
        );
    };
};

export default Barra;
