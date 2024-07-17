import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
});

const About = () => {

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

    return(
        <>
            <IconButton onClick={handleClickOpen}>
                <InfoIcon />
            </IconButton>
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
                    <Typography variant="h4" component="div">About</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ mb:1 }}>Nombre : Generador de tutoriales</Typography>
                    <Typography sx={{ mb:1 }}>Version : 1.0</Typography>
                    <Typography>Autor : Ismael Heredia</Typography>                    
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

export default About;