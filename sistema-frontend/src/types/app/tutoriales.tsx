interface Cancion {
    id: number
    nombre: string
    autor: string
    genero_nombre: string
    dificultad_nombre: string
    afinacion_nombre: string
    url_youtube: string
}

interface Imagen {
    original: string
    thumbnail: string
}

export type { Cancion, Imagen };