import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import { useEffect } from "react";
import { wrapper, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <Component {...pageProps} />
      </PersistGate>
    </>
  );
}
export default wrapper.withRedux(MyApp);
