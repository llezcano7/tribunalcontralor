import React from 'react';
import { GoLaw } from "react-icons/go";
import { SlBookOpen } from "react-icons/sl";
import './legislacion.css';

const LegislacionPage = () => {
  const legislationLinks = [
    {
      id: 1,
      title: 'Constitución Nacional',
      description: 'Publicaciones oficiales y normativas vigentes',
      icon: <GoLaw />,
      url: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/804/norma.htm',
      featured: true,
    },
    {
      id: 2,
      title: 'Constitución Provincial',
      description: 'Base de datos de legislación actualizada',
      icon: <SlBookOpen />,
      url: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'Carta Orgánica Municipal',
      description: 'Disposiciones sancionadas por la Convención Municipal Constituyente',
      icon: <SlBookOpen />,
      url: '#',
      featured: false,
    },
    {
      id: 4,
      title: 'Ordenanzas Municipales',
      description: 'Normas jurídicas dicatadas por el Concejo Municipal',
      icon: <SlBookOpen />,
      url: '#',
      featured: false,
    }
  ];

  return (
    <section className= "legislacion-section container block-start">
        <div className= "legislacion-title">
            <h3>Legislación</h3>
            <p>Accedé a la información de las normativas vigentes nacionales, provinciales y municipales</p>
        </div>
         
      {/* Cards Grid */}
      <div className="cards-grid">
        {legislationLinks.map((link)=> <div key={link.id} className={`legislation-card ${link.featured ? 'featured' : ''}`}>
              <div className="card-header">
              <div className="card-icon">
                {link.icon}
              </div>
              <h3 className="card-title">{link.title}</h3>
              </div>
              <p className="card-description">{link.description}</p>
            <button className="card-btn" onClick={() => window.open(link.url, '_blank')}>Ver más</button>
          </div>
        )}
        </div>
    </section>
  );
};

export default LegislacionPage;