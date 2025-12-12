import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {product.isCriollo && (
          <div className="absolute top-2 right-2 bg-brand-green text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            CRIOLLO
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-uppercase">Precio por {product.unit}</span>
            <span className="text-2xl font-bold text-brand-red">
              ${product.price.toLocaleString('es-CO')}
            </span>
          </div>
          
          <button 
            onClick={() => onAdd(product)}
            className="bg-brand-dark hover:bg-black text-white p-3 rounded-full shadow-lg transition-colors active:scale-95"
            aria-label="Agregar al carrito"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;