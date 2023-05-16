import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout";
import Login from "@/components/modal/Login";
import Register from "@/components/modal/Register";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />

      <Login />

      <Register />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
