import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { api } from '../../../api/config';

interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  imgName: string;
  sku: string;
  unit: string;
  supplierId: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(`${api.baseURL}${api.endpoints.products}`);
  return data;
};

export default function Products() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const { data: products, isLoading, error } = useQuery('products', fetchProducts);

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const handleAddToCart = (productId: number) => {
    const quantity = quantities[productId] || 0;
    if (quantity > 0) {
      // TODO: Implement cart functionality
      alert(`Added ${quantity} items to cart`);
      setQuantities(prev => ({
        ...prev,
        [productId]: 0
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-red-500 text-center">Failed to fetch products</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-light">Products</h1>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-light rounded-lg border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              aria-label="Search products"
            />
            <svg 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts?.map((product, index) => (
              <div key={product.productId} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(118,184,82,0.3)] flex flex-col">
                <div className="relative h-56 bg-gradient-to-t from-gray-700 to-gray-800">
                  <img 
                    src={`/${product.imgName}`} 
                    alt={product.name}
                    className="w-full h-full object-contain p-2"
                  />
                  {index < 3 && (
                    <div className="absolute top-8 left-0 bg-primary text-white px-3 py-1 -rotate-90 transform -translate-x-5 shadow-md">
                      25% OFF
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-light mb-2">{product.name}</h3>
                  <p className="text-gray-400 mb-4 flex-grow">{product.description}</p>
                  <div className="space-y-4 mt-auto">
                    <div className="flex justify-between items-center">
                      <span className="text-primary text-xl font-bold">${product.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 bg-gray-700 rounded-lg p-1">
                        <button 
                          onClick={() => handleQuantityChange(product.productId, -1)}
                          className="w-8 h-8 flex items-center justify-center text-light hover:text-primary transition-colors"
                          aria-label={`Decrease quantity of ${product.name}`}
                          id={`decrease-qty-${product.productId}`}
                        >
                          <span aria-hidden="true">-</span>
                        </button>
                        <span 
                          className="text-light min-w-[2rem] text-center"
                          aria-label={`Quantity of ${product.name}`}
                          id={`qty-${product.productId}`}
                        >
                          {quantities[product.productId] || 0}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(product.productId, 1)}
                          className="w-8 h-8 flex items-center justify-center text-light hover:text-primary transition-colors"
                          aria-label={`Increase quantity of ${product.name}`}
                          id={`increase-qty-${product.productId}`}
                        >
                          <span aria-hidden="true">+</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product.productId)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          quantities[product.productId] ? 'bg-primary hover:bg-accent text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!quantities[product.productId]}
                        aria-label={`Add ${quantities[product.productId] || 0} ${product.name} to cart`}
                        id={`add-to-cart-${product.productId}`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}