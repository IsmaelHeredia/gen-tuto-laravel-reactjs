interface InitialState {
  nombre: string;
  id_genero: number;
  nombre_genero: string;
  id_dificultad: number;
  nombre_dificultad: string;
  id_afinacion: number;
  nombre_afinacion: string;
}

const UpdateCounterAction: string = "Filters";

export default InitialState;

export { UpdateCounterAction };