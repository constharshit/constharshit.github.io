import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Footer from "@/components/Footer";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

/* Uses App component to initialize the pages 
Component is the active page and whenever navigating between routes, this page will change to the active page
This font is variable and we do not have to write different types of weights */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/harshit-avatar.png" />
      </Head>
      <div
        className={`${inter.variable} font-inter bg-light dark:bg-dark w-full min-h-screen flex flex-col`}
      >
        {/* Flex container ensures the layout uses all available space */}
        <NavBar />
        {/* Flex-grow ensures the main content takes available space and pushes footer down */}
        <main className="flex-grow flex items-center justify-center">
          <AnimatePresence mode="wait">
            <Component key={router.asPath} {...pageProps} />
          </AnimatePresence>
        </main>
        {/* Footer stays at the bottom */}
        <Footer />
      </div>
    </>
  );
}
