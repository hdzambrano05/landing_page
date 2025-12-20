import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Inicio from "./pages/Inicio"
import Nosotros from "./pages/Nosotros"
import Servicios from "./pages/Servicios"
import Contacto from "./pages/Contacto"
import Footer from "./components/Footer"
import ChatBot from "./components/ChatBot"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <ChatBot />

      <Footer />
    </>
  )
}

export default App
