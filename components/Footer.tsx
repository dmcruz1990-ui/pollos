import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-12 pb-6 border-t-8 border-brand-red">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div>
             <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-white mr-3">
                    <i className="fas fa-drumstick-bite"></i>
                </div>
                <h3 className="text-2xl font-bold">GRANJA LOS POMOS</h3>
             </div>
             <p className="text-gray-400 mb-4">
               Productores y comercializadores de pollo 100% criollo en Medellín.
               Calidad, frescura y sabor del campo a tu mesa desde 2019.
             </p>
             <div className="flex space-x-4">
               <a href="#" className="text-white hover:text-brand-red transition-colors"><i className="fab fa-facebook-f text-2xl"></i></a>
               <a href="#" className="text-white hover:text-brand-red transition-colors"><i className="fab fa-instagram text-2xl"></i></a>
               <div className="flex flex-col gap-1">
                 <a href="https://wa.me/573007664729" target="_blank" rel="noreferrer" className="text-white hover:text-brand-red transition-colors text-sm"><i className="fab fa-whatsapp"></i> 300 766 47 29</a>
                 <a href="https://wa.me/573117271846" target="_blank" rel="noreferrer" className="text-white hover:text-brand-red transition-colors text-sm"><i className="fab fa-whatsapp"></i> 311 727 18 46</a>
               </div>
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-brand-red">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-300">
              <li><button className="hover:text-white transition">Inicio</button></li>
              <li><button className="hover:text-white transition">Nuestros Productos</button></li>
              <li><button className="hover:text-white transition">Zona de Cobertura</button></li>
              <li><button className="hover:text-white transition">Contáctanos</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-brand-red">Contacto</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-brand-red"></i>
                <span>Medellín, Antioquia<br/>Vereda Los Pomos</span>
              </li>
              <li className="flex flex-col">
                <a href="https://wa.me/573007664729" target="_blank" rel="noreferrer" className="flex items-center hover:text-white transition group">
                    <i className="fab fa-whatsapp mr-3 text-brand-red group-hover:text-green-500"></i>
                    <span className="text-lg font-bold">300 766 47 29</span>
                </a>
                <a href="https://wa.me/573117271846" target="_blank" rel="noreferrer" className="flex items-center hover:text-white transition mt-1 group">
                    <i className="fab fa-whatsapp mr-3 text-brand-red group-hover:text-green-500"></i>
                    <span className="text-lg font-bold">311 727 18 46</span>
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-brand-red"></i>
                <span>ventas@granjalospomos.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Granja Los Pomos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;