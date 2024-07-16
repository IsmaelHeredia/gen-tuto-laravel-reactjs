interface Genero {
    id: number
    nombre: string
}

interface Dificultad {
    id: number
    nombre: string
}

interface Afinacion {
    id: number
    nombre: string
}

interface Cancion {
    id: number | null
    nombre: string
    autor: string
    genero_nombre: string
    dificultad_nombre: string
    afinacion_nombre: string
}

interface GuardarCancion {
    id: number | null
    nombre: string
    autor: string
    genero: Genero | null
    dificultad: Dificultad | null
    afinacion: Afinacion | null
    url_youtube: string
    detalles: string
}

interface BuscarFiltro {
    buscarNombre: string;
    buscarGenero: Genero;
    buscarDificultad: Dificultad;
    buscarAfinacion: Afinacion;
}

export type { Genero, Dificultad, Afinacion, Cancion, GuardarCancion, BuscarFiltro };