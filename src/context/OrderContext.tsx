import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, CustomerAddress, PaymentMethod } from '../types';
import { useCart } from './CartContext';
import { generateOrderId } from '../utils/formatters';

interface OrderContextType {
  orders: Order[];
  placeOrder: (
    address: CustomerAddress,
    paymentMethod: PaymentMethod
  ) => Promise<Order>;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  recentOrder: Order | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);
const ORDERS_STORAGE_KEY = 'pit_orders_history_v1';

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-demo-01',
    orderNumber: 'PIT-8841-X9K2',
    date: '2026-10-10T14:30:00.000Z',
    items: [
      {
        productId: 'prod-on-gold-whey',
        productName: 'ON Gold Standard 100% Whey Protein',
        brand: 'Optimum Nutrition',
        variantName: '2 kg / 4.4 lbs - Double Rich Chocolate',
        unitPrice: 6899,
        quantity: 1,
        image: '/src/assets/product_whey.jpg',
      },
      {
        productId: 'prod-pit-shaker-stealth',
        productName: 'PROTEIN IN TOWN Matte Stealth Shaker Bottle (750ml)',
        brand: 'PROTEIN IN TOWN',
        variantName: 'Matte Charcoal with Crimson Red Cap',
        unitPrice: 399,
        quantity: 1,
        image: '/src/assets/hero_supplements.jpg',
      },
    ],
    subtotal: 7298,
    discount: 730,
    discountCode: 'PROTEIN10',
    shippingFee: 0,
    total: 6568,
    paymentMethod: 'UPI',
    paymentStatus: 'Simulated Success',
    orderStatus: 'Shipped',
    shippingAddress: {
      fullName: 'Gokul Krishnan',
      phone: '+91 94471 23456',
      email: 'gokul.k@example.com',
      addressLine: 'Flat 4B, SkyLine Ivy League, Kakkanad',
      city: 'Kochi',
      state: 'Kerala',
      pinCode: '682030',
      instructions: 'Please call before delivery or leave at tower security desk.',
    },
    whatsappConfirmationSent: true,
  },
];

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { items, subtotal, discount, discountCode, shippingFee, total, clearCart } = useCart();
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  const [recentOrder, setRecentOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const placeOrder = async (
    address: CustomerAddress,
    paymentMethod: PaymentMethod
  ): Promise<Order> => {
    const orderItems = items.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      brand: item.product.brand,
      variantName: item.selectedVariant.name,
      unitPrice: item.selectedVariant.price,
      quantity: item.quantity,
      image: item.product.images[0] || '/src/assets/product_whey.jpg',
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderId(),
      date: new Date().toISOString(),
      items: orderItems,
      subtotal,
      discount,
      discountCode: discountCode || undefined,
      shippingFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Cash on Delivery' : 'Simulated Success',
      orderStatus: 'Confirmed',
      shippingAddress: address,
      whatsappConfirmationSent: true,
    };

    setOrders(prev => [newOrder, ...prev]);
    setRecentOrder(newOrder);
    clearCart();

    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(o => o.id === orderId || o.orderNumber === orderId);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        getOrderById,
        updateOrderStatus,
        recentOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
