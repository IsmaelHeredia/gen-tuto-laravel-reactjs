interface Cancion {
    id: number
    nombre: string
    autor: string
    genero_nombre: string
    dificultad_nombre: string
    afinacion_nombre: string
}

interface Captura {
    id: number
    nombre: string
    imagen: string
    orden: number
}

interface CapturaOrdenar {
    id: number
    nombre: string
    imagen: string
    orden: number
}

interface GuardarCaptura {
    id: number;
    nombre: string
    imagen: string
    orden: number
}

interface FiltrarCaptura {
    buscarNombre: string
}

export type { Cancion, Captura, CapturaOrdenar, GuardarCaptura, FiltrarCaptura };