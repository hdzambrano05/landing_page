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
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [loadingForm, setLoadingForm] = useState(false)
    const [estadoForm, setEstadoForm] = useState(null)


    const [mostrarFiltros, setMostrarFiltros] = useState(false)
    const [busqueda, setBusqueda] = useState("")
    const [categoria, setCategoria] = useState("Todos")
    const [orden, setOrden] = useState("az")

    const categorias = ["Todos", ...new Set(servicios.map(s => s.categoria))]


    /* =========================
       Abrir modal desde Inicio
    ========================== */
    useEffect(() => {
        if (location.state?.servicioId) {
            const servicio = servicios.find(
                (s) => s.id === location.state.servicioId
            );
            if (servicio) {
                setServicioActivo(servicio);
            }
        }
    }, [location.state]);

    const cerrarModal = () => {
        setServicioActivo(null);
        setDetalleIndex(null);
    };

    const enviarFormulario = async (e) => {
        e.preventDefault()
        setLoadingForm(true)
        setEstadoForm(null)

        try {
            const res = await fetch("http://localhost:3001/contacto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    mensaje,
                    servicio: servicioActivo?.titulo,
                }),
            })

            if (!res.ok) throw new Error("Error al enviar")

            setEstadoForm("success")
            setNombre("")
            setEmail("")
            setMensaje("")
        } catch (error) {
            console.error(error)
            setEstadoForm("error")
        } finally {
            setLoadingForm(false)
        }
    }

    const serviciosFiltrados = servicios
        .filter(s =>
            s.titulo.toLowerCase().includes(busqueda.toLowerCase()) &&
            (categoria === "Todos" || s.categoria === categoria)
        )
        .sort((a, b) =>
            orden === "az"
                ? a.titulo.localeCompare(b.titulo)
                : b.titulo.localeCompare(a.titulo)
        )





    return (
        <>
            {/* ================= HERO ================= */}
            <section className="relative py-28 md:py-32 overflow-hidden
                    bg-linear-to-br from-blue-50 via-white to-blue-100">

                {/* ===== FONDO ANIMADO ===== */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">

                    {/* Gradiente animado */}
                    <div className="absolute inset-0
                        bg-linear-to-r from-blue-200/30 via-indigo-200/30 to-cyan-200/30
                        animate-gradientMove" />

                    {/* Glow flotantes */}
                    <div className="absolute -top-40 -left-40 w-96 h-96
                        bg-blue-500/30 rounded-full blur-3xl
                        animate-floatSlow" />

                    <div className="absolute top-1/3 -right-40 w-80 h-80
                        bg-indigo-500/30 rounded-full blur-3xl
                        animate-floatReverse" />

                    {/* Figuras geométricas */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-96 h-96 border border-blue-200/40
                            rounded-3xl rotate-45
                            animate-rotateSlow" />
                    </div>

                    <div className="absolute bottom-24 left-24 w-24 h-24
                        border border-indigo-300/40 rounded-xl
                        rotate-12 animate-floatSlow" />

                    <div className="absolute top-24 right-32 w-16 h-16
                        bg-blue-300/20 rounded-full
                        animate-floatReverse" />
                </div>

                {/* ===== CONTENIDO (IGUAL) ===== */}
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

            {/* ================= ANIMACIONES ================= */}
            <style jsx>{`
@keyframes gradientMove {
    0% { transform: translateX(0%); }
    50% { transform: translateX(-10%); }
    100% { transform: translateX(0%); }
}
.animate-gradientMove {
    animation: gradientMove 12s ease-in-out infinite;
}

@keyframes floatSlow {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-30px); }
    100% { transform: translateY(0px); }
}
.animate-floatSlow {
    animation: floatSlow 10s ease-in-out infinite;
}

@keyframes floatReverse {
    0% { transform: translateY(0px); }
    50% { transform: translateY(25px); }
    100% { transform: translateY(0px); }
}
.animate-floatReverse {
    animation: floatReverse 12s ease-in-out infinite;
}

@keyframes rotateSlow {
    from { transform: rotate(45deg); }
    to { transform: rotate(405deg); }
}
.animate-rotateSlow {
    animation: rotateSlow 40s linear infinite;
}
`}</style>

            <section className="py-10 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 flex justify-end relative">

                    {/* BOTÓN FILTROS */}
                    <button
                        onClick={() => setMostrarFiltros(!mostrarFiltros)}
                        className="
                group flex items-center gap-3
                px-7 py-3 rounded-full
                bg-linear-to-r from-blue-600 to-indigo-600
                text-white font-semibold
                shadow-lg shadow-blue-600/30
                hover:shadow-xl hover:shadow-blue-600/40
                hover:scale-[1.03]
                transition-all duration-300
            "
                    >
                        <SlidersHorizontal className="w-5 h-5 group-hover:rotate-90 transition" />
                        Filtrar y ordenar
                    </button>

                    {/* PANEL FLOTANTE */}
                    {mostrarFiltros && (
                        <div
                            className="
                    absolute top-16 right-0 z-50 w-96
                    bg-white/90 backdrop-blur-xl
                    rounded-3xl
                    shadow-[0_30px_80px_rgba(0,0,0,0.18)]
                    border border-white/60
                    p-7 space-y-6
                    animate-fadeIn
                "
                        >
                            {/* HEADER */}
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-extrabold text-gray-900">
                                    Opciones de filtrado
                                </h4>
                                <div className="w-9 h-9 rounded-full bg-blue-100
                                    flex items-center justify-center text-blue-600">
                                    <SlidersHorizontal className="w-5 h-5" />
                                </div>
                            </div>

                            {/* BUSCAR */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2
                                       text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar servicio..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="
                            w-full pl-12 pr-4 py-3
                            rounded-xl
                            border border-gray-200
                            outline-none
                            focus:ring-2 focus:ring-blue-600/40
                            focus:border-blue-600
                            transition
                        "
                                />
                            </div>

                            {/* CATEGORÍA */}
                            <div className="relative">
                                <Layers className="absolute left-4 top-1/2 -translate-y-1/2
                                       text-gray-400 w-5 h-5" />
                                <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    className="
                            w-full pl-12 pr-4 py-3
                            rounded-xl
                            border border-gray-200
                            outline-none
                            appearance-none
                            focus:ring-2 focus:ring-blue-600/40
                            transition
                        "
                                >
                                    {categorias.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* ORDEN */}
                            <div className="relative">
                                <ArrowDownAZ className="absolute left-4 top-1/2 -translate-y-1/2
                                            text-gray-400 w-5 h-5" />
                                <select
                                    value={orden}
                                    onChange={(e) => setOrden(e.target.value)}
                                    className="
                            w-full pl-12 pr-4 py-3
                            rounded-xl
                            border border-gray-200
                            outline-none
                            appearance-none
                            focus:ring-2 focus:ring-blue-600/40
                            transition
                        "
                                >
                                    <option value="az">Orden A – Z</option>
                                    <option value="za">Orden Z – A</option>
                                </select>
                            </div>

                            {/* BOTÓN APLICAR */}
                            <button
                                onClick={() => setMostrarFiltros(false)}
                                className="
                        w-full py-3 rounded-xl
                        bg-blue-600 text-white
                        font-bold
                        flex items-center justify-center gap-2
                        hover:bg-blue-700
                        hover:scale-[1.02]
                        transition
                    "
                            >
                                <Check className="w-5 h-5" />
                                Aplicar filtros
                            </button>
                        </div>
                    )}
                </div>
            </section>


            {/* ================= CARDS ================= */}
            <section className="pt-16 pb-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {serviciosFiltrados.map((servicio) => (

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
                            {/* Glow hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                                <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
                                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
                            </div>

                            {/* Imagen */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={servicio.imagen}
                                    alt={servicio.titulo}
                                    className="w-full h-full object-cover
                                   transition-transform duration-700
                                   group-hover:scale-110"
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-linear-to-t
                                    from-black/40 via-black/10 to-transparent" />
                            </div>

                            {/* Contenido */}
                            <div className="relative p-8 space-y-4">
                                <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">
                                    {servicio.titulo}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                    {servicio.descripcion}
                                </p>

                                {/* CTA */}
                                <div className="flex items-center justify-between pt-4">
                                    <span className="inline-flex items-center gap-2
                                         text-blue-600 font-semibold
                                         transition-all group-hover:gap-3">
                                        Explorar servicio →
                                    </span>

                                    {/* Icono flotante */}
                                    <div className="w-10 h-10 rounded-full
                                        bg-blue-600/10 text-blue-600
                                        flex items-center justify-center
                                        group-hover:bg-blue-600
                                        group-hover:text-white
                                        transition">
                                        →
                                    </div>
                                </div>
                            </div>

                            {/* Borde animado */}
                            <div className="absolute inset-0 rounded-[2.2rem]
                                ring-1 ring-transparent
                                group-hover:ring-blue-500/30 transition" />
                        </div>
                    ))}
                </div>
            </section>


            {/* ================= MODAL ================= */}
            {servicioActivo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-md">
                    <div className="relative w-full max-w-7xl h-[90vh] bg-white rounded-[2.5rem]
                                    shadow-[0_40px_120px_rgba(0,0,0,0.3)] overflow-hidden">

                        {/* Cerrar */}
                        <button
                            onClick={cerrarModal}
                            className="absolute top-6 right-6 z-50 w-12 h-12
                                       rounded-full bg-white/80 backdrop-blur
                                       flex items-center justify-center
                                       text-2xl text-gray-500 hover:text-black
                                       hover:scale-110 transition"
                        >
                            ×
                        </button>

                        <div className="grid lg:grid-cols-2 h-full">

                            {/* ================= INFO (SCROLL REAL) ================= */}
                            <div className="p-12 flex flex-col h-full overflow-hidden">
                                <div className="flex-1 overflow-y-auto pr-4 scroll-custom space-y-8">

                                    <span className="inline-block px-4 py-1 text-sm font-semibold
                                                     rounded-full bg-blue-100 text-blue-700">
                                        Servicio especializado
                                    </span>

                                    <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
                                        {servicioActivo.titulo}
                                    </h2>

                                    <p className="text-lg text-gray-600 max-w-xl">
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
                                                               p-6 bg-white hover:bg-blue-50 transition"
                                                >
                                                    <span className="font-semibold text-gray-900">
                                                        {item.titulo}
                                                    </span>

                                                    <span className={`w-8 h-8 flex items-center justify-center
                                                                      rounded-full font-bold transition
                                                                      ${detalleIndex === index
                                                            ? "bg-blue-600 text-white rotate-180"
                                                            : "bg-gray-100 text-gray-600"
                                                        }`}>
                                                        +
                                                    </span>
                                                </button>

                                                {detalleIndex === index && (
                                                    <div className="p-6 bg-gray-50 border-t">
                                                        <p className="text-gray-600">
                                                            {item.descripcion}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t text-sm text-gray-400 shrink-0">
                                    Atención personalizada · Respuesta rápida
                                </div>
                            </div>

                            {/* ================= FORM ================= */}
                            <div className="relative flex items-center bg-linear-to-br from-blue-600 via-indigo-600 to-blue-800">
                                <div className="w-full p-12 bg-white/10 backdrop-blur-xl">
                                    <h3 className="text-3xl font-bold text-white mb-8">
                                        Solicitar información
                                    </h3>

                                    <form onSubmit={enviarFormulario} className="space-y-6">
                                        <input
                                            type="text"
                                            placeholder="Nombre completo"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required
                                            className="w-full p-4 rounded-xl bg-white/90 outline-none
                   focus:ring-2 focus:ring-white"
                                        />

                                        <input
                                            type="email"
                                            placeholder="Correo electrónico"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full p-4 rounded-xl bg-white/90 outline-none
                   focus:ring-2 focus:ring-white"
                                        />

                                        <textarea
                                            rows="4"
                                            placeholder="Cuéntanos tu necesidad"
                                            value={mensaje}
                                            onChange={(e) => setMensaje(e.target.value)}
                                            required
                                            className="w-full p-4 rounded-xl bg-white/90 resize-none outline-none
                   focus:ring-2 focus:ring-white"
                                        />

                                        <button
                                            type="submit"
                                            disabled={loadingForm}
                                            className="w-full py-4 rounded-xl bg-white text-blue-700
                   font-bold text-lg
                   hover:scale-[1.03]
                   disabled:opacity-60 disabled:cursor-not-allowed
                   transition"
                                        >
                                            {loadingForm ? "Enviando..." : "Enviar solicitud"}
                                        </button>

                                        {/* ===== MODAL DE FEEDBACK ===== */}
                                        {estadoForm && (
                                            <FeedbackModal
                                                tipo={estadoForm}
                                                onClose={() => setEstadoForm(null)}
                                            />
                                        )}
                                    </form>

                                    <p className="mt-6 text-sm text-white/70">
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