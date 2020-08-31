import React  from 'react';
import { NavLink} from 'react-router-dom';
import logo from '../logo-ser.png';

const NavBarDesktop = ({user}) => {

    let nav;
    if(user === "administrador"){
        nav = <header id="header-menu-desktop">
        <div id="hmd-bottom">
            <span className="hmdb-line-left"></span>
            <span className="hmdb-line-right"></span>
            <div>
                <img src={logo} width="400" alt="Logo"></img>
            </div>
            <ul>
                <NavLink to="/ser/administrador-inicio" className="dropdown" activeClassName="activeNavBar">
                    <div className="dd-btn">
                            Inicio
                    </div>
                </NavLink>
                
                <NavLink to="/ser/administrador-estadisticas" activeClassName="activeNavBar" className="dropdown">
                    <li className="dd-btn">
                            Estadísticas Municipales
                    </li>
                </NavLink>

                <NavLink to="/ser/administrador-publicaciones" activeClassName="activeNavBar"  className="dropdown">
                    <li className="dd-btn">
                            Publicaciones
                    </li>
                </NavLink>

                <NavLink to="/ser/ajustes" activeClassName="activeNavBar"  className="dropdown">
                    <li className="dd-btn">
                        Ajustes
                        <i style={{margin:'0 0 0 0.5em'}} className="fas fa-wrench"></i>
                    </li>
                </NavLink>

                <NavLink onClick={()=>{sessionStorage.clear(); }} to="/" activeClassName="activeNavBar"  className="dropdown">
                    <li className="dd-btn">
                            Cerrar Sesión
                            <i style={{margin:'0 0 0 0.5em'}} className="fas fa-sign-out-alt"></i>
                    </li>
                </NavLink>
            </ul>
            <span className="scroll-indicator"></span>
        </div>
    </header>
    } else{
        nav = <header id="header-menu-desktop">
        <div id="hmd-bottom">
            <span className="hmdb-line-left"></span>
            <span className="hmdb-line-right"></span>
            {/* <div id="hmdb-logo-container">
                <a id="hmdb-logo" href="" ></a>
            </div> */}
            <div id="">
                <img src={logo} width="400" alt="Logo"></img>
            </div>
            <ul>
                <NavLink to="/ser/inicio" className="dropdown" activeClassName="activeNavBar">
                    <div className="dd-btn">
                            Inicio
                    </div>
                </NavLink>
                
                <NavLink to="/ser/estadisticas" activeClassName="activeNavBar" className="dropdown">
                    <li className="dd-btn">
                            Estadísticas Municipales
                    </li>
                </NavLink>

                <NavLink to="/ser/publicaciones" activeClassName="activeNavBar"  className="dropdown">
                    <li className="dd-btn">
                            Publicaciones
                    </li>
                </NavLink>

                <NavLink to="/ser/contacto" activeClassName="activeNavBar" className="dropdown">
                    <li className="dd-btn">
                            Contacto
                    </li>
                </NavLink>

                <NavLink to="/ser/ayuda" activeClassName="activeNavBar"  className="dropdown">
                    <li className="dd-btn">
                            Ayuda
                    </li>
                </NavLink>
            </ul>
            <span className="scroll-indicator"></span>
        </div>
    </header>
    }
    return (
        <div>
            {nav}
        </div>
    );
};

export default NavBarDesktop;



