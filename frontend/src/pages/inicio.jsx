import React from 'react';
import { useState, useEffect } from 'react';
import TribunalBackground from '../components/tribunalbackground';
import { MdEmail } from 'react-icons/md';
import { FaMapLocationDot } from 'react-icons/fa6';
import { FaPhoneVolume } from 'react-icons/fa6';
import { MdWorkHistory } from 'react-icons/md';
import MapComponent from '../components/map'
import Cazaux from "../assets/images/Foto-Estanislao-Cazaux.jpg";
import Romero from "../assets/images/Foto-Esteban-Romero.jpg";
import Vila from "../assets/images/Foto-Damian-Alberto-Vila.jpg";
import ContactForm from '../components/ContactForm';
import './inicio.css';

export default function Inicio() {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setSelected(null);
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);


    const [selected, setSelected] = useState(null);


    const staff = [
        {
            img: Cazaux,
            name: "Dr. Estanislao Cazaux",
            role: "Presidente",
            description: `Nació el 20 de abril de 1979 en General Roca, Río Negro, y cursó sus estudios universitarios en la Ciudad de Buenos Aires, donde se graduó en el año 2004 de la carrera de Abogacía con la distinción al mérito académico otorgada por el Colegio de Abogados de la Ciudad de Buenos Aires.  
            
            El Dr. Cazaux cuenta con un diploma en Litigación Oral Penal del Colegio de Leyes de la American University en Washington D.C., Estados Unidos. En su carrera profesional, se ha desempeñado como Secretario del Concejo Deliberante de General Roca y Presidente de la Junta Electoral de dicha ciudad. En 2011, se trasladó a San Carlos de Bariloche, donde fue nombrado Subdirector de Tierras de la Provincia de Río Negro y posteriormente Subdirector del Centro Administrativo Provincial de la misma ciudad. 
            
            El 10 de diciembre de 2019, asumió el cargo de Vocal del Tribunal de Contralor de San Carlos de Bariloche por el partido Frente de Todos, y fue reelecto para el periodo 2023-2027 por Juntos por el Cambio.`
        },
        {
            img: Romero,
            name: "Sr. Estebán Romero",
            role: "Vicepresidente",
            description: `Nació el 27 de diciembre de 1980 en la Ciudad de Moreno Provincia de Buenos Aires. En 2002 se trasladó a vivir a la Ciudad de San Carlos de Bariloche, donde estudió la carrera de Técnico Superior en Enfermería, graduándose de la misma. 
            
            En el período 2011-2017 asumió como Delegado de Trabajo de Bariloche de la Secretaria de trabajo de Rio Negro.Posteriormente, en el año 2021, asumió como Secretario General adjunto de la Asociación Trabajadores de la Sanidad Argentina(ATSA), mientras que en 2022 se hizo cargo de la Secretaría General Adjunta de la CGT Zona Andina y Comarca. 
            
            Finalmente, en diciembre de 2023, asumió como Vocal del Tribunal de Contralor de San Carlos de Bariloche para el período 2023-2027.`
        },
        {
            img: Vila,
            name: "Dr. Damián Alberto Vila",
            role: "Vocal",
            description: `Nació el 13 de julio de 1973 en la Ciudad de Buenos Aires. En 1996 egresó de la carrera de Abogacía en la Universidad de Belgrano. Se desempeñó como docente de la Universidad FASTA en las materias de Derecho del Consumidor y Derecho Administrativo. 
            
            El Dr. Vila cuenta con un vasto historial académico en el que se destaca el Posgrado de Especialización en Derecho de la Empresa dictado por la Universidad de Belgrano, el  Diplomado Superior Universitario en Derecho de Consumo dictado por la Universidad Nacional del Sur y el curso de Posgrado en Derecho Administrativo dictado por el Colegio de Abogados de San Carlos de Bariloche y la Universidad de Rio Negro.También Concurrió al “Program of Instrucción for Lawyers” dictado por  Harvard Law School.
            
            Se ha desempeñado en la administración pública como Asesor Legal de la Dirección de Comercio Interior de la Provincia de Rio Negro y la Agencia de Recaudación Tributaria. Asimismo fue designado como Árbitro Institucional de la Corte de Arbitraje del CEARI del Colegio de Abogados de San Carlos de Bariloche y posteriormente se desempeñó como Tutor del PROCAE  a cargo del Instituto Nacional de la Administración Pública y como capacitador en el IPAP de la Provincia de Río Negro. 
            
            Formó parte de la Comisión Directiva de la Asociación de Estudios de Derecho de Seguros del Interior Argentino y participó como disertante y asistente en diversos Congresos y Jornadas académicas.A su vez ha sido autor de publicaciones doctrinarias en materia de derecho de consumo y ha colaborado en la redacción de normativas de procedimientos en materia de consumo para la Provincia de Río Negro.`
        },

    ]


    return (
        <>
            {/* HERO-SECTION */}

            <TribunalBackground>
                <section className='hero-section container block-start'>
                    <div className='content-wrapper'>
                        <h1 className='hero-title'>
                            Tribunal de Contralor
                            <span className='title-accent'>Municipalidad de Bariloche</span>
                        </h1>
                        <p className='hero-subtitle'>
                            Transparencia, control y responsabilidad en la gestión pública
                        </p>
                        <div className='hero-actions'>
                            <button className='btn btn-primary'>Consultas Públicas</button>
                            <button className='btn btn-secondary'>Informes y Auditorías</button>
                        </div>
                    </div>
                </section>
            </TribunalBackground>

            {/* ABOUTUS-SECTION */}

            <section className='aboutus block-start flex'>
                <div className='aboutus-content'>
                    <div className='aboutus-title'>
                        <h3>Nuestra <span className='uppercase'>historia</span> </h3>
                        <div className='typewriter'>
                            <div className='slide'><i></i></div>
                            <div className='paper'></div>
                            <div className='keyboard'></div>
                        </div>
                    </div>
                    <p>El Tribunal de Contralor de la ciudad de San Carlos de Bariloche es un organismo que fue incorporado como Departamento de Contralor mediante la reformulación de la Carta Orgánica Municipal de la ciudad pubicada en enero del año 2007. De esta manera pasó a formar parte de uno de los tres departamentos del gobierno municipal junto con el Departamento Ejecutivo y  el Departamento Deliberante.
                        <br />
                        <br />
                        Antes de dicha reforma, este organismo funcionaba como Tribunal de Cuentas, sin autarquía financiera y administrativa, y con funciones acotadas.Actualmente, su funcionamiento y facultades se encuentran reguladas por la Carta Orgánica Municipal en los artículos que van del Nº 53 al Nº 64, y en la Ordenanza Nº 1754-CM-2007 Ordenanza Orgánica del Tribunal de Contralor y modificatorias.
                        <br />
                        <br />
                        Actualmente, su funcionamiento y facultades se encuentran reguladas por la Carta Orgánica Municipal en los artículos que van del Nº 53 al Nº 64, y en la Ordenanza Nº 1754-CM-2007 Ordenanza Orgánica del Tribunal de Contralor y modificatorias.
                    </p>
                </div>
            </section>

            {/* STAFF-SECTION */}

            {
                selected && (
                    <div className="modal-overlay" onClick={() => setSelected(null)}>
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="close-btn"
                                onClick={() => setSelected(null)}
                            >
                                ✕
                            </button>

                            <img src={selected.img} alt={selected.name} />
                            <h3>{selected.name}</h3>
                            <span>{selected.role}</span>
                            <p>{selected.description}</p>
                        </div>
                    </div>
                )
            }
            <section className='staff container block-start'>
                <h3>Nuestras autoridades</h3>
                <span className='title-line'></span>
                <div className='staff-members'>
                    {staff.map((member, index) => (
                        <div
                            className='staff-card'
                            key={index}
                            onClick={() => setSelected(member)}
                        >
                            <img src={member.img} alt={member.name} />
                            <h4>{member.name}</h4>
                            <span>{member.role}</span>
                        </div>
                    ))}
                </div>

            </section>

            {/* FINDUS-SECTION */}

            <section className='findus block-start'>
                <h3>Encontranos</h3>
                <div className='map'>
                    <MapComponent />
                </div>

                {/* CONTACT-SECTION */}

                <section className='contact-inicio container block-start'>
                    <h3>Contacto</h3>
                    <h4>¿Tenés alguna consulta o sugerencia? ¡No dudes en contactarnos!</h4>
                    <ContactForm />
                </section>
            </section>
        </>
    )
}