import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import Page from "./pages/Page";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nova" element={<CreatePage />} />
        <Route path="/pagina/:title" element={<Page />} />
      </Routes>
    </Layout>
  );
}
