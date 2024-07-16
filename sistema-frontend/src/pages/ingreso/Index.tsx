import React, { useState, useEffect } from "react";
import Layout from "@layouts/Layout";
import { TextField, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { ValidarIngreso } from "@customTypes/app/ingreso";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const Ingreso = () => {

    const navigate = useNavigate();
    
    const handleClickIngreso: SubmitHandler<ValidarIngreso> = (data) => {
            
        var url = import.meta.env.VITE_API_URL + "/ingreso";

        const id_toast = toast.loading("Procesando ...");

        axios.post(url, {"usuario" : data.usuario, "clave" : data.clave})
        .then(response => {

            console.log(response);

            const message = response.data.mensaje ? response.data.mensaje : "Datos incorrectos";

            if(response.data.estado == "1") {

                var token = response.data.datos;

                toast.update(id_toast, {render: "Bienvenido al sistema", type: "success", isLoading: false, autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });

                sessionStorage.setItem(import.meta.env.VITE_SESSION_NAME, token);

                setTimeout(() => {
                    navigate("/");
                    }, Number(import.meta.env.VITE_TIMEOUT_REDIRECT));

            } else {
                toast.update(id_toast, {render: message, type: "warning", isLoading: false, autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
            }     

        }).catch(error => {
            const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
            toast.update(id_toast, {render: message, type: "error", isLoading: false, autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
            console.log(error)
        })
          
    }

    const { register : registerIngreso, handleSubmit : handleSubmitIngreso, formState: { errors : errorsIngreso }, control : controlIngreso, setValue : setValueIngreso, clearErrors: cleanErrorsIngreso } = useForm<ValidarIngreso>({
        defaultValues: { 
            usuario : "",
            clave: "",
        }
    });

    return(
        <Layout>
            <div className="ingreso">
                <Card style={{ paddingBottom: 10 }}>
                    <form onSubmit={handleSubmitIngreso(handleClickIngreso)} noValidate>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div" align="center" style={{ paddingBottom: 10 }}>
                                Iniciar sesión
                            </Typography>
                            <TextField 
                                {...registerIngreso("usuario", { required: true })}
                                label="Usuario"
                                variant="outlined"
                                color="primary"
                                type="text"
                                sx={{ mb: 3 }}
                                fullWidth
                                error={ !!errorsIngreso.usuario }
                            />
                            <TextField 
                                {...registerIngreso("clave", { required: true })}
                                label="Clave"
                                variant="outlined"
                                color="primary"
                                type="password"
                                fullWidth
                                sx={{ mb: 1 }}
                                error={ !!errorsIngreso.clave }
                            />
                        </CardContent>
                        <CardActions>
                            <Button 
                                startIcon={<LoginIcon />}
                                style={{margin: "0 auto", display: "flex"}}
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Ingresar
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </div>
        </Layout>
    );

};

export default Ingreso;