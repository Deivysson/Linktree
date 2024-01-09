import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Admin } from "./pages/admin";
import { Networks } from "./pages/networks";

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/admin/social',
    element: <Networks />
  },
  {
    path:'/admin',
    element: <Admin />
  }

])

export { router };
