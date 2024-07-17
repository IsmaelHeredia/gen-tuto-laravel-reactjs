import LayoutAdmin from "@layouts/LayoutAdmin";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ButtonGroup from "@mui/material/ButtonGroup";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";
import DatosCancion from "@components/DatosCancion";
import { styled } from "@mui/material/styles";
import { Cancion, Captura, CapturaOrdenar, GuardarCaptura, FiltrarCaptura } from "@customTypes/app/capturas";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
});

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});
  
const ListarCapturas = () => {

    const navigate = useNavigate();

    let { id } = useParams();

    const images_url = import.meta.env.VITE_IMAGES_URL;

    const [filtrarNombre, setFiltrarNombre] = useState("");
    const [seFiltro, setSeFiltro] = useState(false);  

    const [cargando, setCargando] = useState(true);

    const [cancion, setCancion] = useState<Cancion | null>(null);
    const [capturas, setCapturas] = useState<Array<Captura>>([]);
    const [capturasOrdenar, setCapturasOrdenar] = useState<Array<CapturaOrdenar>>([]);
    const [mostrarImagen, setMostrarImagen] = useState("");

    const [paginationData, setPaginationData] = useState({
        total: 0,
        paginas: 0,
        actual: 0,
        anterior: 0,
        siguiente: 0
    });

    async function loadData() {
        
        axios
            .get(import.meta.env.VITE_API_URL + "/datosCaptura/" + id)
            .then(response => {

              const datos = response.data;
              const estado = datos.estado;

              if (estado == 1) {

                  const cancion = datos.cancion;
                  const capturas = datos.capturas;
                  
                  setCancion(cancion);
                  setCapturasOrdenar(capturas);

                  if(openOrder == false) {
                    loadCapturas(1);     
                  }          
              }
  
            })
            .catch(function (error) {
                const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
                console.log(message);
            })
    };

    useEffect(() => {
    
        loadData();
    
    }, []);

    const loadCapturas = async(pagina: number) => {

        setCargando(true);

        axios
        .post(import.meta.env.VITE_API_URL + "/capturas/pagina/" + pagina, { "nombre" : filtrarNombre })
        .then(response => {

          const datos = response.data.datos;
          const estado = response.data.estado;

          if (estado == 1) {

              const capturas_bd = datos.data;
              
              const capturas_pagina = new Array<Captura>();

              capturas_bd.map(function(captura: any) {
                  capturas_pagina.push({
                      id : captura.id,
                      nombre: captura.nombre,
                      imagen: captura.imagen,
                      orden: captura.orden
                  })
              });

              const total = parseInt(datos.total);
              const paginas = parseInt(datos.last_page);
              const actual = parseInt(datos.current_page);
              const anterior = (actual - 1) > 0 ? (actual - 1) : 0;
              const siguiente = (actual + 1) < total ? (actual + 1) : total;

              setPaginationData({
                total: total,
                paginas: paginas,
                actual: actual,
                anterior: anterior,
                siguiente: siguiente
              });

              setCapturas(capturas_pagina);

              setCargando(false);

          }

        })
        .catch(function (error) {
            const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
            console.log(message);
        })

    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        
        cleanErrorsCaptura();

        setValueCaptura("id", 0);
        setValueCaptura("nombre", "");
        setValueCaptura("imagen", "");
        setMostrarImagen("");
        setValueCaptura("orden", 0);

        setOpen(true);
    
    };
    
    const handleClose = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpen(false);
    };

    const handleFileImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files) {

          const reader = new FileReader();

          reader.onload = (e) => {

            setValueCaptura("imagen", String(reader.result), { shouldValidate: true, shouldDirty: true});
            setMostrarImagen(String(reader.result));

          }

          reader.readAsDataURL(event.target.files[0]);

        }
    };
    
    const handleClickAtrasTodo = () => {
        loadCapturas(1);
    };

    const handleClickAtras = () => {
        const pagina = paginationData.anterior;
        loadCapturas(pagina);
    };

    const handleClickSiguiente = () => {
        const pagina = paginationData.siguiente;
        loadCapturas(pagina);
    };

    const handleClickSiguienteTodo = () => {
        const pagina = paginationData.paginas;
        loadCapturas(pagina);
    };

    const handleClickGuardarCaptura: SubmitHandler<GuardarCaptura> = (data) => {

        if(data.id == null || data.id == 0) {

            var orden = 1;

            if(capturasOrdenar.length > 0) {
                var captura = capturasOrdenar[capturasOrdenar.length - 1];
                var orden_captura = captura.orden;
                orden = orden_captura + 1;
            }
        
            const datosForm = {
                "id_cancion" : id,
                "nombre" : data.nombre,
                "imagen" : mostrarImagen,
                "orden" : orden
            };

            axios
            .post(import.meta.env.VITE_API_URL + "/capturas", datosForm)
            .then(response => {

                const datos = response.data;
                const estado = datos.estado;
                const mensaje = datos.mensaje;

                if (estado == 1) {
                    setOpen(false);
                    loadCapturas(1);
                    toast.success(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
                } else {
                    toast.warning(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
                }

            })
            .catch(function (error) {
                const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
                console.log(message);
                toast.error(message, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
            })

        } else {

            const datosForm = {
                "id_cancion" : id,
                "nombre" : data.nombre,
                "imagen" : mostrarImagen,
                "orden" : data.orden
            };

            axios
            .put(import.meta.env.VITE_API_URL + "/capturas/" + data.id, datosForm)
            .then(response => {

                const datos = response.data;
                const estado = datos.estado;
                const mensaje = datos.mensaje;

                if (estado == 1) {
                    setOpen(false);
                    loadCapturas(1);
                    toast.success(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
                } else {
                    toast.warning(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
                }

            })
            .catch(function (error) {
                const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
                console.log(message);
                toast.success(message, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
            })                

        }
                
    };

    const handleEditCaptura = (id: number) => {

        cleanErrorsCaptura();

        axios
        .get(import.meta.env.VITE_API_URL + "/capturas/" + id)
        .then(response => {

          const datos = response.data;
          const estado = datos.estado;

          if (estado == 1) {

            const captura = datos.datos;
              
            setValueCaptura("id", Number(id));
            setValueCaptura("nombre", captura.nombre);
            setValueCaptura("imagen", captura.imagen);
            setMostrarImagen(captura.imagen);
            setValueCaptura("orden", captura.orden);

            setOpen(true);
            
          }

        })
        .catch(function (error) {
            const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
            console.log(message);
        })

    }

    const handleDeleteCaptura = (id: number) => {
        let data_captura = capturas.find(c => c.id === id);
        let id_captura = data_captura ? data_captura.id : 0;
        let nombre_captura = data_captura ? data_captura.nombre : "";
        setConfirmDeleteCapturaId(id_captura);
        setConfirmDeleteCapturaNombre(nombre_captura);
        setOpenConfirm(true);
    };

    const [openConfirm, setOpenConfirm] = useState(false);

    const [confirmDeleteCapturaId, setConfirmDeleteCapturaId] = useState(0);
    const [confirmDeleteCapturaNombre, setConfirmDeleteCapturaNombre] = useState("");
  
    const handleConfirmDelete = () => {

        axios
        .delete(import.meta.env.VITE_API_URL + "/capturas/" + confirmDeleteCapturaId)
        .then(response => {

            const datos = response.data;
            const estado = datos.estado;
            const mensaje = datos.mensaje;

            if (estado == 1) {
                setOpen(false);
                loadCapturas(1);
                toast.success(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
            } else {
                toast.warning(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
            }

        })
        .catch(function (error) {
            const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
            console.log(message);
            toast.success(message, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
        }) 

        setOpenConfirm(false);
    };

    const handleCloseConfirm = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpenConfirm(false);
    };

    const [openOrder, setOpenOrder] = useState(false);

    useEffect(() => {
    
        if(openOrder == true) {
            loadData();
        }
    
    }, [openOrder]);

    const handleClickOpenOrder = () => {
        setOpenOrder(true);
    };

    const handleConfirmOrder = () => {

        const lista = capturasOrdenar;

        var contador = 1;

        const lista_nueva: CapturaOrdenar[] = [];

        lista.forEach(function(valor,index) {
            valor.orden = contador;
            lista_nueva.push(valor);
            contador++;
        });

        const enviarDatos = {
            "capturas" : lista_nueva
        };

        axios
        .put(import.meta.env.VITE_API_URL + "/cancion/" + id + "/capturas/ordenar", enviarDatos)
        .then(response => {

          const datos = response.data;
          const estado = datos.estado;

          if (estado == 1) {
              loadCapturas(1);
              setOpenOrder(false);
          }

        })
        .catch(function (error) {
            const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
            console.log(message);
        })
        
    };

    const handleCloseOrder = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpenOrder(false);
    };

    const handleUpCaptura = async(id: number) => {

        let lista = capturasOrdenar;

        let data_captura = lista.find(c => c.id === id);
        let orden_captura = data_captura?.orden;

        let index_actual = 0;

        lista.forEach(function(valor,index) {
            if(valor.orden == orden_captura) {
                index_actual = index;
            }
        });

        let index_anterior = index_actual - 1;

        if(typeof (lista[index_anterior]) !== "undefined") {
            let valor_anterior = lista[index_anterior];
            let valor_actual = lista[index_actual];
            lista[index_anterior] = valor_actual;
            lista[index_actual] = valor_anterior;
        }

        const datosNuevos = [...lista];

        setCapturasOrdenar(datosNuevos);

    };

    const handleDownCaptura = async(id: number) => {

        let lista = capturasOrdenar;
          
        let data_captura = lista.find(c => c.id === id);
        let orden_captura = data_captura?.orden;

        let index_actual = 0;

        lista.forEach(function(valor,index) {
            if(valor.orden == orden_captura) {
                index_actual = index;
            }
        });

        let index_siguiente = index_actual + 1;

        if(typeof (lista[index_siguiente]) !== "undefined") {
            let valor_siguiente = lista[index_siguiente];
            let valor_actual = lista[index_actual];
            lista[index_siguiente] = valor_actual;
            lista[index_actual] = valor_siguiente;
        }

        const datosNuevos = [...lista];

        setCapturasOrdenar(datosNuevos);

    };

    useEffect(() => {
    
        if(seFiltro == true) {
            loadCapturas(1);
            setSeFiltro(false);
        }
    
    }, [seFiltro]);

    const handleClickFiltrar: SubmitHandler<FiltrarCaptura> = (data) => {
        setFiltrarNombre(data.buscarNombre);
        setSeFiltro(true);
    };

    const handleClickBorrarFiltro = () => {
        setValueFiltro("buscarNombre", "");
        setFiltrarNombre("");
        setSeFiltro(true);
    };

    const { register : registerCaptura, handleSubmit : handleSubmitCaptura, formState: { errors : errorsCaptura }, control : controlCaptura, setValue : setValueCaptura, clearErrors: cleanErrorsCaptura, getValues : getValueCaptura } = useForm<GuardarCaptura>({
        defaultValues: { 
            nombre : "",
            imagen: "",
        }
    });

    const { register: registerFiltro , handleSubmit: handleSubmitFiltro , control : controlFiltro , setValue : setValueFiltro } = useForm<FiltrarCaptura>({
        defaultValues: {
            buscarNombre: "",
        }
    });

    return(
        <LayoutAdmin>

            <div className="botones-principales">
                <Grid container justifyContent="flex-start" sx={{ mt: 10 }}>
                    <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={ handleClickOpen }
                    >
                        Agregar captura
                    </Button>
                    <Button
                        startIcon={<SwapVertIcon />}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={ handleClickOpenOrder }
                        sx={{ ml: 2 }}
                    >
                        Ordenar
                    </Button>
                    <DatosCancion />
                    <Button
                        startIcon={<ArrowBackIcon />}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => navigate("/") }
                        sx={{ ml: 2 }}
                    >
                        Volver
                    </Button>
                </Grid>
            </div>
            <Divider style={{ width:"100%" }} />
            <form onSubmit={handleSubmitFiltro(handleClickFiltrar)}>
                <Grid container justifyContent="center" alignItems="center" sx={{ mt : 2 }}>
                    <TextField 
                        {...registerFiltro("buscarNombre", { required: false })}
                        label="Ingrese nombre"
                        variant="outlined"
                        color="primary"
                        type="text"
                        sx={{ mb: 3, width: "25%" }}
                    />
                    <div style={{ marginBottom: "25px" }}>
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}
                            sx={{ ml: 1 }}
                        >
                            Filtrar
                        </Button>
                        <Button 
                            variant="contained"
                            color="primary"
                            startIcon={<ClearIcon />}
                            sx={{ ml: 1 }}
                            onClick={ handleClickBorrarFiltro }
                        >
                            Borrar
                        </Button>
                    </div>
                </Grid>
            </form>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="center"
                disableEscapeKeyDown
            >
                <DialogTitle>
                    <Typography variant="h4">Captura</Typography>
                </DialogTitle>
                <form onSubmit={handleSubmitCaptura(handleClickGuardarCaptura)} noValidate>
                    <DialogContent style={{ paddingTop: 10 }}>
                        <TextField 
                            {...registerCaptura("nombre", { required: true })}
                            label="Nombre"
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{ mb: 3 }}
                            fullWidth
                            error={ !!errorsCaptura.nombre }
                        />

                        <Grid container>
                            <Grid item xs={6}> 
                                {
                                    mostrarImagen == ""
                                    ?
                                        <Typography style={{ color: !!errorsCaptura.imagen ? "#680003" : "default"}}>Seleccione una imagen</Typography>
                                    :
                                        mostrarImagen.indexOf(".jpg") > -1 || mostrarImagen.indexOf(".png") > -1
                                        ?
                                            <img className="imagen" src={images_url + "/" + mostrarImagen} />
                                        :
                                            <img className="imagen" src={mostrarImagen} />
                                }
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                Subir
                                    <VisuallyHiddenInput
                                        {...registerCaptura("imagen", { required: mostrarImagen == "" ? true : false })}
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg"
                                        onChange={handleFileImagenChange}
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            startIcon={<CloseIcon />}
                            onClick={() => setOpen(false) }
                        >
                            Cerrar
                        </Button>
                        <Button 
                            startIcon={<SaveIcon />}
                            color="primary"
                            type="submit"
                        >
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="center"
                disableEscapeKeyDown
            >
                <DialogTitle>
                    <Typography variant="h4">Confirmación</Typography>
                </DialogTitle>
                <DialogContent style={{ paddingTop: 10 }}>
                <Typography>Desea borrar la captura { confirmDeleteCapturaNombre } ?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                        startIcon={<CloseIcon />}
                        onClick={() => setOpenConfirm(false) }
                    >
                        Cerrar
                    </Button>
                    <Button 
                        startIcon={<DeleteIcon />}
                        color="primary"
                        type="submit"
                        onClick={ handleConfirmDelete }
                    >
                        Borrar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openOrder}
                onClose={handleCloseOrder}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="center"
                disableEscapeKeyDown
            >
                <DialogTitle>
                    <Typography variant="h4">Ordenar capturas</Typography>
                </DialogTitle>
                <DialogContent style={{ paddingTop: 10 }}>
                    <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="center">Imagen</TableCell>
                            <TableCell align="center">Opción</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {capturasOrdenar.map((captura: Captura) => (
                            <TableRow
                            key={captura.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {captura.nombre}
                            </TableCell>
                            <TableCell align="center">
                                <img className="imagen" src={images_url + "/" + captura.imagen} />
                            </TableCell>
                            <TableCell align="center">

                                <IconButton onClick={() =>  handleUpCaptura(captura.id)}>
                                    <ArrowUpwardIcon />
                                </IconButton>

                                <IconButton onClick={() =>  handleDownCaptura(captura.id)}>
                                    <ArrowDownwardIcon />
                                </IconButton>

                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button 
                        startIcon={<CloseIcon />}
                        onClick={() => setOpenOrder(false) }
                    >
                        Cerrar
                    </Button>
                    <Button 
                        startIcon={<SaveIcon />}
                        color="primary"
                        type="submit"
                        onClick={ handleConfirmOrder }
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            {cargando ?
                <div className="center-div" style={{ marginTop:"30px" }}>
                    <CircularProgress className="center-div" style={{ marginTop:"30px" }} />
                </div>
            :

                <>
                
                {capturas.length == 0 ?

            
                    <Typography variant="h5" className="center-div" style={{ marginTop:"30px" }}>No se encontraron capturas</Typography>

                :
                
                    <div className="datos-tabla">

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell align="center">Imagen</TableCell>
                                        <TableCell align="center">Opción</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {capturas.map((captura: Captura) => (
                                        <TableRow
                                            key={captura.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {captura.nombre}
                                            </TableCell>
                                            <TableCell align="center">
                                                <a href={images_url + "/" + captura.imagen} target="_blank">
                                                    <img className="imagen" src={images_url + "/" + captura.imagen} />
                                                </a>
                                            </TableCell>
                                            <TableCell align="center">

                                                <IconButton onClick={() => handleEditCaptura(captura.id)}>
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton onClick={() => handleDeleteCaptura(captura.id)}>
                                                    <DeleteIcon />
                                                </IconButton>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <Typography style={{ float: "left", marginTop: "20px" }}>
                                Página {paginationData.actual} / {paginationData.paginas}
                            </Typography>
                            <div style={{ float: "right" }}>
                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                    <IconButton disabled={ paginationData.actual == 1 } onClick={handleClickAtrasTodo}>
                                        <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={ paginationData.actual == 1 } onClick={handleClickAtras}>
                                        <KeyboardArrowLeftIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={ paginationData.actual == paginationData.paginas } onClick={handleClickSiguiente}>
                                        <KeyboardArrowRightIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={ paginationData.actual == paginationData.paginas } onClick={handleClickSiguienteTodo}>
                                        <KeyboardDoubleArrowRightIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                </ButtonGroup>
                            </div>
                        </div>

                    </div>
                    
                }

                </>
                
            }

        </LayoutAdmin>
    );

};

export default ListarCapturas;