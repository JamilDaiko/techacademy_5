import React from "react";
import Footer from "../components/components/Footer"; 
import Header from "../components/custom/Header";

export default function Books() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Livros</h1>
        {/* Conteúdo da página de livros */}
      </main>
      <Footer />
    </div>
  );
}