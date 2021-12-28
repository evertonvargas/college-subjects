import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";

import { SessionProvider } from "../hooks/useSession";
import { ActivitiesProvider } from "../hooks/useActivities";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ActivitiesProvider>
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </ActivitiesProvider>
    </SessionProvider>
  );
}

export default MyApp;
