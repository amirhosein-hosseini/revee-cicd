import "@/styles/globals.css";
import "../components/gallery/gallery.css";
import Layout from "./layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useRouter } from 'next/router';
import { AuthProvider } from "@/context/authContext";
import "../components/sliderConfig/style.css"
import Head from "next/head";

export default function App({ Component, pageProps }) {

  const router = useRouter();
  
  // Define routes where you don't want to show the layout
  const noLayoutRoutes = ['/login' , '/signin' , '/reset-password' , '/forgot-pass'];

  const isLayoutNeeded = !noLayoutRoutes.includes(router.pathname);



  // return (
  //   <Layout>
  //     <Component {...pageProps} />
  //     <ToastContainer />
  //   </Layout>
  // );

  return isLayoutNeeded ? (
    <>
      <Head>

      </Head>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </AuthProvider>
    </>

  ) : (
    <>
        <Head>

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://healfit.ae/" />
          <meta property="og:title" content="Healfit" />
          <meta property="og:description" content="healfit health marketplace" />
          <meta property="og:image" content="https://healfit.ae/images/favicon.png" />


          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://healfit.ae/" />
          <meta property="twitter:title" content="Healfit" />
          <meta property="twitter:description" content="healfit health marketplace" />
          <meta property="twitter:image" content="https://healfit.ae/images/favicon.png" />
        </Head>
        <AuthProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </AuthProvider>
      </>
  );
}
