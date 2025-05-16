import { useState } from 'react';
import { useCart, CartItem } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Toast from './Toast';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [toast, setToast] = useState<{ message: string; visible: boolean; type: 'success' | 'error' | 'info' }>({ 
    message: '', 
    visible: false,
    type: 'success'
  });

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-dark pt-20 px-4">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8 mt-10">
          <h1 className="text-3xl font-bold text-light mb-6">Your Cart</h1>
          <div className="text-center py-10">
            <svg 
              className="w-20 h-20 mx-auto text-gray-500 mb-4" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <p className="text-light text-xl mb-6">Your cart is empty</p>
            <Link 
              to="/products" 
              className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg inline-block transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-20 px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-light mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - 2/3 width on large screens */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <div className="mb-4 pb-2 border-b border-gray-700">
              <div className="grid grid-cols-12 text-sm font-medium text-gray-400">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {cartItems.map((item: CartItem) => (
                <div key={item.productId} className="grid grid-cols-12 items-center py-4 border-b border-gray-700">
                  {/* Product info */}
                  <div className="col-span-6 flex items-center">
                    <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden mr-4 flex-shrink-0">
                      <img 
                        src={`/${item.imgName}`} 
                        alt={item.name} 
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="text-light font-medium">{item.name}</h3>
                      <button 
                        onClick={() => {
                          removeFromCart(item.productId);
                          setToast({
                            message: `Removed ${item.name} from cart`,
                            visible: true,
                            type: 'info'
                          });
                        }}
                        className="text-gray-400 hover:text-red-500 text-sm mt-1 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-2 text-center text-light">
                    ${item.price.toFixed(2)}
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-light hover:text-primary transition-colors"
                      >
                        <span>-</span>
                      </button>
                      <span className="text-light min-w-[1.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => {
                          updateQuantity(item.productId, item.quantity + 1);
                          setToast({
                            message: `Added another ${item.name} to cart`,
                            visible: true,
                            type: 'success'
                          });
                        }}
                        className="w-7 h-7 flex items-center justify-center text-light hover:text-primary transition-colors"
                      >
                        <span>+</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="col-span-2 text-right text-primary font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary - 1/3 width on large screens */}
          <div className="bg-gray-800 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-light mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-light">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-light">Free</span>
              </div>
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-light">Total</span>
                  <span className="font-bold text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-primary hover:bg-accent text-white py-3 px-4 rounded-lg font-medium transition-colors mb-4">
              Checkout
            </button>
            
            <div className="flex space-x-4">
              <Link to="/products" className="block text-center text-light hover:text-primary flex-1">
                Continue Shopping
              </Link>
              <button 
                onClick={() => {
                  clearCart();
                  setToast({
                    message: 'Cart has been cleared',
                    visible: true,
                    type: 'info'
                  });
                }}
                className="text-red-400 hover:text-red-500 text-center"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {toast.visible && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ ...toast, visible: false })} 
        />
      )}
    </div>
  );
}
