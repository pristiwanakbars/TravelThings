import { RouterProvider } from "react-router-dom";
import router from "./routers/index";
import { store } from "../src/app/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}
