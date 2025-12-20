
export default function Nosotros() {
    return (
        <>
            {/* HERO NOSOTROS */}
            <section className="relative min-h-[60vh] sm:min-h-[65vh] md:h-[70vh] pt-24 sm:pt-28 md:pt-32 flex items-center overflow-hidden group">
                {/* Background parallax */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-local sm:bg-fixed scale-110 transition-transform duration-4000 group-hover:scale-105"
                    style={{ backgroundImage: "url('/img/04.webp')" }}
                ></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90"></div>

                {/* Contenido */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center sm:text-left">
                    <span className="inline-block mb-6 px-5 py-1.5 text-xs tracking-[0.3em] uppercase bg-white/10 backdrop-blur-md rounded-full text-gray-200 opacity-0 animate-fade-in">
                        Conrado Seguros
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight opacity-0 animate-slide-up delay-150">
                        Nuestra experiencia <br className="hidden md:block" />
                        es su tranquilidad
                    </h1>

                    <p className="mt-4 sm:mt-6 text-gray-300 max-w-2xl text-base sm:text-lg md:text-lg opacity-0 animate-slide-up delay-300">
                        Más de seis décadas acompañando empresas y personas con soluciones de protección confiables.
                    </p>
                </div>
            </section>

            {/* INTRODUCCIÓN */}
            <section className="py-24 sm:py-28 md:py-32 max-w-7xl mx-auto px-6 grid gap-12 sm:grid-cols-1 md:grid-cols-2 items-center">
                {/* Texto */}
                <div className="space-y-6 opacity-0 animate-slide-up">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                        Conrado Seguros
                    </h2>

                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                        Conrado Seguros cuenta con más de 60 años de experiencia en el
                        sector empresarial, construyendo relaciones basadas en la
                        confianza, el profesionalismo y el compromiso.
                    </p>

                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                        A lo largo de nuestra trayectoria hemos adquirido lo más valioso:
                        nuestro talento humano, preparado para brindar asesoría clara,
                        estratégica y personalizada en la adecuada transferencia de riesgos.
                    </p>
                </div>

                {/* Imagen */}
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl opacity-0 animate-slide-up delay-200">
                    <img
                        src="/img/03.jpg"
                        alt="Equipo Conrado Seguros"
                        className="w-full object-cover aspect-video sm:aspect-video md:aspect-auto transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                </div>
            </section>

            {/* MISIÓN Y VISIÓN */}
            <section className="relative py-36 bg-linear-to-b from-gray-50 via-white to-gray-100">
                {/* Decoración fondo */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    {/* Título sección */}
                    <div className="text-center max-w-3xl mx-auto mb-20 opacity-0 animate-fade-in">
                        <span className="inline-block mb-4 px-5 py-1.5 text-xs tracking-[0.3em] uppercase bg-blue-600/10 rounded-full text-blue-700 font-semibold">
                            Nuestro Propósito
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
                            Lo que nos guía cada día
                        </h2>

                        <p className="mt-6 text-gray-600 text-lg">
                            Nuestra misión y visión reflejan el compromiso que tenemos
                            con cada cliente y con el futuro que construimos juntos.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2">
                        {/* MISIÓN */}
                        <div className="group relative bg-white p-8 sm:p-12 md:p-16 rounded-3xl shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl opacity-0 animate-slide-up">
                            {/* Glow */}
                            <div className="absolute inset-0 rounded-3xl bg-blue-600/5 opacity-0 group-hover:opacity-100 transition"></div>

                            {/* Icono */}
                            <div className="relative mb-8 flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600 text-white shadow-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 h-10"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                    <circle cx="12" cy="12" r="9" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-extrabold text-gray-900 mb-4">
                                Nuestra Misión
                            </h3>

                            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                                Brindar tranquilidad y protección a nuestros clientes,
                                siendo el aliado que necesitan para transferir sus riesgos
                                a través de soluciones integrales de seguros, con énfasis
                                en la asesoría jurídica y la búsqueda de las mejores
                                alternativas para proteger sus intereses ante cualquier
                                eventualidad, generando confianza en todo momento.
                            </p>
                        </div>

                        {/* VISIÓN */}
                        <div className="group relative bg-white p-8 sm:p-12 md:p-16 rounded-3xl shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl opacity-0 animate-slide-up delay-200">
                            {/* Glow */}
                            <div className="absolute inset-0 rounded-3xl bg-blue-600/5 opacity-0 group-hover:opacity-100 transition"></div>

                            {/* Icono */}
                            <div className="relative mb-8 flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600 text-white shadow-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 h-10"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-extrabold text-gray-900 mb-4">
                                Nuestra Visión
                            </h3>

                            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                                En el año 2025 seremos reconocidos como la agencia de seguros
                                líder por excelencia en la región, destacándonos por nuestra
                                confianza, responsabilidad y compromiso con el bienestar
                                integral de nuestros clientes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CIERRE */}
            <section className="py-28 sm:py-32 max-w-5xl mx-auto px-6 text-center opacity-0 animate-fade-in">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    Un aliado estratégico para su futuro
                </h2>

                <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
                    En Conrado Seguros trabajamos para convertirnos en su respaldo
                    permanente, acompañándolo en cada decisión con profesionalismo,
                    cercanía y soluciones que generan tranquilidad y confianza.
                </p>
            </section>
        </>
    );
}
