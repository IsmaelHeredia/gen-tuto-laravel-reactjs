import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ActualizarCuenta } from "@customTypes/app/cuenta";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
});

const Account = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
    
      cleanErrorsCuenta();

      setOpen(true);

    };
  
    const handleClose = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {

        async function loadData() {

            var token = sessionStorage.getItem(import.meta.env.VITE_SESSION_NAME);

            var datosForm = {
                "token" : token
            };
    
            axios
            .post(import.meta.env.VITE_API_URL + "/validar", datosForm)
            .then(response => {
        
                const datos = response.data;
                const estado = datos.estado;
                const usuario_actual = datos.datos.username;
    
                if(estado == 1) {
                    setValueCuenta("usuario", usuario_actual);
                }
    
            })
            .catch(function (error) {
                const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
                console.log(message);
            })

        }

        loadData();

    }, []);
    
    const handleClickActualizarCuenta: SubmitHandler<ActualizarCuenta> = (data) => {

        const datosForm = {
            "usuario" : data.usuario,
            "nuevo_usuario" : data.nuevo_usuario,
            "clave" : data.clave,
            "nueva_clave" : data.nueva_clave
        };

        axios
        .post(import.meta.env.VITE_API_URL + "/cuenta", datosForm)
        .then(response => {

            const datos = response.data;
            const estado = datos.estado;
            const mensaje = datos.mensaje;

            if (estado == 1) {
                setOpen(false);

                toast.success(mensaje, {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});

                sessionStorage.setItem(import.meta.env.VITE_SESSION_NAME, "");
        
                setTimeout(() => {
                    navigate("/ingreso");
                }, Number(import.meta.env.VITE_TIMEOUT_REDIRECT));

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

    const { register : registerCuenta, handleSubmit : handleSubmitCuenta, formState: { errors : errorsCuenta }, control : controlCuenta, setValue : setValueCuenta, clearErrors: cleanErrorsCuenta } = useForm<ActualizarCuenta>({
        defaultValues: { 
            usuario : "",
            nuevo_usuario: "",
            clave: "",
            nueva_clave: ""
        }
    });
    
    return(
        <>
            <IconButton onClick={handleClickOpen}>
                <AccountCircleIcon />
            </IconButton>
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
                    <Typography variant="h4" component="div">Cuenta</Typography>
                </DialogTitle>
                <form onSubmit={handleSubmitCuenta(handleClickActualizarCuenta)} noValidate>
                    <DialogContent style={{ paddingTop: 10 }}>
                        <TextField 
                            {...registerCuenta("usuario", { required: true })}
                            label="Usuario actual"
                            required
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{ mb: 3 }}
                            fullWidth
                            disabled
                        />
                        <TextField 
                            {...registerCuenta("nuevo_usuario", { required: true })}
                            label="Nuevo usuario"
                            required
                            variant="outlined"
                            color="primary"
                            type="text"
                            sx={{ mb: 3 }}
                            fullWidth
                            error={ !!errorsCuenta.nuevo_usuario }
                        />
                        <TextField 
                            {...registerCuenta("clave", { required: true })}
                            label="Clave"
                            variant="outlined"
                            color="primary"
                            type="password"
                            fullWidth
                            sx={{ mb: 3 }}
                            error={ !!errorsCuenta.clave }
                        />
                        <TextField 
                            {...registerCuenta("nueva_clave", { required: true })}
                            label="Nueva clave"
                            variant="outlined"
                            color="primary"
                            type="password"
                            fullWidth
                            sx={{ mb: 3 }}
                            error={ !!errorsCuenta.nueva_clave }
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
        </>
    );

};

export default Account;