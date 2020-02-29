import React, {useState} from 'react';
import axios from "axios";
import ReactPaginate from 'react-paginate';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch, 
    NavLink
  } from "react-router-dom";

import PropTypes from 'prop-types';
import Buscador from '../Components/Buscador';
import Lista from '../Components/Lista';
import SelectorUAO from '../Components/SelectorUAO';

    const Tabs = ({setindice}) => {

    let { path, url } = useRouteMatch();
    const [topic, setTopic] = useState(1);

    function handleClick(index){
        setTopic(index);
        setindice(index);
    }

    return (
        <div>
            <div  className="tabs">
                <section className="tabs-cards-container ">
                    <nav>
                        <ul>
                            <Link to={`${url}/documentos`} onClick={()=> handleClick(1)} className={"tab program-tab"}>
                                <li className={"tab program-tab ".concat(`${topic===1?"active":""}`)} data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-1">
                                    Documentos
                                </li>
                            </Link>
                            <Link to={`${url}/cuentas economicas del valle`} onClick={()=> handleClick(2)} className={"tab program-tab"}>
                                <li className={"tab program-tab ".concat(`${topic===2?"active":""}`)} data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-2">
                                    Cuentas Economicas del Valle
                                </li>
                            </Link>
                            <Link to={`${url}/tesis`} onClick={()=> handleClick(3)} className={"tab program-tab"}>
                                <li className={"tab program-tab ".concat(`${topic===3?"active":""}`)} data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-3">
                                    Tesis
                                </li>
                            </Link>
                            <Link to={`${url}/articulos`} onClick={()=> handleClick(4)} className={"tab program-tab"}>
                                <li className={"tab program-tab ".concat(`${topic===4?"active":""}`)} data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-4">
                                    Artículos
                                </li>
                            </Link>
                        </ul>
                    </nav>
                    <div className="tabs-box-container">
                        {/* <Buscador></Buscador> */}                        
                        {/* <Switch>
                            <Route exact path={path}>
                            <h3>Selecione un tipo de publicación</h3>
                            </Route>
                            <Route path={`${path}/:listaID`}> */}
                                {/*<Topic></Topic>*/}
                                {/* <Lista></Lista>
                            </Route>
                        </Switch> */}
                    </div>
                </section>
            </div>
        </div>
    );
};

function Topic() {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { topicId } = useParams();

  
    return (
      <div>
        <h3>{topicId}</h3>
      </div>
    );
  }


Tabs.propTypes = {

};

export default Tabs;