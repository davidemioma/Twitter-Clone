import Layout from "@/components/Layout";
import Login from "@/components/modal/Login";
import Register from "@/components/modal/Register";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Login />

      <Register />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
