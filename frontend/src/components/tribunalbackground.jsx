import React from 'react';
import './tribunalBackground.css';

const TribunalBackground = ({children}) => {
  return (
    <div className="tribunal-hero">
      {/* Geometric abstract background layers */}
      <div className="background-layer layer-1"></div>
      <div className="background-layer layer-2"></div>
      <div className="background-layer layer-3"></div>
      
      {/* Animated geometric shapes */}
      <div className="geometric-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Grid overlay suggesting structure and order */}
      <div className="grid-overlay"></div>

      {/* Decorative lines suggesting documentation/order */}
      <div className="decorative-lines">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
      {children}
    </div>
  );
};

export default TribunalBackground;