import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useParams } from "react-router-dom";
import axios from "axios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DatosCancion = () => {

    let { id } = useParams();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpen(false);
    };

    const [cancion, setCancion] = useState({
        id: "",
        nombre: "",
        autor: "",
        genero: "",
        dificultad: "",
        afinacion: ""
    });

    useEffect(() => {

        async function loadData() {
        
            axios
                .get(import.meta.env.VITE_API_URL + "/canciones/" + id)
                .then(response => {
    
                  const datos = response.data;
                  const estado = datos.estado;
    
                  if (estado == 1) {
        
                      const cancion = datos.datos;
                      
                      setCancion({
                        id : cancion.id,
                        nombre: cancion.nombre,
                        autor: cancion.autor,
                        genero: cancion.genero.nombre,
                        dificultad: cancion.dificultad.nombre,
                        afinacion: cancion.afinacion.nombre
                      });
           
                  }
      
                })
                .catch(function (error) {
                    const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
                    console.log(message);
                })
        }

        loadData();
    
    }, []);
        
    return(
        <>

            <Button
                startIcon={<MusicNoteIcon />}
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleClickOpen}
                sx={{ ml: 2 }}
            >
                Canción
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="center"
                disableEscapeKeyDown
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    <Typography variant="h4" component="div">Datos</Typography>
                </DialogTitle>
                <DialogContent style={{ paddingTop: 10 }}>
                    <Typography sx={{ mb: 1 }}>Nombre : {cancion.nombre}</Typography>
                    <Typography sx={{ mb: 1 }}>Autor : {cancion.autor}</Typography>
                    <Typography sx={{ mb: 1 }}>Género : {cancion.genero}</Typography>
                    <Typography sx={{ mb: 1 }}>Dificultad : {cancion.dificultad}</Typography>
                    <Typography sx={{ mb: 1 }}>Afinación : {cancion.afinacion}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        startIcon={<CloseIcon />}
                        onClick={() => setOpen(false) }
                    >
                    Cerrar
                  </Button>
                </DialogActions>
            </Dialog>
        </>
    );

};

export default DatosCancion;