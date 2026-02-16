import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { servicios } from "../data/servicios";
import FeedbackModal from "../components/FeedbackModal";
import {
    SlidersHorizontal,
    Search,
    Layers,
    ArrowDownAZ,
    Check
} from "lucide-react";

export default function Servicios() {

    const location = useLocation();

    const [servicioActivo, setServicioActivo] = useState(null);
    const [detalleIndex, setDetalleIndex] = useState(null);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loadingForm, setLoadingForm] = useState(false);
    const [estadoForm, setEstadoForm] = useState(null);

    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("Todos");
    const [orden, setOrden] = useState("az");

    // ================= PAGINACIÓN =================
    const [paginaActual, setPaginaActual] = useState(1);
    const serviciosPorPagina = 6;

    const categorias = ["Todos", ...new Set(servicios.map(s => s.categoria))];

    /* =========================
       Abrir modal desde Inicio
    ========================== */
    useEffect(() => {
        if (location.state?.servicioId) {
            const servicio = servicios.find(
                (s) => s.id === location.state.servicioId
            );
            if (servicio) setServicioActivo(servicio);
        }
    }, [location.state]);

    // Reset página cuando cambian filtros
    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda, categoria, orden]);

    const cerrarModal = () => {
        setServicioActivo(null);
        setDetalleIndex(null);
    };

    const enviarFormulario = async (e) => {
        e.preventDefault();
        setLoadingForm(true);
        setEstadoForm(null);

        try {
            const res = await fetch("http://localhost:3001/contacto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre,
                    email,
                    mensaje,
                    servicio: servicioActivo?.titulo,
                }),
            });

            if (!res.ok) throw new Error("Error al enviar");

            setEstadoForm("success");
            setNombre("");
            setEmail("");
            setMensaje("");
        } catch (error) {
            setEstadoForm("error");
        } finally {
            setLoadingForm(false);
        }
    };

    const serviciosFiltrados = servicios
        .filter(s =>
            s.titulo.toLowerCase().includes(busqueda.toLowerCase()) &&
            (categoria === "Todos" || s.categoria === categoria)
        )
        .sort((a, b) =>
            orden === "az"
                ? a.titulo.localeCompare(b.titulo)
                : b.titulo.localeCompare(a.titulo)
        );

    // ================= LÓGICA PAGINACIÓN =================
    const indexUltimo = paginaActual * serviciosPorPagina;
    const indexPrimero = indexUltimo - serviciosPorPagina;
    const serviciosPagina = serviciosFiltrados.slice(indexPrimero, indexUltimo);
    const totalPaginas = Math.ceil(serviciosFiltrados.length / serviciosPorPagina);

    const cambiarPagina = (num) => {
        setPaginaActual(num);
        window.scrollTo({ top: 700, behavior: "smooth" });
    };

    return (
        <>
            {/* ================= HERO ================= */}
            <section className="relative py-28 md:py-32 overflow-hidden
                bg-linear-to-br from-blue-50 via-white to-blue-100">

                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <span className="inline-block mb-4 px-5 py-1 text-xs tracking-widest uppercase
                        bg-blue-100 text-blue-700 rounded-full">
                        Portafolio
                    </span>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
                        Nuestros Servicios
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto">
                        Soluciones profesionales diseñadas para proteger su patrimonio
                        y brindarle tranquilidad.
                    </p>

                    <div className="mt-8 w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>
            </section>

            {/* ================= CARDS ================= */}
            <section className="pt-16 pb-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-12">


                    {serviciosPagina.map((servicio) => (
                        <div
                            key={servicio.id}
                            onClick={() => {
                                setServicioActivo(servicio);
                                setDetalleIndex(null);
                            }}
                            className="group relative cursor-pointer
                            rounded-[2.2rem] overflow-hidden
                            bg-white/80 backdrop-blur-xl
                            border border-white/60
                            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                            hover:shadow-[0_35px_90px_rgba(0,0,0,0.18)]
                            hover:-translate-y-3
                            transition-all duration-500"
                        >
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={servicio.imagen}
                                    alt={servicio.titulo}
                                    className="w-full h-full object-cover
                                    transition-transform duration-700
                                    group-hover:scale-110"
                                />
                            </div>

                            <div className="relative p-8 space-y-4">
                                <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">
                                    {servicio.titulo}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                    {servicio.descripcion}
                                </p>

                                <div className="flex items-center justify-between pt-4">
                                    <span className="text-blue-600 font-semibold">
                                        Explorar servicio →
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ================= PAGINADOR ================= */}
                {totalPaginas > 1 && (
                    <div className="flex justify-center mt-16 gap-3 flex-wrap">
                        {[...Array(totalPaginas)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => cambiarPagina(i + 1)}
                                className={`px-5 py-2 rounded-xl font-semibold transition ${paginaActual === i + 1
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "bg-white border hover:bg-gray-100"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* ================= MODAL RESPONSIVE ================= */}
            {servicioActivo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center 
                    px-4 sm:px-6 py-6 bg-black/70 backdrop-blur-md">

                    <div className="relative w-full max-w-7xl 
                        h-auto lg:h-[90vh] 
                        bg-white rounded-3xl 
                        shadow-[0_40px_120px_rgba(0,0,0,0.3)] 
                        overflow-hidden">

                        {/* BOTÓN CERRAR */}
                        <button
                            onClick={cerrarModal}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 
                           w-10 h-10 sm:w-12 sm:h-12
                           rounded-full bg-white/80 backdrop-blur
                           flex items-center justify-center
                           text-xl sm:text-2xl text-gray-500 
                           hover:text-black hover:scale-110 transition"
                        >
                            ×
                        </button>

                        <div className="flex flex-col lg:grid lg:grid-cols-2 h-full">

                            {/* ================= INFO ================= */}
                            <div className="p-6 sm:p-10 lg:p-12 
                                flex flex-col 
                                max-h-[50vh] lg:max-h-none 
                                overflow-hidden">

                                <div className="flex-1 overflow-y-auto pr-2 sm:pr-4 scroll-custom space-y-6 sm:space-y-8">

                                    <span className="inline-block px-4 py-1 text-xs sm:text-sm font-semibold
                                         rounded-full bg-blue-100 text-blue-700">
                                        Servicio especializado
                                    </span>

                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl 
                                       font-extrabold text-gray-900 leading-tight">
                                        {servicioActivo.titulo}
                                    </h2>

                                    <p className="text-base sm:text-lg text-gray-600">
                                        {servicioActivo.descripcion}
                                    </p>

                                    <div className="space-y-4">
                                        {servicioActivo.detalles?.map((item, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-2xl overflow-hidden"
                                            >
                                                <button
                                                    onClick={() =>
                                                        setDetalleIndex(
                                                            detalleIndex === index ? null : index
                                                        )
                                                    }
                                                    className="w-full flex justify-between items-center
                                                   p-4 sm:p-6 bg-white hover:bg-blue-50 transition"
                                                >
                                                    <span className="font-semibold text-sm sm:text-base text-gray-900 text-left">
                                                        {item.titulo}
                                                    </span>

                                                    <span className={`w-7 h-7 sm:w-8 sm:h-8 
                                                          flex items-center justify-center
                                                          rounded-full font-bold transition
                                                          ${detalleIndex === index
                                                            ? "bg-blue-600 text-white rotate-180"
                                                            : "bg-gray-100 text-gray-600"
                                                        }`}>
                                                        +
                                                    </span>
                                                </button>

                                                {detalleIndex === index && (
                                                    <div className="p-4 sm:p-6 bg-gray-50 border-t">
                                                        <p className="text-sm sm:text-base text-gray-600">
                                                            {item.descripcion}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t text-xs sm:text-sm text-gray-400 shrink-0">
                                    Atención personalizada · Respuesta rápida
                                </div>
                            </div>

                            {/* ================= FORM ================= */}
                            <div className="relative flex items-center 
                                bg-linear-to-br 
                                from-blue-600 via-indigo-600 to-blue-800">

                                <div className="w-full p-6 sm:p-10 lg:p-12 
                                    bg-white/10 backdrop-blur-xl">

                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
                                        Solicitar información
                                    </h3>

                                    <form onSubmit={enviarFormulario} className="space-y-5 sm:space-y-6">

                                        <input
                                            type="text"
                                            placeholder="Nombre completo"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required
                                            className="w-full p-3 sm:p-4 rounded-xl bg-white/90 outline-none
                                           focus:ring-2 focus:ring-white text-sm sm:text-base"
                                        />

                                        <input
                                            type="email"
                                            placeholder="Correo electrónico"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full p-3 sm:p-4 rounded-xl bg-white/90 outline-none
                                           focus:ring-2 focus:ring-white text-sm sm:text-base"
                                        />

                                        <textarea
                                            rows="4"
                                            placeholder="Cuéntanos tu necesidad"
                                            value={mensaje}
                                            onChange={(e) => setMensaje(e.target.value)}
                                            required
                                            className="w-full p-3 sm:p-4 rounded-xl bg-white/90 
                                           resize-none outline-none
                                           focus:ring-2 focus:ring-white text-sm sm:text-base"
                                        />

                                        <button
                                            type="submit"
                                            disabled={loadingForm}
                                            className="w-full py-3 sm:py-4 rounded-xl 
                                           bg-white text-blue-700
                                           font-bold text-base sm:text-lg
                                           hover:scale-[1.03]
                                           disabled:opacity-60 
                                           disabled:cursor-not-allowed
                                           transition"
                                        >
                                            {loadingForm ? "Enviando..." : "Enviar solicitud"}
                                        </button>

                                        {estadoForm && (
                                            <FeedbackModal
                                                tipo={estadoForm}
                                                onClose={() => setEstadoForm(null)}
                                            />
                                        )}
                                    </form>

                                    <p className="mt-6 text-xs sm:text-sm text-white/70">
                                        Nos comunicaremos contigo lo antes posible.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

<style jsx>{`
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
.animate-fadeIn {
    animation: fadeIn 0.25s ease-out forwards;
}
`}</style>