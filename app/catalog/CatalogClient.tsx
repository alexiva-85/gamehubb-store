'use client';

import { useEffect, useState } from 'react';
import ErrorPanel from './ErrorPanel';

interface Product {
  id: string;
  sku: string;
  title: string;
  description: string | null;
  priceRub: number;
  category: string | null;
  provider: string;
  isActive: boolean;
  imageUrl: string | null;
}

interface ProductsResponse {
  source: 'db' | 'fallback';
  products: Product[];
  count: number;
  error?: string;
}

export default function CatalogClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'db' | 'fallback' | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data: ProductsResponse) => {
        setProducts(data.products);
        setSource(data.source);
        if (data.error) {
          setError(data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-600">Загрузка товаров...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ErrorPanel error={error} />
      
      {source && (
        <div className="text-sm text-gray-500 mb-4">
          Источник данных: {source === 'db' ? 'База данных' : 'Резервный список'} 
          ({products.length} товаров)
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Товары не найдены</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {product.imageUrl && (
                <div className="w-full h-48 bg-gray-100 rounded mb-3 flex items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                {product.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                )}
                {product.category && (
                  <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {product.category}
                  </span>
                )}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(product.priceRub)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {product.sku}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
