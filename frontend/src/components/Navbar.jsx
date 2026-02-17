import { Link, NavLink, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    const links = [
        { name: "Inicio", path: "/" },
        { name: "Nosotros", path: "/nosotros" },
        { name: "Servicios", path: "/servicios" },
        { name: "Contacto", path: "/contacto" },
    ]

    /* Scroll navbar */
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    /* Cerrar al cambiar ruta */
    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    /* Bloquear scroll cuando menú está abierto */
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto"
    }, [open])

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <nav
                className={`transition-all duration-500 border-b 
                ${scrolled
                        ? "bg-gray-950/95 backdrop-blur-xl border-white/10 shadow-xl"
                        : "bg-gray-900/60 backdrop-blur-lg border-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* LOGO */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/img/01.png"
                            alt="Conrado Seguros"
                            className="h-9 w-auto transition hover:scale-105"
                        />
                    </Link>

                    {/* MENU DESKTOP */}
                    <ul className="hidden md:flex items-center gap-10 font-medium text-gray-300">
                        {links.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `relative transition duration-300
                                        ${isActive ? "text-white" : "hover:text-white"}
                                        after:content-['']
                                        after:absolute
                                        after:left-1/2
                                        after:-bottom-2
                                        after:h-0.5
                                        after:bg-blue-500
                                        after:transition-all
                                        after:duration-300
                                        after:-translate-x-1/2
                                        ${isActive ? "after:w-6" : "after:w-0 hover:after:w-6"}`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* CTA DESKTOP */}
                    <div className="hidden md:block">
                        <a
                            href="https://wa.me/573008580721"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-500 
                            hover:from-blue-500 hover:to-blue-400 
                            text-white rounded-full font-semibold 
                            shadow-lg shadow-blue-600/20 
                            transition duration-300 hover:scale-105 active:scale-95"
                        >
                            Asesoría
                        </a>
                    </div>

                    {/* BOTÓN MOBILE */}
                    <button
                        onClick={() => setOpen(true)}
                        aria-label="Abrir menú"
                        className="md:hidden text-gray-200"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* OVERLAY MOBILE PREMIUM */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-2xl transition-all duration-500 md:hidden
                ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                <div className="flex flex-col h-full px-8 py-10">

                    {/* Header overlay */}
                    <div className="flex justify-between items-center mb-12">
                        <img
                            src="/img/01.png"
                            alt="Conrado Seguros"
                            className="h-8"
                        />
                        <button
                            onClick={() => setOpen(false)}
                            className="text-white"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Links animados */}
                    <ul className="flex flex-col gap-8 text-2xl font-semibold text-white">
                        {links.map((item, index) => (
                            <li
                                key={item.path}
                                className={`transform transition-all duration-500
                                ${open
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-8 opacity-0"
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-400"
                                            : "hover:text-blue-300 transition"
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* CTA tipo tarjeta */}
                    <div className="mt-auto">
                        <a
                            href="https://wa.me/573008580721"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-4 mt-10
                            bg-linear-to-r from-blue-600 to-blue-500
                            text-white font-bold rounded-2xl
                            shadow-xl shadow-blue-600/30
                            transition hover:scale-105 active:scale-95"
                        >
                            Solicitar Asesoría Personalizada
                        </a>
                    </div>

                </div>
            </div>
        </header>
    )
}
