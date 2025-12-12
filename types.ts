export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // Price per unit/lb
  unit: string; // e.g., "Libra", "Unidad", "Kg"
  image: string;
  category: string;
  isCriollo: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  address: string;
  neighborhood: string; // Barrio in Medellin
  paymentMethod: 'efectivo' | 'transferencia' | 'nequi';
  notes: string;
}