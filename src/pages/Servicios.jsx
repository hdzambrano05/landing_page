import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { servicios } from "../data/servicios";

export default function Servicios() {
    const location = useLocation();

    const [servicioActivo, setServicioActivo] = useState(null);
    const [detalleIndex, setDetalleIndex] = useState(null);

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

    return (
        <>
            {/* ================= HERO ================= */}
            <section className="relative py-28 md:py-32 overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100">
                {/* Fondo geométrico */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-32 -left-32 w-125 h-125 bg-blue-400/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/3 -right-40 w-105 h-105 bg-cyan-400/20 rounded-full blur-3xl" />
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="w-150 h-150 border border-blue-200/40 rotate-45 rounded-3xl"></div>
                    </div>
                </div>

                {/* Contenido */}
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <span className="inline-block mb-4 px-5 py-1 text-xs tracking-widest uppercase bg-blue-100 text-blue-700 rounded-full">
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
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {servicios.map((servicio) => (
                        <div
                            key={servicio.id}
                            className="group bg-white rounded-3xl shadow-xl border border-gray-100
                                       overflow-hidden hover:shadow-2xl hover:scale-105
                                       transition-all duration-500"
                        >
                            {/* Imagen */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={servicio.imagen}
                                    alt={servicio.titulo}
                                    className="w-full h-full object-cover transition-transform
                                               duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Contenido */}
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    {servicio.titulo}
                                </h3>

                                <p className="text-gray-600 mb-6">
                                    {servicio.descripcion}
                                </p>

                                <button
                                    onClick={() => {
                                        setServicioActivo(servicio);
                                        setDetalleIndex(null);
                                    }}
                                    className="inline-flex items-center gap-2 text-blue-600
                                               font-semibold hover:gap-3 transition-all"
                                >
                                    Ver detalles →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= MODAL ================= */}
            {servicioActivo && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm
                                flex items-center justify-center px-4 animate-fadeIn">
                    <div className="relative bg-white w-full max-w-6xl rounded-3xl
                                    shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                        {/* Cerrar */}
                        <button
                            onClick={cerrarModal}
                            className="absolute top-5 right-6 text-3xl
                                       text-gray-400 hover:text-black transition"
                        >
                            ×
                        </button>

                        <div className="grid lg:grid-cols-2">
                            {/* INFO */}
                            <div className="p-10 space-y-8">
                                <h2 className="text-4xl font-extrabold text-gray-800">
                                    {servicioActivo.titulo}
                                </h2>

                                <p className="text-gray-600">
                                    {servicioActivo.descripcion}
                                </p>

                                <div className="space-y-4">
                                    {servicioActivo.detalles?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-2xl overflow-hidden"
                                        >
                                            <button
                                                onClick={() =>
                                                    setDetalleIndex(
                                                        detalleIndex === index ? null : index
                                                    )
                                                }
                                                className="w-full flex justify-between
                                                           items-center p-5
                                                           bg-white hover:bg-gray-50 transition"
                                            >
                                                <span className="font-semibold text-gray-800">
                                                    {item.titulo}
                                                </span>
                                                <span className="text-2xl text-blue-600">
                                                    {detalleIndex === index ? "−" : "+"}
                                                </span>
                                            </button>

                                            {detalleIndex === index && (
                                                <div className="p-5 bg-gray-50 border-t animate-fadeUp">
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {item.descripcion}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FORM */}
                            <div className="bg-linear-to-b from-blue-50 to-white p-10">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                    Solicitar información
                                </h3>

                                <form className="space-y-5">
                                    <input
                                        type="text"
                                        placeholder="Nombre completo"
                                        className="w-full p-4 rounded-xl border
                                                   focus:ring-2 focus:ring-blue-500
                                                   outline-none transition"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Correo electrónico"
                                        className="w-full p-4 rounded-xl border
                                                   focus:ring-2 focus:ring-blue-500
                                                   outline-none transition"
                                    />
                                    <textarea
                                        rows="4"
                                        placeholder="Mensaje"
                                        className="w-full p-4 rounded-xl border
                                                   focus:ring-2 focus:ring-blue-500
                                                   outline-none transition"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-blue-600
                                                   hover:bg-blue-700 text-white
                                                   rounded-xl font-semibold shadow-lg transition"
                                    >
                                        Enviar mensaje
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= ANIMACIONES ================= */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease forwards;
                }

                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeUp {
                    animation: fadeUp 0.3s ease forwards;
                }
            `}</style>
        </>
    );
}
