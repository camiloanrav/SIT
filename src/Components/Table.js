import React, {Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, useParams} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import RowsTable from '../Components/RowsTable';


/* export class CommentList extends React.Component {

    render() {
        let commentNodes = this.props.dataPerPage.map(function(d, index) {
            return <tr key={index}>
                    <td data-table-header="Título">{d.titulo}</td>
                    <td data-table-header="Autor/es">{d.autor}</td>
                    <td data-table-header="Acciones"> <Link target="_blank" to={d.urlarchivo}>Descargar</Link></td>
                </tr>;
        });
        return (
            <tbody> 
              {commentNodes}
            </tbody> 
        );
    }
} */


const Table = ({datos}) => {
    
    /* const [data, setData] = useState([]); */
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(10);
    const [dataPerPage, setDataPerPage] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(3);
    

    /* useEffect(() => {
        setData(datos);
    }, [datos] ); */

    useEffect(() => {
        setPageCount(Math.ceil(datos.length /perPage));
        setOffset(0 * perPage);
        let elements = datos.slice(offset, offset + perPage);
        setDataPerPage(elements);
        setCurrentPage(0);
    }, [datos] );

    /* const loadCommentsFromServer = () => {
        
        axios({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/posts",
        }).then((res) => {
            console.log("RES: "+ JSON.stringify(res));
       
            this.setState({
                data: res.data,
            });
            
            this.setState({
                pageCount: Math.ceil(data.length /perPage),
            });

            this.asignData(0);
            
            //setData(datos);
            
        })
    } */

    useEffect(() => {
        const asignData = () => {
            setOffset(currentPage * perPage);
            let elements = datos.slice(offset, offset + perPage);
            setDataPerPage(elements);
        }
        asignData();
    }, [currentPage] );

    const handlePageClick = data => {
        let selected = data.selected;
        //asignData(selected);
        setCurrentPage(selected);
    };

    

    
    return(
        <div>
            <div className="lista">                
                <div className="form-table">
                    <table >
                        <thead>
                            <tr>
                                <th scope="col">Título</th>
                                <th scope="col">Autor/es</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        {/* <CommentList dataPerPage={dataPerPage} /> */}
                        <RowsTable dataPerPage={dataPerPage}></RowsTable>
                        <tbody>
                            
                        </tbody>
                        
                    </table>
                    
                    <ReactPaginate
                                    previousLabel={'Anterior'}
                                    nextLabel={<div>Siguiente</div>}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    breakLinkClassName={'break-link'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'subpagination'}
                                    activeClassName={'active-page'}
                                    activeLinkClassName={'active-link'}
                                    previousClassName={'next'}
                                    nextClassName={'next'}
                                    pageClassName={'page'}
                                    pageLinkClassName={'page-link'}
                                    forcePage={currentPage}
                                    />
                </div>
            </div>
        </div>
    )
};



Table.propTypes = {};

export default Table;
