import { Link, NavLink } from "react-router-dom"
import { useState } from "react"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    const links = [
        { name: "Inicio", path: "/" },
        { name: "Nosotros", path: "/nosotros" },
        { name: "Servicios", path: "/servicios" },
        { name: "Contacto", path: "/contacto" },
    ]

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <nav className="bg-gray-900/70 backdrop-blur-xl border-b border-white/10 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* LOGO */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/img/01.png"
                            alt="Conrado Seguros"
                            className="h-9 w-auto"
                        />
                    </Link>

                    {/* MENU DESKTOP */}
                    <ul className="hidden md:flex items-center gap-10 font-medium text-gray-200">
                        {links.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `relative transition-colors duration-300
                                        ${isActive ? "text-white after:w-full" : "hover:text-white after:w-0"}
                                        after:absolute after:-bottom-2 after:left-0
                                        after:h-0.5 after:bg-blue-500
                                        after:transition-all after:duration-300`
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
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg transition hover:scale-105"
                        >
                            Asesoría
                        </a>
                    </div>

                    {/* BOTÓN MOBILE */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-gray-200 focus:outline-none"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                        >
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                </div>

                {/* MENU MOBILE */}
                <div
                    className={`md:hidden transition-all duration-300 overflow-hidden
                    ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
                >
                    <ul className="flex flex-col px-6 pb-6 pt-4 gap-6 text-gray-200 bg-gray-900/95 backdrop-blur-xl">
                        {links.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        `block text-lg transition
                                        ${isActive ? "text-blue-400" : "hover:text-white"}`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}

                        <a
                            href="https://wa.me/573008580721"
                            target="_blank"
                            className="mt-4 inline-block text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg"
                        >
                            Asesoría
                        </a>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
