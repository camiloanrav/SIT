import React from 'react';
import PropTypes from 'prop-types';
import ContactoMenu from '../Components/ContactoMenu';
import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';
import Footer from '../Components/Footer';

const ContactoContainer = props => {
    return (
        <div>
            <NavBarDesktop></NavBarDesktop>
            <NavBarMovil></NavBarMovil>
            <ContactoMenu></ContactoMenu>
            <Footer></Footer>
        </div>
    );
};

ContactoContainer.propTypes = {
    
};

export default ContactoContainer;