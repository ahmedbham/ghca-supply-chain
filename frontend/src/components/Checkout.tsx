import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart, CartItem } from '../context/CartContext';
import Toast from './Toast';

export default function Checkout() {
  const { isLoggedIn } = useAuth();
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean; type: 'success' | 'error' | 'info' }>({ 
    message: '', 
    visible: false,
    type: 'success'
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login?error=Please log in to proceed with checkout');
    }
  }, [isLoggedIn, navigate]);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate]);

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    
    try {
      // Create order object
      const orderData = {
        orderId: Date.now(), // Simple ID generation for demo
        branchId: 1, // Default branch for demo
        orderDate: new Date().toISOString(),
        name: `Order ${Date.now()}`,
        description: `Order containing ${cartItems.length} item(s)`,
        status: 'pending'
      };

      // Submit order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        // Clear cart on successful order
        clearCart();
        
        setToast({
          message: 'Order placed successfully!',
          visible: true,
          type: 'success'
        });
        
        // Redirect to products page after short delay
        setTimeout(() => {
          navigate('/products');
        }, 2000);
      } else {
        throw new Error('Failed to place order');
      }
    } catch {
      setToast({
        message: 'Failed to place order. Please try again.',
        visible: true,
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render anything if user is not logged in or cart is empty
  if (!isLoggedIn || cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark pt-20 px-4 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-light mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-light mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item: CartItem) => (
                <div key={item.productId} className="flex items-center justify-between py-3 border-b border-gray-700">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-700 rounded overflow-hidden mr-3 flex-shrink-0">
                      <img 
                        src={`/${item.imgName}`} 
                        alt={item.name} 
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="text-light font-medium text-sm">{item.name}</h3>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-primary font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-4 border-t border-gray-700">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-light">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-light">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-700">
                <span className="font-bold text-light">Total</span>
                <span className="font-bold text-primary text-lg">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-light mb-6">Payment & Delivery</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-light mb-2 text-sm font-medium">Delivery Address</label>
                <textarea 
                  className="w-full bg-gray-700 text-light rounded px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Enter your delivery address..."
                  defaultValue="123 Main Street&#10;Anytown, ST 12345"
                />
              </div>
              
              <div>
                <label className="block text-light mb-2 text-sm font-medium">Payment Method</label>
                <select className="w-full bg-gray-700 text-light rounded px-3 py-2 text-sm">
                  <option>Company Account</option>
                  <option>Purchase Order</option>
                </select>
              </div>
              
              <div>
                <label className="block text-light mb-2 text-sm font-medium">Special Instructions</label>
                <textarea 
                  className="w-full bg-gray-700 text-light rounded px-3 py-2 text-sm"
                  rows={2}
                  placeholder="Any special delivery instructions..."
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-accent text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Placing Order...' : `Place Order - $${totalPrice.toFixed(2)}`}
              </button>
              
              <button
                onClick={() => navigate('/cart')}
                className="w-full border border-gray-600 text-light hover:bg-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Back to Cart
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