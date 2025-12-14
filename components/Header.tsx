import React from 'react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-brand-red">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Area */}
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center text-white mr-3 border-2 border-brand-green shadow-sm group-hover:scale-105 transition-transform">
            <i className="fas fa-drumstick-bite text-2xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-none">GRANJA <span className="text-brand-red">LOS POMOS</span></h1>
            <p className="text-xs text-brand-green font-bold tracking-wider">DEL CAMPO A TU MESA</p>
          </div>
        </div>

        {/* Navigation - Hidden on mobile, usually would use a hamburger menu but keeping simple */}
        <nav className="hidden md:flex space-x-8 font-semibold text-gray-600">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-red transition-colors">Inicio</button>
          <button onClick={() => onNavigate('products')} className="hover:text-brand-red transition-colors">Productos</button>
          <button onClick={() => onNavigate('about')} className="hover:text-brand-red transition-colors">Nosotros</button>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onCartClick} 
            className="relative p-2 text-gray-700 hover:text-brand-red transition-colors"
            aria-label="Ver carrito"
          >
            <i className="fas fa-shopping-cart text-2xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Sub-header for contact */}
      <div className="bg-brand-red text-white text-xs py-1 text-center md:hidden flex justify-center gap-3">
        <span><i className="fab fa-whatsapp mr-1"></i> 300 766 47 29</span>
        <span className="opacity-50">|</span>
        <span><i className="fab fa-whatsapp mr-1"></i> 311 727 18 46</span>
      </div>
    </header>
  );
};

export default Header;