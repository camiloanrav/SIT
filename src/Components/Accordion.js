import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getData } from '../utils/api';
import { postData } from '../utils/api';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      padding:'1em',
    },
    summary:{
        borderBottom:1,
        background: "#eee",
        '&:hover': {
            background: "#ddd",
         },
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      fontWeight: "bold",
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));



export default function Accordion() {
    const classes = useStyles();
    const [save, setSave] = useState({});
    const [expanded, setExpanded] = React.useState("dimensiones");
    const [dimensions, setDimensions] = useState([]);
    const [map, setMap] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openDos, setOpenDos] = React.useState(false);
    const [data, setData] = React.useState();

    const handleClickOpen = (e) => {
        if(e === 1){
            setOpen(true);
        }else if(e === 2){
            setOpenDos(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setOpenDos(false);
    };

    useEffect(() =>{
        const RenderDimensions = (data) => {   

            return data.map(dimension => {
                const {iddimensiones, nombre, descripcion} = dimension;
    
                return (
                    <div key={iddimensiones} style={{backgroundColor:'#f4f4f4', borderRadius:'0.2em', minWidth:'15em', maxWidth:'20em', fontFamily:'roboto', boxShadow:'2px 2px 5px 1px rgba(0,0,0,0.3)', margin:'0.8em'}}>
                        <div style={{background:'linear-gradient(to right, rgba(70,70,70,1) 0%, rgba(0,0,0,1) 100%)', borderRadius:'0.2em 0.2em 0em 0em', padding:'0.5em'}}>
                            <p style={{ minHeight:'1.8em', lineHeight: '1.8em', color:'white', textAlign:'center', fontFamily:'roboto', fontSize:'1em'}}> 
                                {nombre}
                            </p>
                        </div>
                        
                        <div style={{padding:'1em 1em 0em 1em'}}>
                            <p style={{fontFamily:'roboto', textAlign:'left'}}>
                                {descripcion}
                            </p>
                        </div>
                        <hr></hr>
                        <div style={{position:'relative' , paddingBottom:'1em', paddingRight:'1em', textAlign:'right'}}>
                            <button onClick={()=>{handleClickOpen(1); setData(dimension);}} /* onClick={()=>handleSubmitDimension(value, iddimensiones)} */ className="button-card-uao">
                                EDITAR
                                <i class="fas fa-chevron-right" style={{marginLeft:'1em'}}></i>
                            </button>
                        </div>
                    </div>                  
                );
            });
        }
    
        const RenderMap = (data) =>{
            return data.map(mapa => {
                const {idinfo, nombre, capital, extension, poblacion, participacion} = mapa;
    
                return (
                    <div key={idinfo} style={{backgroundColor:'#f4f4f4', borderRadius:'0.2em', minWidth:'15em', maxWidth:'20em', fontFamily:'roboto', boxShadow:'2px 2px 5px 1px rgba(0,0,0,0.3)', margin:'0.8em'}}>
                        <div style={{background:'linear-gradient(to right, rgba(70,70,70,1) 0%, rgba(0,0,0,1) 100%)', borderRadius:'0.2em 0.2em 0em 0em', padding:'0.5em'}}>
                            <p style={{ minHeight:'1.8em', lineHeight: '1.8em', color:'white', textAlign:'center', fontFamily:'roboto', fontSize:'1em'}}> 
                                {nombre}
                            </p>
                        </div>
                        
                        <div style={{padding:'1em 1em 0em 1em'}}>
                            <p style={{fontFamily:'roboto', textAlign:'left'}}>
                                <ul>
                                    <li><b>Capital: </b> {capital}</li>
                                    <li><b>Extensión: </b>{extension}</li>
                                    <li><b>Población: </b>{poblacion}</li>
                                    <li><b>Participación PIB: </b>{participacion}</li>
                                </ul>
                            </p>
                            {/* <div class="input-form">
                                <label class="if-text-area" for="mensaje"></label>
                                <span class="wpcf7-form-control-wrap">
                                    <textarea onChange={updateInputValue} id="mensaje" name="mensaje" cols="40" rows="4" required="required"></textarea>
                                    <p class="message">Formato de nombre incorrecto</p>
                                </span>
                            </div> */}
                        </div>
                        <hr></hr>
                        <div style={{position:'relative' , paddingBottom:'1em', paddingRight:'1em', textAlign:'right'}}>
                            <button onClick={()=>{handleClickOpen(2); setData(mapa);}} /* onClick={()=>handleSubmitDimension(value, idinfo)} */ className="button-card-uao">
                                EDITAR
                                <i class="fas fa-chevron-right" style={{marginLeft:'1em'}}></i>
                            </button>
                        </div>
                    </div>
                );
            });
        }

        /* const getDimensiones = () =>{
            axios.get(`http://11.11.8.206/serpacificows/dimension/all.php`)
            .then(res => {
                setDimensions(RenderDimensions(res.data));
            })
            let dataFromServer = [{iddimensiones:"1", nombre:"Ambiente", descripcion:"Lorem dsadsad dsadasda dsads adsa d asd  asd sa dsadasdsadsa dsadasdas"},
            {"iddimensiones":"2", "nombre":"Economica", "descripcion":"Lorem dsadsad dsadasda dsads adsa d asd  asd sa dsadasdsadsa dsadasdas"},
            {"iddimensiones":"3", "nombre":"Social", "descripcion":"Lorem dsadsad dsadasda dsads adsa d asd  asd sa dsadasdsadsa dsadasdas"}];
            setDimensions(RenderDimensions(dataFromServer));
        } */
        getData('/dimension/all.php').then(data => {
            setDimensions(RenderDimensions(data)); 
        }).catch(error => console.log(error.data));

        getData('/informacion/all.php').then(data => {
            setMap(RenderMap(data)); 
        }).catch(error => console.log(error.data));
    
        /* const getMap = () => {
            axios.get(`http://11.11.8.206/serpacificows/informacion/all.php`)
            .then(res => {
                setMap(RenderMap(res.data));
            })
            let dataFromServer = [{"idinfo":"1", "nombre":"Valle", "capital":"Cali", "extension":"Lorem dsadsad dsadasda dsads adsa d asd  asd sa dsadasdsadsa dsadasdas", "poblacion":100, "participacion":10},
            {"idinfo":"2", "nombre":"Cauca", "capital":"Popayan", "extension":"Lorem dsadsad dsadasda dsads adsa d asd  asd sa dsadasdsadsa dsadasdas", "poblacion":100, "participacion":10},
            {"idinfo":"3", "nombre":"Nariño", "capital":"Pasto", "extension":"Lorem dsadsad dsadasda dsads adsa d asd  asd sa dsadasdsadsa dsadasdas", "poblacion":100, "participacion":10}];
            setMap(RenderMap(dataFromServer));
        }
        getDimensiones();
        getMap(); */
    },[data,save]);

    function updateInputValue(evt) {
        //setValue(evt.target.value);
        let aux = data;
        aux.descripcion = evt.target.value;
        setData(aux);
    }

    function updateInputMapa(evt) {
        if(evt.target.id === "1"){
            let aux = data;
            aux.capital = evt.target.value;
            setData(aux);
        } else if(evt.target.id === "2"){
            let aux = data;
            aux.extension = evt.target.value;
            setData(aux);
        } else if(evt.target.id === "3"){
            let aux = data;
            aux.poblacion = evt.target.value;
            setData(aux);
        }else if(evt.target.id === "4"){
            let aux = data;
            aux.participacion = evt.target.value;
            setData(aux);
        }
    }

    function handleSubmitDimension (elements) {
        postData('/dimension/update.php',elements).then(data => {
            console.log(data);
            setSave(data);
            handleClose();
        });
    }

    function handleSubmitMapa (elements) {
        postData('/informacion/update.php',elements).then(data => {
            console.log(data);
            setSave(data);
            handleClose();
        }); 
    }
    
    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    return (
      <div className={classes.root}>
                <ExpansionPanel expanded={expanded === "dimensiones"} onChange={handleChange("dimensiones")}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"dimensiones-bh-content"}
                        id={"dimensiones-bh-header"}
                        className={classes.summary}
                    >
                        <Typography className={classes.heading}>Dimensiones</Typography>
                        {/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
                    </ExpansionPanelSummary>
                    
                    <ExpansionPanelDetails>
                        {/* <Typography> */}
                            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                                {dimensions}
                            </div>
                        {/* </Typography> */}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === "mapa"} onChange={handleChange("mapa")}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"mapa-bh-content"}
                        id={"mapa-bh-header"}
                        className={classes.summary}
                    >
                        <Typography className={classes.heading}>Mapa</Typography>
                        {/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
                    </ExpansionPanelSummary>
                    
                    <ExpansionPanelDetails>
                        {/* <Typography> */}
                            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                                {map}
                            </div>
                        {/* </Typography> */}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Dimensiones</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Modificación de la descripción de la dimensión {data?data.nombre:''}
                    </DialogContentText>
                    <TextField onChange={updateInputValue}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Dimensión"
                        type="text"
                        color="secondary"
                        multiline={true}
                        defaultValue={data?data.descripcion:''}
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="inherit">
                        Cancelar
                    </Button>
                    <Button style={{background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)', color:'white'}} variant="contained" size="small" className={classes.button} endIcon={<SaveIcon />}  onClick={()=>handleSubmitDimension(data)}>
                        Guardar
                    </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openDos} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Mapa</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Modificación de la información del mapa en el departamento {data?data.nombre:''}
                    </DialogContentText>
                    <TextField onChange={updateInputMapa}
                        autoFocus
                        margin="dense"
                        id="1"
                        label="Capital"
                        type="text"
                        fullWidth
                        color="secondary"
                        defaultValue={data?data.capital:''}
                    />
                    <TextField onChange={updateInputMapa}
                        margin="dense"
                        id="2"
                        label="Extensión"
                        type="text"
                        fullWidth
                        color="secondary"
                        defaultValue={data?data.extension:''}
                    />
                    <TextField onChange={updateInputMapa}
                        margin="dense"
                        id="3"
                        label="Población"
                        type="text"
                        fullWidth
                        color="secondary"
                        defaultValue={data?data.poblacion:''}
                    />
                    <TextField onChange={updateInputMapa}
                        margin="dense"
                        id="4"
                        label="Participación PIB"
                        type="text"
                        fullWidth
                        color="secondary"
                        defaultValue={data?data.participacion:''}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="inherit">
                        Cancelar
                    </Button>
                    <Button style={{background:'linear-gradient(to right, #c4161c 0%, #9e0b0f  100%)', color:'white'}} variant="contained" size="small" className={classes.button} endIcon={<SaveIcon />} onClick={()=>handleSubmitMapa(data)}>
                        Guardar
                    </Button>
                    </DialogActions>
                </Dialog>
      </div>
    );
  }