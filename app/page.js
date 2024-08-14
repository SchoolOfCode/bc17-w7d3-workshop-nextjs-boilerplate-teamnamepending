import Image from "next/image";
import "./page.css";
import Header from "@/src/componets/Header/Header.jsx"
import Main from "@/src/componets/Main/Main";
import Footer from "@/src/componets/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header/>
      <Main/>
      <Footer/>
      </>
  );
}
