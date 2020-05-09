import React, {useState} from 'react';

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

    const Tabs = ({setindice, tab1, tab2}) => {

    let { url } = useRouteMatch();
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
                            <Link to={`${url + "/" + tab1.toLowerCase().replace(/ /g,"-")}`} onClick={()=> handleClick(1)} className={"tab program-tab"}>
                                <li className={"tab program-tab ".concat(`${topic===1?"active":""}`)} data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-1">
                                    {tab1}
                                </li>
                            </Link>
                            <Link to={`${url + "/" + tab2.toLowerCase().replace(/ /g,"-")}`} onClick={()=> handleClick(2)} className={"tab program-tab"}>
                                <li className={"tab program-tab ".concat(`${topic===2?"active":""}`)} data-box-class="program-box" data-tab-class="program-tab" data-box-id="box-2">
                                    {tab2}
                                </li>
                            </Link>
                        </ul>
                    </nav>
                    {/* <div className="tabs-box-container">
                    </div> */}
                </section>
            </div>
        </div>
    );
};

Tabs.propTypes = {

};

export default Tabs;