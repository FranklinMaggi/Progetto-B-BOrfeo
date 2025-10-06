import "./styles/global.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "rooms", element: <Rooms /> },
        { path: "booking", element: <Booking /> },
        { path: "contact", element: <Contact /> },
        { path: "admin", element: <Admin /> },
      ],
    },
  ],
  {
    // ✅ Qui la sintassi corretta: una sola riga dentro l'oggetto
    basename: import.meta.env.DEV ? "/" : "/Progetto-B-BOrfeo/",
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
