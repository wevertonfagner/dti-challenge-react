import React from 'react'
import ReactDOM from 'react-dom/client'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from "./routes/Home.jsx"
import Aprovado from "./routes/Aprovado.jsx"
import Reprovado from "./routes/Reprovado.jsx"

const router = createBrowserRouter([
  {
  path: "/",
  element: <Home/>
  },{
    path: "/aprovado",
    element: <Aprovado/>
  },{
    path: "/reprovado",
    element: <Reprovado/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
