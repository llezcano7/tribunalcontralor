import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { IoLocation } from "react-icons/io5";
import { IoAtOutline } from "react-icons/io5";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import "./header.css"


export default function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const navRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => {
        setIsOpen(false);
        setOpenMenu(null);
    };
    const toggleDropdown = (name) => setOpenMenu(openMenu === name ? null : name);

    useEffect(() => {
        function handleClickOutside(e) {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setOpenMenu(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div className='top-header container'>
                <div className='header-icons'>
                    <p><IoLocation className='email-icon' />Edificio ex aduana, Centro Cívico</p>
                    <p><IoAtOutline className='email-icon' />tribunalcontralormscb@gmail.com</p>
                    <p><IoIosPhonePortrait className='phone-icon' />0294-428679</p>
                </div>
            </div>
            <header className='header-section container' ref={navRef}>
                <Link to="/"><img className='logo' src="/Logo.png" alt="logo principal del Tribunal Contralor de San Carlos de Bariloche" /></Link>
                <nav className={`navigator ${isOpen ? "open" : ""}`}>
                    <Link to="/" onClick={closeMenu}>Inicio</Link>
                    <Link to="/organizacion" onClick={closeMenu}>Organización</Link>
                    <Link to="/legislacion" onClick={closeMenu}>Legislación</Link>

                    <div className="dropdown">
                        <Link to="/informacionpublica" onClick={closeMenu}>Información Pública</Link>
                    </div>

                    <div className="dropdown">
                        <button className="dropdown-toggle" onClick={() => toggleDropdown('institucional')}>
                            Institucional {openMenu === 'institucional' ? '▲' : '▼'}
                        </button>
                        {openMenu === 'institucional' && (
                            <ul className="dropdown-menu">
                                <li><a href="https://concejobariloche.gov.ar/" onClick={closeMenu}>Concejo Bariloche</a></li>
                                <li><a href="https://www.bariloche.gov.ar/" onClick={closeMenu}>Municipio Bariloche</a></li>
                                <li><a href="https://www.defensoriabariloche.gob.ar/" onClick={closeMenu}>Defensoría del Pueblo</a></li>
                            </ul>
                        )}
                    </div>
                    <Link to="/declaracionesjuradas" onClick={closeMenu}>Declaraciones Juradas</Link>
                    <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
                </nav>
                <button className="hamburger" onClick={toggleMenu}>
                    {isOpen ? <FiX size={30} /> : <IoMenu size={30} />}
                </button>
            </header>
        </>
    )
}