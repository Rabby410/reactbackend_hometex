import "./assets/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/style.scss";
import ProjectRouter from "./components/router/ProjectRouter";
import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import PublicRouter from "./components/router/PublicRouter";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.token != undefined) {
      setAuth(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`
    }
  }, []);

  return (
    <>
      {auth ? (
        <RouterProvider router={ProjectRouter} />
      ) : (
        <RouterProvider router={PublicRouter} />
      )}
    </>
  );
}

export default App;
