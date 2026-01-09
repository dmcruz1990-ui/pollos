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
  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerName: '',
    phone: '',
    address: '',
    neighborhood: '',
    paymentMethod: 'efectivo',
    notes: ''
  });

  const NEQUI_NUMBER = "300 766 47 29"; // Número de Nequi de la empresa

  // Calculate current total from cart
  const currentTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    if (isOpen) setStep('cart');
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = (id: string, totalVal: number) => {
    const itemsList = cart.map(item => 
      `▪️ ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-CO')})`
    ).join('\n');

    const totalFormatted = totalVal.toLocaleString('es-CO');
    const date = new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });

    const paymentNote = orderDetails.paymentMethod === 'nequi' 
      ? `\n⚠️ *NOTA:* Adjuntaré el comprobante de pago de Nequi a este chat.` 
      : '';

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
           paymentNote +
           `\n*🛒 DETALLE DEL PEDIDO:*\n${itemsList}\n\n` +
           `*💰 TOTAL A PAGAR: $${totalFormatted}*`;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Guardamos el total actual antes de que el carrito se limpie
    const totalToPay = currentTotal;
    setFinalTotal(totalToPay);

    const newOrderId = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    setOrderId(newOrderId);

    const message = generateWhatsAppMessage(newOrderId, totalToPay);
    const phoneNumber = "573007664729"; 
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    setStep('success');
    
    // Limpiamos el carrito después de guardar el total final
    setTimeout(() => {
      onClear();
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in-right">
          
          <div className="bg-brand-red px-4 py-6 sm:px-6 flex items-center justify-between text-white">
            <h2 className="text-lg font-medium">
              {step === 'cart' ? 'Tu Canasta' : step === 'checkout' ? 'Finalizar Pedido' : '¡Pedido Generado!'}
            </h2>
            <button onClick={onClose} className="hover:text-gray-200">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50">
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
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border rounded-md">
                              <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-gray-100" disabled={item.quantity <= 1}>-</button>
                              <span className="px-2 font-bold">{item.quantity}</span>
                              <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-gray-100">+</button>
                            </div>
                            <button onClick={() => onRemove(item.id)} className="font-medium text-brand-red">Eliminar</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {step === 'checkout' && (
              <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Datos de Entrega</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <input required type="text" name="customerName" value={orderDetails.customerName} onChange={handleInputChange} className="w-full rounded-md border-gray-300 p-2 border sm:text-sm" placeholder="Nombre Completo" />
                    <input required type="tel" name="phone" value={orderDetails.phone} onChange={handleInputChange} className="w-full rounded-md border-gray-300 p-2 border sm:text-sm" placeholder="Teléfono / WhatsApp" />
                    <input required type="text" name="neighborhood" value={orderDetails.neighborhood} onChange={handleInputChange} className="w-full rounded-md border-gray-300 p-2 border sm:text-sm" placeholder="Barrio (Medellín)" />
                    <input required type="text" name="address" value={orderDetails.address} onChange={handleInputChange} className="w-full rounded-md border-gray-300 p-2 border sm:text-sm" placeholder="Dirección Exacta" />
                    <textarea name="notes" value={orderDetails.notes} onChange={handleInputChange} rows={2} className="w-full rounded-md border-gray-300 p-2 border sm:text-sm" placeholder="Notas Adicionales (Opcional)" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Método de Pago</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="paymentMethod" value="efectivo" checked={orderDetails.paymentMethod === 'efectivo'} onChange={handleInputChange} className="h-4 w-4 text-brand-red" />
                      <span className="flex-1 text-sm font-medium">Efectivo contra entrega</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border rounded border-brand-red/20 cursor-pointer hover:bg-brand-red/5">
                      <input type="radio" name="paymentMethod" value="nequi" checked={orderDetails.paymentMethod === 'nequi'} onChange={handleInputChange} className="h-4 w-4 text-brand-red" />
                      <span className="flex-1 flex flex-col">
                        <span className="font-bold text-purple-800">Nequi / Daviplata</span>
                        <span className="text-xs text-gray-500">Paga ahora y envía el comprobante</span>
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="paymentMethod" value="transferencia" checked={orderDetails.paymentMethod === 'transferencia'} onChange={handleInputChange} className="h-4 w-4 text-brand-red" />
                      <span className="flex-1 text-sm font-medium">Transferencia Bancaria</span>
                    </label>
                  </div>
                </div>
              </form>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <i className="fab fa-whatsapp text-4xl text-green-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">¡Casi listo!</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Hemos generado tu orden <strong>#{orderId}</strong>. <br/>
                  Se ha abierto WhatsApp automáticamente.
                </p>

                {orderDetails.paymentMethod === 'nequi' && (
                  <div className="bg-purple-50 border border-purple-200 p-5 rounded-xl mb-6 w-full text-left">
                    <h4 className="text-purple-900 font-bold flex items-center mb-3">
                      <i className="fas fa-info-circle mr-2"></i> Instrucciones de Pago:
                    </h4>
                    <p className="text-sm text-purple-800 mb-4">
                      Realiza el pago de <strong className="text-lg text-purple-900">${finalTotal.toLocaleString('es-CO')}</strong> al número Nequi:
                      <span className="text-2xl font-black block mt-1 tracking-wider text-center py-2 bg-white rounded-lg border border-purple-100 shadow-sm">{NEQUI_NUMBER}</span>
                    </p>
                    <div className="space-y-1 text-xs text-purple-700">
                      <p>• Toma un pantallazo del comprobante.</p>
                      <p>• <strong>Envíalo al chat de WhatsApp</strong> que abrimos.</p>
                    </div>
                  </div>
                )}

                <div className="bg-white p-4 rounded border w-full text-left mb-6 text-sm shadow-inner space-y-1">
                  <p className="text-center text-gray-400 italic mb-2">Resumen del pedido:</p>
                  <p><strong>Cliente:</strong> <span className="text-gray-700 capitalize">{orderDetails.customerName}</span></p>
                  <p><strong>Total:</strong> <span className="text-brand-red font-bold">${finalTotal.toLocaleString('es-CO')}</span></p>
                  <p><strong>Pago:</strong> <span className="uppercase text-gray-700">{orderDetails.paymentMethod}</span></p>
                </div>
                
                <button 
                  onClick={() => { setStep('cart'); onClose(); }}
                  className="bg-brand-red text-white font-bold py-3 px-8 rounded-xl w-full shadow-lg"
                >
                  Entendido, volver al inicio
                </button>
              </div>
            )}
          </div>

          {step !== 'success' && (currentTotal > 0 || step === 'checkout') && (
            <div className="border-t border-gray-200 bg-white p-4 sm:px-6">
              <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
                <p>Total</p>
                <p>${currentTotal.toLocaleString('es-CO')}</p>
              </div>
              {step === 'cart' ? (
                <button onClick={() => setStep('checkout')} className="w-full rounded-xl bg-brand-green px-6 py-4 text-base font-bold text-white shadow-lg hover:bg-green-700 transition-colors">
                  Continuar al Pago
                </button>
              ) : (
                <div className="flex space-x-3">
                   <button type="button" onClick={() => setStep('cart')} className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-4 text-base font-medium text-gray-700">
                    Volver
                  </button>
                  <button type="submit" form="checkout-form" className="flex-1 rounded-xl bg-green-600 px-4 py-4 text-base font-bold text-white shadow-lg flex items-center justify-center">
                    <i className="fab fa-whatsapp mr-2 text-xl"></i> Confirmar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;