import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import Footer from './components/Footer';
import { PRODUCTS } from './services/data';
import { Product, CartItem } from './types';

// New images provided
const GALLERY_IMAGES = [
  "https://i.ibb.co/ZRw5Q8tZ/Whats-App-Image-2025-12-12-at-9-31-33-AM-1.jpg",
  "https://i.ibb.co/wrjs4Rdn/Whats-App-Image-2025-12-12-at-9-31-33-AM.jpg",
  "https://i.ibb.co/f7NjQ2P/Whats-App-Image-2025-12-12-at-9-31-32-AM-1.jpg",
  "https://i.ibb.co/r2nK0D65/Whats-App-Image-2025-12-12-at-9-31-32-AM.jpg",
  "https://i.ibb.co/h6RcNx4/Whats-App-Image-2025-12-12-at-9-31-31-AM-1.jpg",
  "https://i.ibb.co/5Wny0rLj/Whats-App-Image-2025-12-12-at-9-31-31-AM.jpg",
  "https://i.ibb.co/NhVPKFL/Whats-App-Image-2025-12-12-at-9-31-30-AM.jpg",
  "https://i.ibb.co/hJrJhLK1/Whats-App-Image-2025-12-12-at-9-31-27-AM.jpg",
  "https://i.ibb.co/Y4QxYrsf/Whats-App-Image-2025-12-12-at-9-31-26-AM.jpg"
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState('home'); // 'home', 'products', 'about'

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products for homepage (e.g., show middle range: 6, 7, 8 lbs)
  const featuredProducts = PRODUCTS.filter(p => p.id >= 6 && p.id <= 8);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        cartCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={setView}
      />

      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero onCtaClick={() => setView('products')} />
            
            {/* Featured Products Section (Subset) */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Nuestros Productos Estrella</h2>
                  <div className="w-20 h-1 bg-brand-red mx-auto"></div>
                  <p className="mt-4 text-gray-600">Calidad garantizada, del campo a tu mesa.</p>
                </div>
                {/* Centered layout for products */}
                <div className="flex flex-wrap justify-center gap-8">
                  {featuredProducts.map(product => (
                    <div key={product.id} className="w-full max-w-sm transform hover:-translate-y-2 transition-transform duration-300">
                      <ProductCard product={product} onAdd={addToCart} />
                    </div>
                  ))}
                </div>
                <div className="text-center mt-12">
                   <button 
                    onClick={() => setView('products')}
                    className="inline-block border-2 border-brand-red text-brand-red font-bold py-3 px-8 rounded-full hover:bg-brand-red hover:text-white transition-colors"
                   >
                     Ver Todos los Tamaños
                   </button>
                </div>
              </div>
            </section>

            {/* Value Proposition / About Snippet */}
            <section className="py-16 bg-brand-wood relative">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                   <div className="md:w-1/2">
                      <img 
                        src="https://i.ibb.co/hJrJhLK1/Whats-App-Image-2025-12-12-at-9-31-27-AM.jpg" 
                        alt="Granja ambiente" 
                        className="rounded-lg shadow-xl border-4 border-white object-cover w-full h-64 md:h-96"
                      />
                   </div>
                   <div className="md:w-1/2">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Por qué elegir Pollos Los Pomos?</h2>
                      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        Nuestros pollos crecen libres de estrés, con alimentación 100% natural a base de maíz. 
                        Este proceso artesanal garantiza una textura firme, un color auténtico y ese sabor inconfundible 
                        del pollo de campo que recuerdas de la abuela.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-700 font-semibold">
                          <i className="fas fa-check text-brand-green mr-3"></i> Sin inyección de agua
                        </li>
                        <li className="flex items-center text-gray-700 font-semibold">
                          <i className="fas fa-check text-brand-green mr-3"></i> Alimentación vegetal
                        </li>
                        <li className="flex items-center text-gray-700 font-semibold">
                          <i className="fas fa-check text-brand-green mr-3"></i> Apoyo al campo antioqueño
                        </li>
                      </ul>
                   </div>
                </div>
            </section>

            {/* New Gallery Section */}
            <section className="py-16 bg-stone-100">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Galería de la Granja</h2>
                  <div className="w-20 h-1 bg-brand-green mx-auto"></div>
                  <p className="mt-4 text-gray-600">Así cuidamos nuestros productos día a día.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {GALLERY_IMAGES.map((img, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md h-48 md:h-64 group cursor-pointer">
                      <img 
                        src={img} 
                        alt={`Galería Los Pomos ${index + 1}`} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

             {/* Quote / Bulk Section */}
             <section id="cotizar" className="py-16 bg-white">
               <div className="container mx-auto px-4 text-center max-w-3xl">
                 <div className="bg-brand-red rounded-3xl p-8 md:p-14 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
                    
                    <i className="fas fa-hand-holding-dollar text-6xl mb-6 text-yellow-400"></i>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">¿Negocio, Asadero o Evento?</h2>
                    <p className="mb-8 text-lg md:text-xl opacity-90">
                      Manejamos precios especiales para mayoristas y restaurantes.
                      <br/><strong>¡Hablemos directamente y coticemos tu pedido!</strong>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <a 
                        href="https://wa.me/573007664729?text=Hola%20Granja%20Los%20Pomos,%20me%20gustaría%20cotizar%20pollos%20al%20por%20mayor."
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center bg-white text-brand-red font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1"
                      >
                        <i className="fab fa-whatsapp text-2xl mr-2 text-green-500"></i> 
                        <span className="text-lg">Cotizar Línea 1</span>
                      </a>
                      <a 
                        href="https://wa.me/573117271846?text=Hola%20Granja%20Los%20Pomos,%20me%20gustaría%20cotizar%20pollos%20al%20por%20mayor."
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center bg-brand-red border-2 border-white text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-white hover:text-brand-red transition transform hover:-translate-y-1"
                      >
                        <i className="fab fa-whatsapp text-2xl mr-2"></i> 
                        <span className="text-lg">Cotizar Línea 2</span>
                      </a>
                    </div>
                 </div>
               </div>
             </section>
          </>
        )}

        {/* Full Products View */}
        {view === 'products' && (
          <section className="py-12 bg-gray-50 min-h-screen">
             <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800">Realizar Pedido</h2>
                  <div className="text-sm breadcrumbs text-gray-500">
                    <span className="cursor-pointer hover:underline" onClick={() => setView('home')}>Inicio</span> / Productos
                  </div>
                </div>
                
                {/* Product Grid (All products) */}
                <div className="flex flex-wrap justify-center gap-6">
                  {PRODUCTS.map(product => (
                    <div key={product.id} className="w-full max-w-sm">
                      <ProductCard product={product} onAdd={addToCart} />
                    </div>
                  ))}
                </div>
             </div>
          </section>
        )}

        {/* About View */}
        {view === 'about' && (
           <section className="py-12 bg-white min-h-screen">
             <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Nuestra Historia</h2>
                <div className="prose prose-lg mx-auto text-gray-600">
                  <p>
                    En <strong>Granja Los Pomos</strong>, nacimos en 2019 con un sueño claro: devolver a la mesa de las familias paisas el sabor auténtico del pollo de campo.
                  </p>
                  <p>
                    Ubicados en las montañas de Medellín, aprovechamos el clima y el aire puro para criar aves felices. Creemos firmemente que "somos lo que comemos", por eso nuestros procesos respetan los ciclos naturales de crecimiento.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                    <img src="https://i.ibb.co/Y4QxYrsf/Whats-App-Image-2025-12-12-at-9-31-26-AM.jpg" className="rounded-lg shadow-md w-full h-64 object-cover" alt="Granja" />
                    <img src="https://i.ibb.co/NhVPKFL/Whats-App-Image-2025-12-12-at-9-31-30-AM.jpg" className="rounded-lg shadow-md w-full h-64 object-cover" alt="Producto Fresco" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-red mb-4">Nuestra Misión</h3>
                  <p>
                    Producir y comercializar alimentos de alta calidad nutricional, garantizando la seguridad alimentaria y promoviendo el desarrollo sostenible del campo.
                  </p>
                </div>
             </div>
           </section>
        )}
      </main>

      <Footer />
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
      
      {/* Floating WhatsApp Button - Main Number */}
      <a 
        href="https://wa.me/573007664729" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors z-40 flex items-center justify-center animate-bounce-slow"
        aria-label="Contactar por WhatsApp"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
      </a>
    </div>
  );
}

export default App;