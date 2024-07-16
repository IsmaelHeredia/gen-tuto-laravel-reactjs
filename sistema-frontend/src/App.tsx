import "./App.css"

import Ingreso from "@pages/ingreso/Index"
import Home from "@pages/home/Index"
import ListarCapturas from "@pages/capturas/Listar"
import MostrarTutorial from "@pages/tutoriales/Mostrar"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import RutasNormales from "@utils/RutasNormales"
import ProtegerRutas from "@utils/ProtegerRutas"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RutasNormales />}>
          <Route>
            <Route path="/ingreso" element={<Ingreso />} />
          </Route>
        </Route>
        <Route element={<ProtegerRutas />}>
          <Route path="/" element={<Home/>} />
          <Route path="/capturas/:id" element={<ListarCapturas/>} />
          <Route path="/tutoriales/:id" element={<MostrarTutorial/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
