import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, useParams} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import axios from "axios";

export class CommentList extends React.Component {
  
    render() {
        let commentNodes = this.props.dataPerPage.map(function(id, index) {
            return <tr key={index}>
                    <td data-table-header="Título">Epa</td>
                    <td data-table-header="Autor/es">{id.id}</td>
                    <td data-table-header="Acciones">17</td>
                </tr>;
        });
        return (
            <tbody> 
              {commentNodes}
            </tbody> 
        );
    }
  }

class Table extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          offset:0,
          pageCount:10,
          dataPerPage:[],
          perPage:10,
        };
    }

    loadCommentsFromServer() {
        axios({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/posts",
        }).then((res) => {
            console.log("RES: "+ JSON.stringify(res));
            
            this.setState({
                data: res.data,
            });
            
            this.setState({
                pageCount: Math.ceil(this.state.data.length /this.state.perPage),
            });

            this.asignData(0);
        })
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    handlePageClick = data => {
        let selected = data.selected;
        this.asignData(selected);
    };

    asignData(selected) {
        let offset =  selected * this.state.perPage
        let elements = this.state.data.slice(offset, offset + this.state.perPage);
        this.setState({
            offset: offset,
            dataPerPage:elements
        });
        
    }

    render() {
        const {contenido} = this.props;
        
        const body = (

            <div>
                <div className="lista">                
                    <div className="form-table">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Título</th>
                                    <th scope="col">Autor/es</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <CommentList dataPerPage={this.state.dataPerPage} />
                            
                        </table>
                        <ReactPaginate
                                        previousLabel={'Anterior'}
                                        nextLabel={'Siguiente'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={this.state.pageCount}
                                        marginPagesDisplayed={4}
                                        pageRangeDisplayed={4}
                                        onPageChange={this.handlePageClick}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                        />
                    </div>
                </div>
            </div>
        );

        return (
            <div> {body} </div>
        );
    };


};

Table.propTypes = {};

export default Table;
