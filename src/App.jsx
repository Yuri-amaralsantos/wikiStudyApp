import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import Page from "./pages/Page";
import Layout from "./components/Layout";
import Construcao from "./pages/EmConstrucao";
import Contato from "./pages/Contato";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Construcao />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/nova" element={<CreatePage />} />
        <Route path="/pagina/:title" element={<Page />} />
      </Routes>
    </Layout>
  );
}
