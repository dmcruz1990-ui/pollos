import React, { useState, useEffect } from 'react';
import { CartItem, OrderDetails } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemove,
  onClear
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [orderId, setOrderId] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerName: '',
    phone: '',
    address: '',
    neighborhood: '',
    paymentMethod: 'efectivo',
    notes: ''
  });

  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    if (isOpen) setStep('cart');
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = (id: string) => {
    // Lista de productos con saltos de línea estándar
    const itemsList = cart.map(item => 
      `▪️ ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-CO')})`
    ).join('\n');

    const totalFormatted = total.toLocaleString('es-CO');
    const date = new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });

    // Construcción del mensaje limpio usando template strings y saltos de línea \n
    // encodeURIComponent se encargará de convertir \n en %0A y caracteres especiales
    return `*🍗 NUEVO PEDIDO - GRANJA LOS POMOS 🍗*\n` +
           `📅 Fecha: ${date}\n` +
           `🆔 Orden: #${id}\n\n` +
           `*👤 DATOS DEL CLIENTE:*\n` +
           `Nombre: ${orderDetails.customerName}\n` +
           `Teléfono: ${orderDetails.phone}\n` +
           `Barrio: ${orderDetails.neighborhood}\n` +
           `Dirección: ${orderDetails.address}\n` +
           `Pago: ${orderDetails.paymentMethod.toUpperCase()}\n` +
           (orderDetails.notes ? `Notas: ${orderDetails.notes}\n` : '') +
           `\n*🛒 DETALLE DEL PEDIDO:*\n${itemsList}\n\n` +
           `*💰 TOTAL A PAGAR: $${totalFormatted}*`;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generar un ID de orden aleatorio de 4 dígitos (0000 - 9999)
    // Usamos Math.random para variar más que Date.now() en pruebas rápidas
    const newOrderId = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    setOrderId(newOrderId);

    const message = generateWhatsAppMessage(newOrderId);
    const phoneNumber = "573007664729"; 
    
    // CRÍTICO: Usar encodeURIComponent asegura que todo el texto, espacios, 
    // emojis y saltos de línea se pasen correctamente a la URL de WhatsApp.
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappUrl, '_blank');

    setStep('success');
    // Limpiamos el carrito después de un momento
    setTimeout(() => {
      onClear();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in-right">
          
          {/* Header */}
          <div className="bg-brand-red px-4 py-6 sm:px-6 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">
              {step === 'cart' ? 'Tu Canasta' : step === 'checkout' ? 'Finalizar Pedido' : '¡Pedido Generado!'}
            </h2>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50">
            
            {/* Step 1: Cart View */}
            {step === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <i className="fas fa-shopping-basket text-6xl mb-4 text-gray-300"></i>
                    <p>Tu canasta está vacía.</p>
                    <button onClick={onClose} className="mt-4 text-brand-red font-bold hover:underline">
                      Ir a productos
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cart.map((item) => (
                      <li key={item.id} className="flex py-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.unit}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border rounded-md">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="px-2 py-1 hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                              >-</button>
                              <span className="px-2 font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="px-2 py-1 hover:bg-gray-100"
                              >+</button>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => onRemove(item.id)}
                              className="font-medium text-brand-red hover:text-red-800"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* Step 2: Checkout Form */}
            {step === 'checkout' && (
              <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Datos de Entrega</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                      <input 
                        required 
                        type="text" 
                        name="customerName"
                        value={orderDetails.customerName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Teléfono / WhatsApp</label>
                      <input 
                        required 
                        type="tel" 
                        name="phone"
                        value={orderDetails.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
                        placeholder="300 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Barrio (Medellín)</label>
                      <input 
                        required 
                        type="text" 
                        name="neighborhood"
                        value={orderDetails.neighborhood}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
                        placeholder="Ej. Belén, Poblado, Laureles"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Dirección Exacta</label>
                      <input 
                        required 
                        type="text" 
                        name="address"
                        value={orderDetails.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
                        placeholder="Calle 10 # 20-30 Apto 101"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Notas Adicionales (Opcional)</label>
                      <textarea 
                        name="notes"
                        value={orderDetails.notes}
                        onChange={handleInputChange}
                        rows={2}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
                        placeholder="Ej. Dejar en portería, sin timbre..."
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Método de Pago</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 p-2 border rounded cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="efectivo" 
                        checked={orderDetails.paymentMethod === 'efectivo'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-brand-red focus:ring-brand-red" 
                      />
                      <span className="flex-1 flex items-center">
                        <i className="fas fa-money-bill-wave text-green-600 mr-2"></i> Efectivo contra entrega
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 p-2 border rounded cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="nequi" 
                        checked={orderDetails.paymentMethod === 'nequi'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-brand-red focus:ring-brand-red" 
                      />
                      <span className="flex-1 flex items-center">
                        <span className="font-bold text-purple-800 mr-2">Nequi</span> / Daviplata
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 p-2 border rounded cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="transferencia" 
                        checked={orderDetails.paymentMethod === 'transferencia'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-brand-red focus:ring-brand-red" 
                      />
                      <span className="flex-1 flex items-center">
                        <i className="fas fa-university text-blue-600 mr-2"></i> Transferencia Bancaria
                      </span>
                    </label>
                  </div>
                </div>
              </form>
            )}

            {/* Step 3: Success */}
            {step === 'success' && (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <i className="fab fa-whatsapp text-5xl text-green-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Casi listo!</h3>
                <p className="text-gray-600 mb-6">
                  Hemos generado tu orden <strong>#{orderId}</strong>. <br/>
                  Se ha abierto WhatsApp automáticamente. Por favor <strong>envía el mensaje</strong> para que nuestro asesor confirme tu despacho.
                </p>
                <div className="bg-white p-4 rounded border w-full text-left mb-6 text-sm shadow-inner">
                  <p className="text-center text-gray-500 italic mb-2">Resumen enviado a WhatsApp:</p>
                  <p><strong>Cliente:</strong> {orderDetails.customerName}</p>
                  <p><strong>Total:</strong> ${total.toLocaleString('es-CO')}</p>
                  <p><strong>Pago:</strong> {orderDetails.paymentMethod.toUpperCase()}</p>
                </div>
                <button 
                  onClick={() => { setStep('cart'); onClose(); }}
                  className="bg-brand-red text-white font-bold py-3 px-8 rounded-lg w-full"
                >
                  Entendido, volver al inicio
                </button>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {step !== 'success' && cart.length > 0 && (
            <div className="border-t border-gray-200 bg-white p-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${total.toLocaleString('es-CO')}</p>
              </div>
              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-brand-green px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                >
                  Continuar al Pago
                </button>
              ) : (
                <div className="flex space-x-3">
                   <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                  >
                    <i className="fab fa-whatsapp mr-2"></i> Confirmar Pedido
                  </button>
                </div>
              )}
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  o{' '}
                  <button onClick={onClose} className="font-medium text-brand-red hover:text-red-500">
                    Continuar Comprando <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;