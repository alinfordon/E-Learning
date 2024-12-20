import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import "../public/css/homepage.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import { appWithTranslation } from 'next-i18next';



function MyApp({ Component, pageProps }) {
  return (
    <Provider>     
      <ToastContainer position="top-center" />     
      <Component {...pageProps} />      
    </Provider>
  );
}

export default appWithTranslation(MyApp);
