import React, {useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch, 
    NavLink
  } from "react-router-dom";

    const Tabs = ({setindice, tab1, tab2}) => {

    let { url } = useRouteMatch();
    const [indicador, setIndicador] = useState(1);


    function handleClick(indicador){
        setIndicador(indicador);
        setindice(indicador);
    }

    return (
        <div>
            <div  className="tabs">
                <section className="tabs-cards-container ">
                    <nav>
                        <ul>
                            <Link to={`${url + "/" + tab1.toLowerCase().replace(/ /g,"-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} onClick={()=> handleClick(1)} className={"tab program-tab"}>
                                <li style={{backgroundColor:'white'}} className={"tab program-tab ".concat(`${indicador===1?"active":""}`)} data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-1">
                                    {tab1}
                                </li>
                            </Link>
                            <Link to={`${url + "/" + tab2.toLowerCase().replace(/ /g,"-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} onClick={()=> handleClick(2)} className={"tab program-tab"}>
                                <li style={{backgroundColor:'white'}} className={"tab program-tab ".concat(`${indicador===2?"active":""}`)} data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-2">
                                    {tab2}
                                </li>
                            </Link>
                        </ul>
                    </nav>
                </section>
            </div>
        </div>
    );
};

export default Tabs;