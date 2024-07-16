import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProtegerRutas = () => {

  const location = useLocation();

  const [isAuth, setIsAuth] = useState(0); // [1] Login OK [2] Bad Login

  useEffect(() => {

    const fetchData = async () => {

      var token = sessionStorage.getItem(import.meta.env.VITE_SESSION_NAME);
      var url = import.meta.env.VITE_API_URL + "/validar";

      if(!token) {
        setIsAuth(2);
      }

      try {

        let res = await axios.post(url, {"token" : token});

        if(res.data.estado == "1") {
          setIsAuth(1);
        } else {
          setIsAuth(2);
        }     

      }
      catch(e) {
        setIsAuth(2);
      }

  }

  fetchData();

  }, []);

  if (isAuth === undefined) {
    return null;
  }

  if(isAuth == 1) {
    return <Outlet />;
  }

  if(isAuth == 2) {
    return <Navigate to="/ingreso" replace state={{ from: location }} />;
  }

}

export default ProtegerRutas;