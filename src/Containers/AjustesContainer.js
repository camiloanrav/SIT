import React, {useState} from 'react';

import Titulo from '../Components/Titulo';
import Footer from '../Components/Footer';

import NavBarDesktop from '../Components/NavBarDesktop';
import NavBarMovil from '../Components/NavBarMovil';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import IconButton from '@material-ui/core/IconButton';

import  { Redirect } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {postData} from '../utils/api';

const AjustesContainer = () => {
    let titulo = "Administrador / Ajustes";
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const [message, setMessage] = React.useState("");

    const [values, setValues] = useState({
        user: 'adminser',
        password: '',
        newPass: '',
        email: 'serpacifico@uao.edu.co',
        validateNewPass: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleNewPass = () =>{
        if(values.newPass === values.validateNewPass && values.newPass!==""){
            let post = {
                "usuario":values.user,
                "correo":values.email,
                "clave":values.newPass
            }
    
            postData('/usuario/olvidacontra.php',post).then(data => {
                if(data!==undefined){
                    setMessage("Contraseña cambiada");
                    setOpenDialog(false);
                    setOpenSnackbar(true);
                }else{
                    setOpenDialog(false);
                }
            });
        }else{
            setMessage("Las contraseñas no coinciden");
            setOpenSnackbar(true);
        }
    };

    const ProtectedComponent = () => {
        if (sessionStorage.getItem("login")){
            return null
        }else{
            return <Redirect to='/ser/login'  />
        }
    }

    return (
        <div>
            <NavBarDesktop user={"administrador"}></NavBarDesktop>
            <NavBarMovil user={"administrador"}></NavBarMovil>
            <Titulo titulo={titulo}></Titulo>
            <div className="login-acciones" style={{padding:'1em', minHeight:'18em'}}>
                <Button onClick={()=>{setOpenDialog(true)}} color="primary" autoFocus style={{margin:'5em 1em 1em 1em', background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)'}} variant="contained" size="medium" color="secondary">
                    CAMBIAR CONTRASEÑA
                </Button>
            </div>
            <ProtectedComponent></ProtectedComponent>
            <Footer></Footer>
            <Dialog
                open={openDialog}
                onClose={()=>{setOpenDialog(false);}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Desea cambiar su contraseña?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <form noValidate autoComplete="off">
                        <TextField type="password" value={values.newPass} onChange={handleChange('newPass')} style={{marginBottom:'0.5em'}} fullWidth id="newPass" label="Nueva Contraseña" />
                        <TextField type="password" value={values.validateNewPass} onChange={handleChange('validateNewPass')} style={{marginBottom:'0.5em'}} fullWidth id="validateNewPass" label="Validar Contraseña" />
                    </form>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button variant="outlined" onClick={()=>{setOpenDialog(false)}} color="secondary">
                    Cancelar
                </Button>
                <Button variant="outlined" onClick={handleNewPass} color="primary" autoFocus>
                    Confirnar
                </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={()=>{setOpenSnackbar(false)}}
                message={message}
                action={
                    <React.Fragment>
                      <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{setOpenSnackbar(false)}}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
            />
        </div>
    );
};

export default AjustesContainer;