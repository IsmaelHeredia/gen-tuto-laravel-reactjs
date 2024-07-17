import LayoutAdmin from "@layouts/LayoutAdmin";
import { useState, useEffect } from "react";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ButtonGroup from "@mui/material/ButtonGroup";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Genero, Dificultad, Afinacion, Cancion, GuardarCancion, BuscarFiltro } from "@customTypes/app/canciones";
import { RootState } from "@reduxConfig/index";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@reduxConfig/slices/filtersSlice";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
});

const Home = () => {

    const filters: any = useSelector(
        (state: RootState) => state.filters
    );

    const dispatch = useDispatch();
      
    const [cargando, setCargando] = useState(true);

    const [canciones, setCanciones] = useState<Array<Cancion>>([]);

    const [paginationData, setPaginationData] = useState({
        total: 0,
        paginas: 0,
        actual: 0,
        anterior: 0,
        siguiente: 0
    });

    useEffect(() => {

        if(generos.length > 0) {            
            loadCanciones(1);
        }

    }, [filters]);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        
        setOpen(true);

        cleanErrorsCancion();

        setValueCancion("id", null);
        setValueCancion("nombre", "");
        setValueCancion("autor", "");
        setValueCancion("genero", null);
        setValueCancion("dificultad", null);
        setValueCancion("afinacion", null);
        setValueCancion("url_youtube", "");
        setValueCancion("detalles", "");  
    };
    
    const handleClose = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpen(false);
    };

    const [generos, setGeneros] = useState<Array<Genero>>([]);
    const [dificultades, setDificultades] = useState<Array<Dificultad>>([]);
    const [afinaciones, setAfinaciones] = useState<Array<Afinacion>>([]);

    useEffect(() => {

        async function loadData() {
        
          axios
              .get(import.meta.env.VITE_API_URL + "/datosCancion")
              .then(response => {

                const datos = response.data;
                const estado = datos.estado;

                if (estado == 1) {

                    const generos = datos.generos;
                    const dificultades = datos.dificultades;
                    const afinaciones = datos.afinaciones;
                    
                    setGeneros(generos);
                    setDificultades(dificultades);
                    setAfinaciones(afinaciones);

                    loadCanciones(1);
                
                }
    
              })
              .catch(function (error) {
                  const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
                  console.log(message);
              })
        }
    
        loadData();
    
    }, []);

    const loadCanciones = async(pagina: number) => {

        setCargando(true);

        const filtros = {
            "nombre" : filters.nombre,
            "id_genero" : filters.id_genero,
            "id_dificultad" : filters.id_dificultad,
            "id_afinacion" : filters.id_afinacion
        };

        axios
        .post(import.meta.env.VITE_API_URL + "/canciones/pagina/" + pagina, filtros)
        .then(response => {

          const datos = response.data.datos;
          const estado = response.data.estado;

          if (estado == 1) {

              const canciones_bd = datos.data;
              
              const canciones_pagina = new Array<Cancion>();

              canciones_bd.map(function(cancion: any) {
                  canciones_pagina.push({
                      id: cancion.id,
                      nombre: cancion.nombre,
                      autor: cancion.autor,
                      genero_nombre: cancion.genero.nombre,
                      dificultad_nombre: cancion.dificultad.nombre,
                      afinacion_nombre: cancion.afinacion.nombre
                  });
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

              setCanciones(canciones_pagina);

              setCargando(false);

          }

        })
        .catch(function (error) {
            const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
            console.log(message);
        })

    }

    const handleClickAtrasTodo = () => {
        loadCanciones(1);
    };

    const handleClickAtras = () => {
        const pagina = paginationData.anterior;
        loadCanciones(pagina);
    };

    const handleClickSiguiente = () => {
        const pagina = paginationData.siguiente;
        loadCanciones(pagina);
    };

    const handleClickSiguienteTodo = () => {
        const pagina = paginationData.paginas;
        loadCanciones(pagina);
    };

    const handleClickGuardarCancion: SubmitHandler<GuardarCancion> = (data) => {

        if(data.id == null || data.id == 0) {
        
            const datosForm = {
                "nombre" : data.nombre,
                "autor" : data.autor,
                "id_genero" : data.genero?.id,
                "id_dificultad" : data.dificultad?.id,
                "id_afinacion" : data.afinacion?.id,
                "url_youtube" : data.url_youtube,
                "detalles" : data.detalles
            };

            axios
            .post(import.meta.env.VITE_API_URL + "/canciones", datosForm)
            .then(response => {

                const datos = response.data;
                const estado = datos.estado;
                const mensaje = datos.mensaje;

                if (estado == 1) {
                    setOpen(false);
                    loadCanciones(1);
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
                "nombre" : data.nombre,
                "autor" : data.autor,
                "id_genero" : data.genero?.id,
                "id_dificultad" : data.dificultad?.id,
                "id_afinacion" : data.afinacion?.id,
                "url_youtube" : data.url_youtube,
                "detalles" : data.detalles
            };

            axios
            .put(import.meta.env.VITE_API_URL + "/canciones/" + data.id, datosForm)
            .then(response => {

                const datos = response.data;
                const estado = datos.estado;
                const mensaje = datos.mensaje;

                if (estado == 1) {
                    setOpen(false);
                    loadCanciones(1);
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

        }
                
    }

    const handleEditCancion = (id: number) => {

        cleanErrorsCancion();

        axios
        .get(import.meta.env.VITE_API_URL + "/canciones/" + id)
        .then(response => {

          const datos = response.data;
          const estado = datos.estado;

          if (estado == 1) {

            const cancion = datos.datos;
            
            setValueCancion("id", Number(id));
            setValueCancion("nombre", cancion.nombre);
            setValueCancion("autor", cancion.autor);
            setValueCancion("genero", { id: Number(cancion.genero.id), nombre : String(cancion.genero.nombre) });
            setValueCancion("dificultad", { id: Number(cancion.dificultad.id), nombre : String(cancion.dificultad.nombre) });
            setValueCancion("afinacion", { id: Number(cancion.afinacion.id), nombre : String(cancion.afinacion.nombre) });
            setValueCancion("url_youtube", cancion.url_youtube);
            setValueCancion("detalles", cancion.detalles);

            setOpen(true);
  
          }

        })
        .catch(function (error) {
            const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
            console.log(message);
        })

    };

    const handleDeleteCancion = (id: number) => {
        let data_cancion = canciones.find(c => c.id === id);
        let id_cancion = data_cancion ? data_cancion.id : 0;
        let nombre_cancion = data_cancion ? data_cancion.nombre : "";
        setConfirmDeleteCancionId(Number(id_cancion));
        setConfirmDeleteCancionNombre(nombre_cancion);
        setOpenConfirm(true);
    };

    const [openConfirm, setOpenConfirm] = useState(false);

    const [confirmDeleteCancionId, setConfirmDeleteCancionId] = useState(0);
    const [confirmDeleteCancionNombre, setConfirmDeleteCancionNombre] = useState("");
  
    const handleConfirmDelete = () => {

        axios
        .delete(import.meta.env.VITE_API_URL + "/canciones/" + confirmDeleteCancionId)
        .then(response => {

            const datos = response.data;
            const estado = datos.estado;
            const mensaje = datos.mensaje;

            if (estado == 1) {
                setOpen(false);
                loadCanciones(1);
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

        setOpenConfirm(false);
    }

    const handleCloseConfirm = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpenConfirm(false);
    };

    const handleClickFiltrar: SubmitHandler<BuscarFiltro> = (data) => {

        const datos = {
            "nombre" : data.buscarNombre,
            "id_genero" : (data.buscarGenero != null && data.buscarGenero.id != null) ? data.buscarGenero.id : 0,
            "nombre_genero" : (data.buscarGenero != null && data.buscarGenero.nombre != null) ? data.buscarGenero.nombre : "",
            "id_dificultad" : (data.buscarDificultad != null && data.buscarDificultad.id != null) ? data.buscarDificultad.id : 0,
            "nombre_dificultad" : (data.buscarDificultad != null && data.buscarDificultad.nombre != null) ? data.buscarDificultad.nombre : "",
            "id_afinacion" : (data.buscarAfinacion != null && data.buscarAfinacion.id != null) ? data.buscarAfinacion.id : 0,
            "nombre_afinacion" : (data.buscarAfinacion != null && data.buscarAfinacion.nombre != null) ? data.buscarAfinacion.nombre : ""
        };

        dispatch(setFilter(datos));
    };

    const handleClickBorrarFiltro = () => {

        dispatch(setFilter({
            "nombre" : "",
            "id_genero" : 0,
            "nombre_genero" : "",
            "id_dificultad" : 0,
            "nombre_dificultad" : "",
            "id_afinacion" : 0,
            "nombre_afinacion" : ""
        }));

        setValueFiltro("buscarNombre", "");
        setValueFiltro("buscarGenero", {"id" : 0, "nombre" : ""});
        setValueFiltro("buscarDificultad", {"id" : 0, "nombre" : ""});
        setValueFiltro("buscarAfinacion", {"id" : 0, "nombre" : ""})

    };

    const { register: registerFiltro , handleSubmit: handleSubmitFiltro , control : controlFiltro , setValue : setValueFiltro } = useForm<BuscarFiltro>({
        defaultValues: {
            buscarNombre: filters.nombre,
            buscarGenero: undefined,
            buscarDificultad: undefined,
            buscarAfinacion: undefined
        }
    });

    const { register : registerCancion, handleSubmit : handleSubmitCancion, formState: { errors : errorsCancion }, control : controlCancion, setValue : setValueCancion, clearErrors: cleanErrorsCancion } = useForm<GuardarCancion>({
        defaultValues: { 
            nombre : "",
            autor : "",
            genero : null,
            dificultad : null,
            afinacion : null,
            url_youtube : "",
            detalles : ""
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
                        Agregar canción
                    </Button>
                </Grid>
            </div>

            <Divider style={{width:"100%"}} />
            
                <form onSubmit={handleSubmitFiltro(handleClickFiltrar)}>

                    <Grid container justifyContent="center" alignItems="center" sx={{ mt : 2 }}>

                        <TextField
                            {...registerFiltro("buscarNombre", { required: false })}
                            label="Ingrese nombre"
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{ mb: 3, width: "20%" }}
                        />
                        <Controller
                            control={controlFiltro}
                            name="buscarGenero"
                            rules={{ required: false }}
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    onChange={(event, item) => {
                                        onChange(item);
                                    }}
                                    value={ (value == null && filters != null && filters.id_genero > 0) ? { id : Number(filters.id_genero), nombre : String(filters.nombre_genero) } : ((value != null && value.id > 0) ? value : null) }
                                    disablePortal
                                    options={generos}
                                    getOptionLabel={option => option.nombre}
                                    isOptionEqualToValue={(option, newValue) => {
                                        return option.id === newValue.id;
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Género" /> }
                                    sx={{ mb: 3, width: "10%" }}
                                />
                            )}
                        />
                        <Controller
                            control={controlFiltro}
                            name="buscarDificultad"
                            rules={{ required: false }}
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    onChange={(event, item) => {
                                        onChange(item);
                                    }}
                                    value={ (value == null && filters != null && filters.id_dificultad > 0) ? { id : Number(filters.id_dificultad), nombre : String(filters.nombre_dificultad) } : ((value != null && value.id > 0) ? value : null) }
                                    disablePortal
                                    options={dificultades}
                                    getOptionLabel={option => option.nombre}
                                    isOptionEqualToValue={(option, newValue) => {
                                        return option.id === newValue.id;
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Dificultad" /> }
                                    sx={{ mb: 3, width: "10%" }}
                                />
                            )}
                        />
                        <Controller
                            control={controlFiltro}
                            name="buscarAfinacion"
                            rules={{ required: false }}
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    onChange={(event, item) => {
                                        onChange(item);
                                    }}
                                    value={ (value == null && filters != null && filters.id_afinacion > 0) ? { id : Number(filters.id_afinacion), nombre : String(filters.nombre_afinacion) } : ((value != null && value.id > 0) ? value : null) }
                                    disablePortal
                                    options={afinaciones}
                                    getOptionLabel={option => option.nombre}
                                    isOptionEqualToValue={(option, newValue) => {
                                        return option.id === newValue.id;
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Afinación" /> }
                                    sx={{ mb: 3, width: "13%" }}
                                />
                            )}
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
                    <Typography variant="h4" component="div">Canción</Typography>
                </DialogTitle>
                <form onSubmit={handleSubmitCancion(handleClickGuardarCancion)} noValidate>
                    <DialogContent style={{ paddingTop: 10 }}>
                        <TextField 
                            {...registerCancion("nombre", { required: true })}
                            label="Nombre"
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{ mb: 3 }}
                            fullWidth
                            error={ !!errorsCancion.nombre }
                        />
                        <TextField 
                            {...registerCancion("autor", { required: true })}
                            label="Autor"
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{ mb: 3 }}
                            fullWidth
                            error={ !!errorsCancion.autor }
                        />
                        <Controller
                            control={controlCancion}
                            name="genero"
                            rules={{ required: "true" }}
                            render={({ field: { ref, onChange, ...field } }) => (
                                <Autocomplete
                                    {...field}
                                    onChange={(e, v) => onChange(v)}
                                    value={ (field.value != null && field.value.id > 0) ? field.value : null }
                                    options={generos}
                                    getOptionLabel={option => option.nombre}
                                    isOptionEqualToValue={(option, newValue) => {
                                        return option.id === newValue.id;
                                    }}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        inputRef={ref}
                                        error={!!errorsCancion?.genero}
                                        label="Género"
                                    />
                                    )}
                                    sx={{ mb: 3 }}
                                />
                            )}
                        />
                        <Controller
                            control={controlCancion}
                            name="dificultad"
                            rules={{ required: "true" }}
                            render={({ field: { ref, onChange, ...field } }) => (
                                <Autocomplete
                                    {...field}
                                    onChange={(e, v) => onChange(v)}
                                    value={ (field.value != null && field.value.id > 0) ? field.value : null }
                                    options={dificultades}
                                    getOptionLabel={option => option.nombre}
                                    isOptionEqualToValue={(option, newValue) => {
                                        return option.id === newValue.id;
                                    }}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        inputRef={ref}
                                        error={!!errorsCancion?.dificultad}
                                        label="Dificultad"
                                    />
                                    )}
                                    sx={{ mb: 3 }}
                                />
                            )}
                        />
                        <Controller
                            control={controlCancion}
                            name="afinacion"
                            rules={{ required: "true" }}
                            render={({ field: { ref, onChange, ...field } }) => (
                                <Autocomplete
                                    {...field}
                                    onChange={(e, v) => onChange(v)}
                                    value={ (field.value != null && field.value.id > 0) ? field.value : null }
                                    options={afinaciones}
                                    getOptionLabel={option => option.nombre}
                                    isOptionEqualToValue={(option, newValue) => {
                                        return option.id === newValue.id;
                                    }}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        inputRef={ref}
                                        error={!!errorsCancion?.afinacion}
                                        label="Afinación"
                                    />
                                    )}
                                    sx={{ mb: 3 }}
                                />
                            )}
                        />
                        <TextField 
                            {...registerCancion("url_youtube", { required: true })}
                            label="URL Youtube"
                            variant="outlined"
                            color="primary"
                            type="text"
                            fullWidth
                            sx={{mb: 3}}
                            error={ !!errorsCancion.url_youtube }
                        />
                        <TextField 
                            {...registerCancion("detalles", { required: true })}
                            label="Detalles"
                            variant="outlined"
                            color="primary"
                            type="text"
                            fullWidth
                            sx={{mb: 3}}
                            error={ !!errorsCancion.detalles }
                        />            
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
                    <Typography variant="h4" component="div">Confirmación</Typography>
                </DialogTitle>
                <DialogContent style={{ paddingTop: 10 }}>
                <Typography>Desea borrar la canción { confirmDeleteCancionNombre } ?</Typography>
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

            {cargando ?
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"30px"}}>
                    <CircularProgress />
                </div>
            :

                <>

                {canciones.length == 0 ?

                    <Typography variant="h5" className="center-div" style={{ marginTop:"30px" }}>No se encontraron canciones</Typography>

                :

                    <div className="datos-tabla">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell align="center">Autor</TableCell>
                                    <TableCell align="center">Género</TableCell>
                                    <TableCell align="center">Dificultad</TableCell>
                                    <TableCell align="center">Afinación</TableCell>
                                    <TableCell align="center">Opción</TableCell>
                                </TableRow>
                                </TableHead>    
                                <TableBody>
                                {canciones.map((cancion: Cancion) => (
                                    <TableRow
                                    key={cancion.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell>
                                        {cancion.nombre}
                                    </TableCell>
                                    <TableCell align="center">{cancion.autor}</TableCell>
                                    <TableCell align="center">{cancion.genero_nombre}</TableCell>
                                    <TableCell align="center">{cancion.dificultad_nombre}</TableCell>
                                    <TableCell align="center">{cancion.afinacion_nombre}</TableCell>
                                    <TableCell align="center">

                                        <IconButton onClick={() =>  handleEditCancion(Number(cancion.id))}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton onClick={() =>  handleDeleteCancion(Number(cancion.id))}>
                                            <DeleteIcon />
                                        </IconButton>

                                        <Link to={"capturas/" + cancion.id}>
                                            <IconButton>
                                                <PhotoLibraryIcon />
                                            </IconButton>
                                        </Link>

                                        <Link to={"tutoriales/" + cancion.id}>
                                            <IconButton>
                                                <LibraryMusicIcon />
                                            </IconButton>
                                        </Link>

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
                                    <IconButton disabled={ paginationData.actual == 1 } onClick={ handleClickAtrasTodo }>
                                        <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={ paginationData.actual == 1 } onClick={ handleClickAtras }>
                                        <KeyboardArrowLeftIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={ paginationData.actual == paginationData.paginas } onClick={ handleClickSiguiente }>
                                        <KeyboardArrowRightIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                    <IconButton disabled={ paginationData.actual == paginationData.paginas } onClick={ handleClickSiguienteTodo }>
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
  
export default Home;