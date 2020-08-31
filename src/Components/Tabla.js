import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import FilasTabla from './FilasTabla';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';

import {postData} from '../utils/api';
import {getData} from '../utils/api';

const Tabla = ({ datos, isAdmin, tab, setDatos }) => {

    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(10);
    const [dataPerPage, setDataPerPage] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(3);

    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [editDialog, setEditDialog] = React.useState(false);
    const [createDialog, setCreateDialog] = React.useState(false);

    const [titulo, setTitulo] = useState("");
    const [autores, setAutores] = useState("");
    const [url, setUrl] = useState("");
    const [fecha, setFecha] = useState("");
    const [idPublicacion, setIdPublicacion] = useState("");
    const [categoriaPublicacion, setCategoriaPublicacion] = useState("");

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [mensaje, setMensaje] = useState("");


    const handleClickOpen = (option, titulo, autores, fecha, url, idPublicacion, categoriaPublicacion) => {
        setTitulo(titulo);
        setAutores(autores);
        setFecha(fecha);
        setUrl(url);
        setIdPublicacion(idPublicacion);
        setCategoriaPublicacion(tab.toString());
        
        if (option === 0) {
            setDeleteDialog(true);
        } else if(option === 1){
            setEditDialog(true);
        } else{
            setCreateDialog(true);
        }
    };

    const handleCreate = () => {
        if(titulo === "" || fecha === "" || autores === "" || url === ""){
            setMensaje("Llena todos los campos para continuar");
            setOpenSnackbar(true);
            return;
        }
        
        let aux = {
            "titulo": titulo,
            "anio": fecha,
            "autor": autores,
            "urlarchivo": url,
            "categoria": categoriaPublicacion,
            "fuentes_idfuentes": "0"
        }; 
        postData('/documento/create.php',aux).then(data => {
            if(data!=null){
                setMensaje(data.message);
                setOpenSnackbar(true);
                actualizarVista();
                handleClose();
            }
        });
    }

    const handleEdit = () => {
        let aux = {
            "iddocumentos":idPublicacion,
            "titulo": titulo,
            "anio": fecha,
            "autor": autores,
            "urlarchivo": url,
            "categoria": categoriaPublicacion,
            "fuentes_idfuentes": "0"
        };
        postData('/documento/update.php',aux).then(data => {
            setMensaje(data.message);
            setOpenSnackbar(true);
            actualizarVista();
            handleClose();
        });
    }

    const handleDelete = () => {
        let aux = {
            "iddocumentos":idPublicacion
        };
        postData('/documento/delete.php',aux).then(data => {
            setMensaje(data.message);
            setOpenSnackbar(true);
            actualizarVista();
            handleClose();
        });
    }


    const handleClose = () => {
        setDeleteDialog(false);
        setEditDialog(false);
        setCreateDialog(false);
    };

    const actualizarVista = () => {
        getData(`/documento/search.php?id=${tab}`).then(data => {
            setDatos(data); 
        });
    }

    useEffect(() => {
        if (datos) {
            setPageCount(Math.ceil(datos.length / perPage));
            let elements = datos.slice(offset, offset + perPage);
            setDataPerPage(elements);
            setCurrentPage(0);
        }
    }, [datos]);

    useEffect(() => {
            setOffset(currentPage * perPage);
            let elements = datos.slice(currentPage * perPage, currentPage * perPage + perPage);
            
            setDataPerPage(elements);
    }, [currentPage]);

    const handlePageClick = data => {
        let selected = data.selected;
        
        setCurrentPage(selected);
        
        window.scrollTo(0, 0);
        
    };

    return (
        <div>
            {
                isAdmin?
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <Button size="small" variant="contained" onClick={() => handleClickOpen(2,'', '', '', '', '')} color="secondary" style={{marginRight:'4em' ,background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} autoFocus>
                            {tab === 1?"Agregar documento":"Agregar cuenta económica"}
                        </Button>
                    </div>
                    :
                    null
            }
            
            <div className="lista">
                <div className="form-table">
                {
                        dataPerPage.length !== 0 ?
                        <table >
                            <thead>
                                <tr>
                                    <th scope="col">Título</th>
                                    <th scope="col">Autor/es</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            
                                <FilasTabla admin={isAdmin} dataPerPage={dataPerPage} handleClickOpen={handleClickOpen}></FilasTabla>
                                
                        </table>
                    :
                        null
                    }
                    {
                        pageCount !== 1 && dataPerPage.length !== 0 ?
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
                        :
                        null
                    }
                </div>
            </div>
            

            <Dialog
                open={deleteDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Eliminar"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Seguro desea eliminar el documento "{titulo}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button size="small" variant="outlined" onClick={handleClose} color="default">
                        CANCELAR
                    </Button>
                    <Button size="small" variant="contained" onClick={handleDelete} color="secondary" style={{margin:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} autoFocus>
                        ACEPTAR
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={editDialog}
                onClose={handleClose}
                scroll="body"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"Editar"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Desea editar el documento "{titulo}"?
                </DialogContentText>
                    <div>
                        <TextField defaultValue={titulo} onChange={e => setTitulo(e.target.value)} type="text" fullWidth id="nombre" label="Nombre" />
                        <TextField defaultValue={autores} onChange={e => setAutores(e.target.value)} type="text" fullWidth id="autores" label="Autores" />
                        <TextField defaultValue={fecha} onChange={e => setFecha(e.target.value)} type="number" fullWidth id="autores" label="Año" />
                        <TextField defaultValue={url} onChange={e => setUrl(e.target.value)} type="text" fullWidth id="autores" label="Link" />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button size="small" variant="outlined" onClick={handleClose} color="default">
                        Cancelar
                    </Button>
                    <Button size="small" variant="contained" onClick={handleEdit} color="secondary" style={{margin:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={createDialog}
                onClose={handleClose}
                scroll="body"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"Crear"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Desea agregar un nuevo documento?
                </DialogContentText>
                    <div>
                        <TextField  onChange={e => setTitulo(e.target.value)} type="text" fullWidth id="nombre" label="Nombre" />
                        <TextField  onChange={e => setAutores(e.target.value)} type="text" fullWidth id="autores" label="Autores" />
                        <TextField  onChange={e => setFecha(e.target.value)} type="number" fullWidth id="fecha" label="Año" />
                        <TextField  onChange={e => setUrl(e.target.value)} type="text" fullWidth id="link" label="Link" />
                        
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button size="small" variant="outlined" onClick={handleClose} color="default">
                        Cancelar
                    </Button>
                    <Button size="small" variant="contained" onClick={handleCreate} color="secondary" style={{margin:'0.5em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    open={openSnackbar}
                    autoHideDuration={4000}
                    onClose={() => {setOpenSnackbar(false)}}
                    message={mensaje}
                    action={
                        <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => {setOpenSnackbar(false)}}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                        </React.Fragment>
                    }
                />
        </div>
    )
};

export default Tabla;
