import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import BarChartIcon from "@mui/icons-material/BarChart";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import axios from "axios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
});

const Chart = () => {

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

    const [datosGrafico, setDatosGrafico] = useState<Array<any>>([]);

    const colores = ["#0088FE", "#00C49F", "#FFBB28"];

    useEffect(() => {

      async function loadData() {
      
        axios
            .get(import.meta.env.VITE_API_URL + "/estadisticas")
            .then(response => {

              const datos = response.data;
              const estado = datos.estado;

              if (estado == 1) {

                  const generos = datos.datos;

                  const registros = new Array();

                  generos.map(function(genero: any, index: number) {

                    registros.push({
                      name: genero.nombre_genero,
                      value: genero.cantidad,
                      fill: colores[index]
                    });

                  });

                  setDatosGrafico(registros);
              
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
            <IconButton onClick={handleClickOpen}>
                <BarChartIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="center"
                fullWidth
                maxWidth="sm"
                disableEscapeKeyDown
            >
                <DialogTitle>
                    <Typography fontSize={30}>Cantidad de canciones por género</Typography>
                </DialogTitle>
                <DialogContent>
                    <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }} className="grafico">
                    <PieChart width={400} height={400}>
                      <Pie
                        dataKey="value"
                        data={datosGrafico}
                        cx="50%"
                        cy="50%"
                        innerRadius={100}
                        outerRadius={150}
                        fill="#8884d8"
                      />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </div>
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

export default Chart;