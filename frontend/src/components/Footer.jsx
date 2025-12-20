import { MapPin, Phone, Mail, MessageCircle, ShieldCheck } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-gray-400 border-t border-white/10">

            <div className="max-w-7xl mx-auto px-6 py-14">

                {/* Contenido principal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Marca */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="w-6 h-6 text-blue-400" />
                            <h3 className="text-xl font-semibold text-white">
                                Conrado Seguros
                            </h3>
                        </div>

                        <p className="text-sm leading-relaxed max-w-sm">
                            Soluciones integrales en seguros, orientadas a la
                            protección de su patrimonio con asesoría profesional
                            y confiable.
                        </p>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                            Contacto
                        </h4>

                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-blue-400 mt-1" />
                                <span>
                                    Calle 20 No. 42-36<br />
                                    Pasto – Nariño
                                </span>
                            </li>

                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span>300 858 0721 – 300 858 0684</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span>contacto@conradoseguros.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Acción */}
                    <div className="flex md:justify-end items-start">
                        <a
                            href="https://wa.me/573008580721"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-3
                                       bg-green-600 hover:bg-green-700
                                       text-white text-sm font-semibold
                                       rounded-full transition"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </a>
                    </div>
                </div>

                {/* Línea */}
                <div className="my-10 h-px bg-white/10"></div>

                {/* Footer inferior */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">

                    <span>
                        © {new Date().getFullYear()} Conrado Seguros. Todos los derechos reservados.
                    </span>

                    <span>
                        Diseñado con estándares profesionales por{" "}
                        <a
                            href="https://myportfoliohd.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-400 hover:text-blue-300 transition"
                        >
                            Harold Zambrano
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
