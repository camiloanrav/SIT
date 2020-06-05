import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import logo from '../logo-ser-2.png';
import background from '../background.png';

import {postData} from '../utils/api';

import  { Redirect } from 'react-router-dom';

const Login = (props) => {
    const [open, setOpen] = React.useState(false);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const [message, setMessage] = React.useState("");

    const [login, setLogin] = React.useState(true);

    const [values, setValues] = useState({
        user: '',
        password: '',
        newPass: '',
        validateNewPass: '',
        showPassword: false,
    });

    const handleLogin = () =>{
        let usuarioAux = {"usuario":values.user,"clave":values.password};
        postData('/usuario/enter.php',usuarioAux).then(data => {
            if(data===undefined){
                sessionStorage.setItem("login", values.user);
                window.location.reload(false);
            }else{
                alert(data.message);
            }
        });
    }

    const ProtectedComponent = () => {
        if (sessionStorage.getItem("login")){
            return <Redirect to='/administrador-inicio'  />
        }else{
            return null
        }
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenSnackbar(false);
    };

    const handleSend = () => {
        //Enviar contraseña al correo
        setMessage("Correo enviado de forma correcta.");
        setOpenSnackbar(true);
        setOpen(false);
    };
    
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleNewPass = () =>{
        if(values.newPass === values.validateNewPass && values.newPass!==""){
            setMessage("Contraseña cambiada");
        }else{
            setMessage("Las contraseñas no coinciden");
        }
        setOpenSnackbar(true);
    };

    return (
        <div style={{position:'absolute', height:'100vh', width:'100%',  backgroundImage:`url(${background})`, backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
                <div style={{backgroundColor:'white', width:'25em', minWidth:'18em', borderRadius:'1em', boxShadow:'3px 3px 5px 1px rgba(0,0,0,0.4)', margin:'4em 1em 0em 1em'}}>
                    {
                    login ? 
                    <div>
                        <div className="login-titulo" style={{ borderRadius:'1em 1em 0em 0em'}}>
                            <img alt="logo" style={{marginBottom:'-1em'}} src={logo} width="310em"></img>
                        </div>
                        <div className="login-contenido" style={{padding:'1em'}}>
                            <form noValidate autoComplete="off">
                                <TextField value={values.user} onChange={handleChange('user')} style={{marginBottom:'0.5em'}} fullWidth id="standard-basic" label="Usuario" />
                                <FormControl fullWidth>
                                    <InputLabel  htmlFor="standard-adornment-password">Contraseña</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </form>
                        </div>
                        <div className="login-acciones" style={{padding:'2em'}}>
                            <button onClick={handleLogin} className="button-card-uao" style={{width:'100%', marginBottom:'1.5em'}}>
                                INGRESAR
                            </button>
                            <a onClick={handleClickOpen} href="#/">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div> 
                    : 
                    <div>
                        <div className="login-titulo" style={{ borderRadius:'1em 1em 0em 0em'}}>
                            <img alt="logo" style={{marginBottom:'-1em'}} src={logo} width="310em"></img>
                        </div>
                        <div className="login-contenido" style={{padding:'1em'}}>
                            <form noValidate autoComplete="off">
                                <TextField type="password" value={values.newPass} onChange={handleChange('newPass')} style={{marginBottom:'0.5em'}} fullWidth id="newPass" label="Contraseña" />
                                <TextField type="password" value={values.validateNewPass} onChange={handleChange('validateNewPass')} style={{marginBottom:'0.5em'}} fullWidth id="validateNewPass" label="Validar Contraseña" />
                            </form>
                        </div>
                        <div className="login-acciones" style={{padding:'2em'}}>
                            <button onClick={handleNewPass} className="button-card-uao" style={{width:'100%', marginBottom:'1.5em'}}>
                                GUARDAR
                            </button>
                        </div>
                    </div>
                    
                    }
                    
                </div>
            </div>
            <ProtectedComponent></ProtectedComponent>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Olvidaste tu contraseña?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Se enviara un mensaje al correo de SER Pacífico, con el link para cambiar la contraseña.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button variant="outlined" onClick={handleClose} color="secondary">
                    Denegar
                </Button>
                <Button variant="outlined" onClick={handleSend} color="primary" autoFocus>
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
                onClose={handleClose}
                message={message}
                action={
                    <React.Fragment>
                      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
            />
        </div>
        
    );
};

export default Login;