import React from 'react';
import PropTypes from 'prop-types';
import Buscador from '../Components/Buscador';
import Lista from '../Components/Lista';

const Tabs = props => {
    return (
        <div>
            <div  className="tabs">
                <section class="tabs-cards-container ">
                    <nav>
                        <ul>
                            <li class="tab program-tab active" data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-1">Documentos</li>
                            <li class="tab program-tab" data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-2">Cuentas Económicas del Valle</li>
                            <li class="tab program-tab" data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-3">Tesis</li>
                            <li class="tab program-tab" data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-3">Articulos</li>
                        </ul>
                    </nav>
                    <div class="tabs-box-container">
                        <Buscador></Buscador>
                        <Lista></Lista>
                    </div>
                </section>
            </div>
        </div>
    );
};

Tabs.propTypes = {

};

export default Tabs;