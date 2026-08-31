import React from "react";
import { Link } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { PiEnvelopeThin } from "react-icons/pi";
import './footer.css';

const SITEMAP = [
    { label: "Organización", to: "/organizacion" },
    { label: "Legislación", to: "/legislacion" },
    { label: "Información Pública", to: "/informacionpublica" },
    { label: "Novedades", to: "/novedades" },
    { label: "Declaraciones Juradas", to: "/declaracionesjuradas" },
    { label: "Contacto", to: "/contacto" },
];

export default function Footer() {
    return (
        <footer className="footer-section container">
            <div className="footer-wrapper">

                {/* LOGO + CONTACTO */}
                <div className="footer-brand">
                    <Link to="/">
                        <img className="footer-logo" src="/Logo.png" alt="Logo Tribunal Contralor de San Carlos de Bariloche" />
                    </Link>
                </div>

                {/* SITEMAP */}
                <nav className="footer-sitemap">
                    <h4 className="footer-sitemap-title">sitemap</h4>
                    <ul className="footer-sitemap-list">
                        {SITEMAP.map((item) => (
                            <li key={item.to}>
                                <Link to={item.to} className="footer-sitemap-link">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="footer-contact">
                    <p><IoLocation className="footer-icon" /> Edificio ex aduana, Centro Cívico</p>
                    <p><IoIosPhonePortrait className="footer-icon" /> 0294-428679</p>
                    <p><IoTimeOutline className="footer-icon" /> Lunes a viernes de 8:30 a 14:30</p>
                    <p><PiEnvelopeThin className="footer-icon" /> tribunalcontralormscb@gmail.com</p>
                </div>

            </div>

            {/* SUBFOOTER */}
            <div className="footer-sub">
                <p>© {new Date().getFullYear()} Tribunal de Contralor — Municipio de San Carlos de Bariloche</p>
                <p>Design created by <span className="footer-credit">FLEXMEDIA</span></p>
            </div>
        </footer>
    );
}