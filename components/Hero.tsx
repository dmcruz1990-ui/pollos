import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="relative bg-brand-wood overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.ibb.co/Y4QxYrsf/Whats-App-Image-2025-12-12-at-9-31-26-AM.jpg" 
          alt="Granja background" 
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-wood via-brand-wood/90 to-transparent/50"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-left mb-10 md:mb-0">
          <div className="inline-block bg-brand-green text-white px-3 py-1 rounded-full text-sm font-bold mb-4 shadow-sm">
            <i className="fas fa-check-circle mr-2"></i> 100% Natural y Fresco
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-4 leading-tight">
            El Verdadero Sabor del <span className="text-brand-red">Pollo Criollo</span>
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-lg font-medium">
            Criados en un ambiente sano y natural. Sin químicos, sin conservantes. Directamente desde nuestra granja en Medellín a tu mesa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onCtaClick}
              className="bg-brand-red hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center"
            >
              <i className="fas fa-utensils mr-2"></i> Hacer Pedido
            </button>
            <a 
              href="#cotizar"
              className="bg-white/80 hover:bg-white text-brand-red border-2 border-brand-red font-bold py-3 px-8 rounded-lg shadow-md transition flex items-center justify-center backdrop-blur-sm"
            >
              <i className="fas fa-file-invoice-dollar mr-2"></i> Cotizar
            </a>
          </div>
        </div>
        
        {/* Simulated Product Image Composition */}
        <div className="md:w-1/2 flex justify-center relative mt-8 md:mt-0">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
             <div className="absolute inset-0 bg-brand-green rounded-full opacity-20 blur-3xl animate-pulse"></div>
             <img 
               src="https://i.ibb.co/ZRw5Q8tZ/Whats-App-Image-2025-12-12-at-9-31-33-AM-1.jpg" 
               alt="Pollo Criollo Fresco" 
               className="relative z-10 rounded-2xl shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500 object-cover w-full h-full"
             />
             <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-brand-red font-black text-xl p-4 rounded-full shadow-lg z-20 transform rotate-12 border-4 border-white">
               DESDE<br/>2019
             </div>
          </div>
        </div>
      </div>
      
      {/* Trust Badges Bar */}
      <div className="bg-brand-red text-white py-4 shadow-inner relative z-10">
        <div className="container mx-auto px-4 flex flex-wrap justify-around items-center text-center gap-4">
          <div className="flex items-center">
            <i className="fas fa-truck text-2xl mr-3"></i>
            <span className="font-bold">Domicilio Gratis*</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-medal text-2xl mr-3"></i>
            <span className="font-bold">Calidad Premium</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-leaf text-2xl mr-3"></i>
            <span className="font-bold">100% Orgánico</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;