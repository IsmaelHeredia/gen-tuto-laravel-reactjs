import LayoutAdmin from "@layouts/LayoutAdmin";
import { useState, useEffect, useRef } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CircularProgress from "@mui/material/CircularProgress";
import DatosCancion from "@components/DatosCancion";
import Alert from "@mui/material/Alert";
import { Cancion, Imagen } from "@customTypes/app/tutoriales";
import Typography from "@mui/material/Typography";

const MostrarTutorial = () => {

    const navigate = useNavigate();

    let { id } = useParams();

    const images_url = import.meta.env.VITE_IMAGES_URL;

    const [configuration, setConfiguration] = useState({
        showIndex: false,
        showBullets: true,
        infinite: true,
        showThumbnails: true,
        showFullscreenButton: true,
        showGalleryFullscreenButton: true,
        showPlayButton: false,
        showGalleryPlayButton: true,
        showNav: true,
        slideVertically: false,
        isRTL: false,
        slideDuration: 450,
        slideInterval: 2000,
        slideOnThumbnailOver: false,
        thumbnailPosition: "bottom",
        showVideo: false,
        useWindowKeyDown: true
    });

    const [cargando, setCargando] = useState(true);

    const [cancion, setCancion] = useState<Cancion | null>(null);
    const [imagenes, setImagenes] = useState<Array<Imagen>>([]);

    const refGallery = useRef<any>(null);

    useEffect(() => {

        async function loadData() {

          setCargando(true);
        
          axios
              .get(import.meta.env.VITE_API_URL + "/datosCaptura/" + id)
              .then(response => {

                const datos = response.data;
                const estado = datos.estado;

                if (estado == 1) {

                    const cancion_bd = datos.cancion;
                    const capturas_bd = datos.capturas;

                    setCancion(cancion_bd);

                    var imagenes:any = [];
                    
                    capturas_bd.map(function(captura: any) {
                        const url_captura = images_url + "/" + captura.imagen;

                        var datosImagen = {
                            thumbnail: url_captura,
                            original: url_captura,
                            description: captura.nombre
                        };

                        imagenes.push(datosImagen);
                    })

                    setImagenes(imagenes);

                    setCargando(false);
                }
    
              })
              .catch(function (error) {
                  const message = error.response.data.message ? error.response.data.message : String(import.meta.env.VITE_ERROR_AXIOS);
                  console.log(message);
              })
        }
    
        loadData();
    
    }, []);

    const onFullscreen = (event: any) => {
        if(event == true) {
            setConfiguration({ ...configuration, showThumbnails : false });
        } else {
            setConfiguration({ ...configuration, showThumbnails : true });
        }
    };

    return(
        <LayoutAdmin>
            <div className="botones-principales">
                <Grid container justifyContent="flex-start" sx={{ mt: 10 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => navigate("/") }
                    >
                        Volver
                    </Button>
                    <DatosCancion />
                    <Button
                        sx={{ml:2}}
                        startIcon={<YouTubeIcon />}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => window.open(cancion?.url_youtube) }
                    >
                        Video
                    </Button>
                </Grid>
            </div>
            <Divider style={{ width:"100%" }} />

            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", marginTop:"30px" }}>
                
            {cargando ?
                <CircularProgress />
            :
                <>
                {imagenes.length == 0 ?

                    <Typography variant="h5" className="center-div" style={{ marginTop:"30px" }}>No se encontraron capturas para mostrar</Typography>

                :

                    <ImageGallery
                        ref={refGallery}
                        items={imagenes}
                        infinite={configuration.infinite}
                        showBullets={configuration.showBullets}
                        showFullscreenButton={
                        configuration.showFullscreenButton &&
                        configuration.showGalleryFullscreenButton
                        }
                        showPlayButton={
                        configuration.showPlayButton && configuration.showGalleryPlayButton
                        }
                        showThumbnails={configuration.showThumbnails}
                        showIndex={configuration.showIndex}
                        showNav={configuration.showNav}
                        isRTL={configuration.isRTL}
                        thumbnailPosition="bottom"
                        slideDuration={configuration.slideDuration}
                        slideInterval={configuration.slideInterval}
                        slideOnThumbnailOver={configuration.slideOnThumbnailOver}
                        onScreenChange={onFullscreen.bind(this)}
                    />
                }
                </>
            }
            
            </div>

        </LayoutAdmin>
    );

};

export default MostrarTutorial;