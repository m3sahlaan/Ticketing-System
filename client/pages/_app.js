import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from ".";
import axios from "axios";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <div>
      <h1>Header!</h1>
      <Component {...pageProps} />
    </div>
  );
};

// AppComponent.getInitialProps = async (appContext) => {
//   const { data } = await axios.get(
//     "https://localhost:3000/api/users/currentuser",
//     {
//       headers: req.headers,
//     }
//   );
//   let pageProps = {};
//   if (appContext.Component.getInitialProps) {
//     pageProps = await appContext.Component.getInitialProps(appContext.ctx);
//   }

//   return {
//     pageProps,
//     ...data,
//   };
// };

export default AppComponent;
