export default function Nosotros() {
    return (
        <>
            {/* HERO NOSOTROS */}
            <section className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] pt-20 flex items-center overflow-hidden group">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-4000 group-hover:scale-100"
                    style={{ backgroundImage: "url('/img/04.webp')" }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center md:text-left">
                    <span className="inline-block mb-3 px-4 py-1 text-xs tracking-[0.3em] uppercase bg-white/10 backdrop-blur-md rounded-full text-gray-200">
                        Conrado Seguros
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                        Nuestra experiencia <br className="hidden md:block" />
                        es su tranquilidad
                    </h1>

                    <p className="mt-3 text-gray-300 max-w-2xl text-base md:text-lg">
                        Más de seis décadas acompañando empresas y personas con soluciones de protección confiables.
                    </p>
                </div>
            </section>

            {/* INTRODUCCIÓN */}
            <section className="py-12 md:py-14 max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
                <div className="space-y-5">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Conrado Seguros
                    </h2>

                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        Conrado Seguros cuenta con más de 60 años de experiencia en el
                        sector empresarial, construyendo relaciones basadas en la
                        confianza, el profesionalismo y el compromiso.
                    </p>

                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        A lo largo de nuestra trayectoria hemos adquirido lo más valioso:
                        nuestro talento humano, preparado para brindar asesoría clara,
                        estratégica y personalizada en la adecuada transferencia de riesgos.
                    </p>
                </div>

                <div className="relative group rounded-2xl overflow-hidden shadow-lg h-[280px] md:h-[340px]">
                    <img
                        src="/img/03.jpg"
                        alt="Equipo Conrado Seguros"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                </div>
            </section>

            {/* MISIÓN Y VISIÓN */}
            <section className="relative py-20 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6">

                    {/* Encabezado Institucional */}
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-block mb-4 px-4 py-1 text-xs tracking-[0.25em] uppercase text-blue-700 font-semibold border border-blue-200 rounded-full">
                            Nuestro Propósito
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Compromiso, visión y excelencia
                        </h2>

                        <div className="w-16 h-[2px] bg-blue-600 mx-auto mt-6"></div>
                    </div>

                    {/* Grid Institucional */}
                    <div className="grid md:grid-cols-2 gap-10">

                        {/* MISIÓN */}
                        <div className="group bg-gray-50 border border-gray-200 rounded-xl p-10 transition-all duration-300 hover:shadow-xl hover:border-blue-200">

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-600 text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                        <circle cx="12" cy="12" r="9" />
                                    </svg>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 tracking-wide">
                                    Nuestra Misión
                                </h3>
                            </div>

                            <p className="text-gray-600 leading-relaxed text-base">
                                Brindar tranquilidad y protección a nuestros clientes, contando con el aliado que necesitan para transferir sus riesgos a través de soluciones integrales de seguros incluyendo en especial la asesoría jurídica, con el fin de buscar las mejores alternativas para asegurar sus intereses ante cualquier eventualidad, generando así confianza en todo momento.
                            </p>
                        </div>

                        {/* VISIÓN */}
                        <div className="group bg-gray-50 border border-gray-200 rounded-xl p-10 transition-all duration-300 hover:shadow-xl hover:border-blue-200">

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-600 text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 tracking-wide">
                                    Nuestra Visión
                                </h3>
                            </div>

                            <p className="text-gray-600 leading-relaxed text-base">
                               En el 2025 seremos clasificados como la agencia de seguros líder por excelencia en la región, siendo reconocidos por su confianza, responsabilidad y compromiso con el bienestar de sus clientes.
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* CIERRE */}
            <section className="py-14 max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Un aliado estratégico para su futuro
                </h2>

                <p className="mt-3 text-gray-600 text-base md:text-lg leading-relaxed">
                    En Conrado Seguros trabajamos para convertirnos en su respaldo
                    permanente, acompañándolo en cada decisión con profesionalismo,
                    cercanía y soluciones que generan tranquilidad y confianza.
                </p>
            </section>
        </>
    );
}
