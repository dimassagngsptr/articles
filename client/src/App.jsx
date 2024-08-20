import Home from "./pages/home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Reviews from "./pages/reviews";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/detail/:id", element: <Reviews /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
