import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./screens/Layout";
import NotFound from "./screens/NotFound";
import DisplayCustomers from "./screens/DisplayCustomers/DisplayCustomers";
import Graph from "./screens/DisplayCustomers/Graph";

function App() {
  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <DisplayCustomers /> },
        { path: "graph", element: <Graph /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
