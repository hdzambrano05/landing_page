import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MapPin,
    Phone,
    MessageCircle,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";
import { servicios } from "../data/servicios";

export default function Inicio() {
    const navigate = useNavigate();
    const carruselRef = useRef(null);
    const [paused, setPaused] = useState(false);

    /* ================= AUTO SCROLL INFINITO (PRO) ================= */
    useEffect(() => {
        const container = carruselRef.current;
        if (!container || paused) return;

        let animationId;
        const speed = 0.5; // velocidad suave y elegante

        const animate = () => {
            container.scrollLeft += speed;

            // Reinicio invisible (mitad exacta del contenido duplicado)
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0;
            }

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, [paused]);

    /* ================= SCROLL MANUAL CON FLECHAS ================= */
    const scrollManual = (direction) => {
        const container = carruselRef.current;
        if (!container) return;

        setPaused(true);

        const scrollAmount = 400;

        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });

        // Reanuda auto scroll después de 2 segundos
        setTimeout(() => setPaused(false), 2000);
    };


    return (
        <>
            {/* ================= HERO ================= */}
            <section
                className="relative min-h-[90vh] flex items-center justify-center bg-center bg-cover px-6"
                style={{ backgroundImage: "url('/img/02.jpg')" }}
            >
                <div className="absolute inset-0 bg-linear-to-br from-black/90 via-black/70 to-blue-900/50" />

                <div className="relative z-10 max-w-4xl text-center">
                    <span className="inline-block mb-5 px-6 py-2 text-xs tracking-widest uppercase
                                    bg-white/10 backdrop-blur-md rounded-full text-gray-200">
                        Conrado Seguros
                    </span>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                        Seguridad inteligente <br />
                        para su tranquilidad
                    </h1>

                    <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
                        Protegemos su patrimonio con soluciones integrales,
                        respaldo experto y acompañamiento permanente.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
                        <a
                            href="#contacto"
                            className="px-10 py-4 rounded-full font-semibold text-white
                                        bg-linear-to-r from-blue-600 to-cyan-500
                                        shadow-xl hover:scale-105 transition"
                        >
                            Solicitar asesoría
                        </a>

                        <a
                            href="#servicios-nuevos"
                            className="px-10 py-4 rounded-full font-semibold text-white
                                        border border-white/30 backdrop-blur
                                        hover:bg-white/10 transition"
                        >
                            Ver servicios
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
                    ↓
                </div>
            </section>

            {/* ================= SERVICIOS ================= */}
            <section
                id="servicios-nuevos"
                className="relative py-28 bg-linear-to-b from-white via-slate-50 to-white overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-6">

                    {/* HEADER */}
                    <div className="text-center mb-20">
                        <span className="inline-block mb-4 px-5 py-1.5 text-xs tracking-[0.25em] uppercase
                        bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                            Portafolio
                        </span>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            Soluciones diseñadas
                            <span className="block bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                para su tranquilidad
                            </span>
                        </h2>

                        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Servicios especializados con respaldo técnico y enfoque estratégico
                            para proteger su patrimonio y fortalecer su futuro.
                        </p>

                        <div className="mt-8 w-20 h-0.5 bg-linear-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
                    </div>

                    {/* CARRUSEL */}
                    {/* CARRUSEL */}
                    <div className="relative group">

                        {/* Flecha izquierda */}
                        <button
                            onClick={() => scrollManual("left")}
                            className="
                                        absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30
                                        w-9 h-9 md:w-12 md:h-12 rounded-full
                                        bg-white/95 backdrop-blur-md
                                        shadow-lg border border-gray-200
                                        flex items-center justify-center
                                        opacity-100 md:opacity-0 md:group-hover:opacity-100
                                        transition duration-300 hover:scale-110 active:scale-95
                                        "
                        >
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                        </button>

                        {/* Flecha derecha */}
                        <button
                            onClick={() => scrollManual("right")}
                            className="
                                        absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30
                                        w-9 h-9 md:w-12 md:h-12 rounded-full
                                        bg-white/95 backdrop-blur-md
                                        shadow-lg border border-gray-200
                                        flex items-center justify-center
                                        opacity-100 md:opacity-0 md:group-hover:opacity-100
                                        transition duration-300 hover:scale-110 active:scale-95
                                        "
                        >
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                        </button>

                        {/* Fade lateral (más pequeño en móvil) */}
                        <div className="absolute left-0 top-0 h-full w-10 md:w-24 bg-linear-to-r from-white to-transparent z-20 pointer-events-none" />
                        <div className="absolute right-0 top-0 h-full w-10 md:w-24 bg-linear-to-l from-white to-transparent z-20 pointer-events-none" />

                        {/* Contenedor scroll */}
                        <div
                            ref={carruselRef}
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                            className="
                                        flex gap-6 md:gap-10
                                        overflow-x-auto md:overflow-x-hidden
                                        scroll-smooth
                                        px-4 md:px-6
                                        scrollbar-hide
                                        "
                        >
                            {servicios.slice(0, 4).map((servicio, index) => (
                                <div
                                    key={servicio.id}
                                    className="min-w-65 sm:min-w-75 md:min-w-85 cursor-pointer group"
                                    onClick={() =>
                                        navigate("/servicios", {
                                            state: { servicioId: servicio.id },
                                        })
                                    }
                                >
                                    <div
                                        className="
                                                    relative h-105 sm:h-115 md:h-130
                                                    rounded-3xl md:rounded-[2.5rem]
                                                    overflow-hidden
                                                    bg-white
                                                    shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                                                    border border-gray-100
                                                    transition-all duration-500
                                                    md:group-hover:-translate-y-3
                                                    md:group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)]
                                                "
                                    >
                                        <img
                                            src={servicio.imagen}
                                            alt={servicio.titulo}
                                            className="
                                                        absolute inset-0 w-full h-full object-cover
                                                        transition-transform duration-700
                                                        md:group-hover:scale-105
                                                        "
                                        />

                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                                        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 text-white">
                                            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
                                                {servicio.titulo}
                                            </h3>

                                            <p className="text-sm text-gray-200 leading-relaxed line-clamp-3">
                                                {servicio.descripcion}
                                            </p>

                                            <div className="
                                                            mt-4 md:mt-6
                                                            flex items-center gap-2
                                                            text-cyan-400 font-medium text-sm
                                                            opacity-100 md:opacity-0
                                                            md:group-hover:opacity-100
                                                            transition duration-300
                                                                                    ">
                                                Explorar servicio →
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* CARD MÁS SERVICIOS */}
                            <div
                                className="min-w-65 sm:min-w-75 md:min-w-85 cursor-pointer group"
                                onClick={() =>
                                    navigate("/servicios", {
                                        state: { soloNuevos: true },
                                    })
                                }
                            >
                                <div
                                    className="
                                                relative h-105 sm:h-115 md:h-130
                                                rounded-3xl md:rounded-[2.5rem]
                                                overflow-hidden
                                                shadow-[0_15px_40px_rgba(0,0,0,0.12)]
                                                border border-gray-100
                                                transition-all duration-500
                                                md:group-hover:-translate-y-3
                                                md:group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]
                                            "
                                >
                                    {/* Imagen de fondo */}
                                    <img
                                        src="/img/17.webp"
                                        alt="Explorar más servicios"
                                        className="
                                                    absolute inset-0 w-full h-full object-cover
                                                    transition-transform duration-700
                                                    md:group-hover:scale-105
                                                "
                                    />

                                    {/* Overlay oscuro elegante */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />

                                    {/* Contenido */}
                                    <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 text-white">

                                        <div className="mb-4">
                                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md
                                flex items-center justify-center
                                border border-white/30">
                                                <span className="text-2xl font-light">+</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                                            Más servicios
                                        </h3>

                                        <p className="text-sm text-gray-200 leading-relaxed">
                                            Descubre todo nuestro catálogo y encuentra la solución ideal para ti.
                                        </p>

                                        <div className="
                                                        mt-6
                                                        flex items-center gap-2
                                                        text-cyan-400 font-medium text-sm
                                                        opacity-100 md:opacity-0
                                                        md:group-hover:opacity-100
                                                        transition duration-300
                                                    ">
                                            Ver catálogo completo →
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-24 flex justify-center">
                        <button
                            onClick={() => navigate("/servicios")}
                            className="group inline-flex items-center gap-3 px-14 py-4 rounded-full
                                        font-semibold text-white text-lg
                                        bg-linear-to-r from-blue-600 to-cyan-500
                                        shadow-[0_20px_40px_rgba(0,0,0,0.15)]
                                        hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)]
                                        hover:scale-105 transition-all duration-300"
                        >
                            Ver portafolio completo
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                </div>
            </section>


            {/* ================= CONTACTO ================= */}
            <section
                id="contacto"
                className="relative py-24 overflow-hidden
                            bg-linear-to-br from-slate-50 via-white to-blue-50"
            >
                {/* ===== Background estilo mapa ===== */}
                <div className="absolute inset-0 pointer-events-none">

                    {/* Líneas horizontales */}
                    <div className="absolute top-20 left-0 w-full h-px bg-blue-300/30" />
                    <div className="absolute top-48 left-0 w-full h-px bg-blue-300/20" />
                    <div className="absolute bottom-32 left-0 w-full h-px bg-blue-300/25" />

                    {/* Líneas verticales */}
                    <div className="absolute left-24 top-0 h-full w-px bg-cyan-300/30" />
                    <div className="absolute right-40 top-0 h-full w-px bg-cyan-300/20" />
                    <div className="absolute left-1/2 top-0 h-full w-px bg-cyan-300/25" />

                    {/* Rutas curvas */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 1000 600"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0 150 C 200 100, 400 200, 600 150 S 900 200, 1000 150"
                            fill="none"
                            stroke="rgba(59,130,246,0.2)"
                            strokeWidth="2"
                        />
                        <path
                            d="M0 350 C 300 300, 500 400, 800 350 S 1000 450, 1200 350"
                            fill="none"
                            stroke="rgba(14,165,233,0.2)"
                            strokeWidth="2"
                        />
                    </svg>

                    {/* Nodos tipo mapa */}
                    <div className="absolute top-32 left-1/4 w-3 h-3 bg-blue-500/40 rounded-full" />
                    <div className="absolute top-60 left-1/2 w-3 h-3 bg-cyan-500/40 rounded-full" />
                    <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-indigo-500/40 rounded-full" />

                    {/* Punto destacado */}
                    <div className="absolute bottom-28 left-1/3 w-6 h-6
                        bg-blue-500/20 rounded-full blur-sm" />
                </div>

                {/* ===== Contenido ===== */}
                <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Hablemos
                        </h2>

                        <p className="text-gray-600 text-lg">
                            Un asesor especializado le brindará atención
                            personalizada y oportuna.
                        </p>

                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-blue-600" />
                            <p className="text-gray-600">
                                Calle 20 No. 42-36, Barrio Morasurco. Pasto – Nariño.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="w-6 h-6 text-blue-600" />
                            <p className="text-gray-600">
                                300 858 0721 – 300 858 0684
                            </p>
                        </div>

                        <a
                            href="https://wa.me/573008580721"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4
                                    bg-green-600 hover:bg-green-700
                                    text-white rounded-full font-semibold
                                    shadow-lg hover:scale-105 transition"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp directo
                        </a>
                    </div>

                    <div className="rounded-3xl overflow-hidden shadow-2xl
                        backdrop-blur-sm bg-white/80">
                        <iframe
                            title="Ubicación"
                            className="w-full h-full min-h-100 border-0"
                            loading="lazy"
                            src="https://maps.google.com/maps?q=Cl.%2020%20%2342-36%2C%20Pasto&t=m&z=17&output=embed"
                        />
                    </div>
                </div>
            </section>

        </>
    );
}
