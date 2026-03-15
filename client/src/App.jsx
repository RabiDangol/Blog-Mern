import React from "react";
import Router from "./Routes/Router";
import { Header } from "./Routes/Header";
import Footer from "./Routes/Footer";

function App() {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
}
export default App;
