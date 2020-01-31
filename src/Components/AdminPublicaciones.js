import React from 'react';
import background from '../background.png';

const AdminPublicaciones = ({setTitulo}) => {
    setTitulo("Administrador / Publicaciones");
    return (
        <div>
            <div style={{height:'300px', backgroundImage:'url(https://assets.v7-io.invisionapp.com/assets/A_MGFjZjlkZDY2YjhlM2JmOXGduWSPr0GpJuqaftpafqx53KzkGVJp2YJV4wC0GGwX-uB8mz7Ur3_Bs2eXUUggftMV1yxHPBfd0cnVJyLiPeMkFQpPP3USKGgccBltcH9avxqwtxJaUxTOEsPJAtzVSrHrh7TdtPHKP89f8G5pPf2SWtSHrNd7wLC4ddhEBlem-sLodnCz8kpuMbHa9G5lXw==)', backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}></div>
        </div>
    );
};

export default AdminPublicaciones;