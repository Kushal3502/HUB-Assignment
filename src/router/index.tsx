import { createBrowserRouter } from "react-router";
import App from "../App";
import Details from "../Details";
import Form from "../Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Form />,
      },
      {
        path: "details",
        element: <Details />,
      },
    ],
  },
]);

export default router;
