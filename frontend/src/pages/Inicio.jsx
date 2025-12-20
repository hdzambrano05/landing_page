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

    /* ================= SCROLL MANUAL ================= */
    const scrollCarrusel = (direction) => {
        if (!carruselRef.current) return;

        carruselRef.current.scrollBy({
            left: direction === "left" ? -360 : 360,
            behavior: "smooth",
        });
    };

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
                className="py-20 bg-linear-to-b from-white to-gray-100 overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-14">
                        <span className="inline-block mb-3 px-4 py-1 text-xs uppercase
                                         bg-blue-100 text-blue-700 rounded-full">
                            Portafolio
                        </span>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Nuestros servicios
                        </h2>

                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Soluciones modernas, flexibles y diseñadas para
                            proteger lo que más importa.
                        </p>

                        <div className="mt-6 w-24 h-1 bg-linear-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
                    </div>

                    {/* Carrusel */}
                    <div className="relative">
                        {/* Flecha izquierda */}
                        <button
                            onClick={() => scrollCarrusel("left")}
                            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20
                                       bg-white/80 backdrop-blur-md p-3 rounded-full
                                       shadow-lg hover:scale-110 transition"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-800" />
                        </button>

                        <div
                            ref={carruselRef}
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                            className="flex gap-8 overflow-x-hidden px-2"
                        >
                            {[...servicios, ...servicios].map(
                                (servicio, index) => (
                                    <div
                                        key={index}
                                        className="min-w-70 md:min-w-90 cursor-pointer"
                                        onClick={() =>
                                            navigate("/servicios", {
                                                state: {
                                                    servicioId: servicio.id,
                                                },
                                            })
                                        }
                                    >
                                        <div
                                            className="relative h-105 rounded-3xl overflow-hidden
                                                       bg-white/40 backdrop-blur-xl
                                                       border border-white/40
                                                       shadow-xl hover:shadow-2xl
                                                       transition hover:-translate-y-4"
                                        >
                                            <img
                                                src={servicio.imagen}
                                                alt={servicio.titulo}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />

                                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                                            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                                                <h3 className="text-xl font-bold mb-2">
                                                    {servicio.titulo}
                                                </h3>
                                                <p className="text-sm text-gray-200 leading-relaxed">
                                                    {servicio.descripcion}
                                                </p>
                                                <div className="mt-4 h-1 w-12 bg-cyan-400 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Flecha derecha */}
                        <button
                            onClick={() => scrollCarrusel("right")}
                            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20
                                       bg-white/80 backdrop-blur-md p-3 rounded-full
                                       shadow-lg hover:scale-110 transition"
                        >
                            <ArrowRight className="w-6 h-6 text-gray-800" />
                        </button>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 flex justify-center">
                        <button
                            onClick={() => navigate("/servicios")}
                            className="inline-flex items-center gap-3 px-12 py-4 rounded-full
                                       font-semibold text-white
                                       bg-linear-to-r from-blue-600 to-cyan-500
                                       shadow-xl hover:scale-105 transition"
                        >
                            Ver portafolio completo
                            <ArrowRight className="w-5 h-5" />
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
