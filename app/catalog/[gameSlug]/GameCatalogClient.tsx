'use client';

import { useState, useMemo } from 'react';
import { useCart } from '@/app/providers/CartProvider';
import type { ProductWithGame } from '@/lib/products';

interface GameCatalogClientProps {
  initialProducts: ProductWithGame[];
  gameName: string;
}

const CATEGORIES = ['Все', 'Top-up', 'Currency', 'Pass'] as const;
type Category = (typeof CATEGORIES)[number];

export default function GameCatalogClient({
  initialProducts,
  gameName,
}: GameCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Все');
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    let filtered = initialProducts;

    // Filter by category
    if (selectedCategory !== 'Все') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-[#3a3a3a] rounded-lg bg-[#2a2a2a] text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#4DA3FF] focus:border-[#4DA3FF]"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#4DA3FF] text-white hover:bg-[#3d8fdf]'
                  : 'bg-[#2a2a2a] text-[#d0d0d0] border border-[#3a3a3a] hover:bg-[#333] hover:border-[#4DA3FF]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-[#3a3a3a] rounded-lg p-4 bg-[#2a2a2a] hover:border-[#4DA3FF] hover:bg-[#2f2f2f] transition-all"
            >
              {product.imageUrl && (
                <div className="w-full h-32 mb-3 bg-[#1a1a1a] rounded overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="font-semibold text-lg mb-1 text-white">{product.title}</h3>
              {product.description && (
                <p className="text-sm text-[#a0a0a0] mb-3 line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  {product.priceRub}₽
                </span>
                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      title: product.title,
                      priceRub: product.priceRub,
                      gameSlug: product.gameSlug || '',
                    })
                  }
                  className="px-4 py-2 bg-[#4DA3FF] text-white rounded-lg hover:bg-[#3d8fdf] transition-colors text-sm font-medium"
                >
                  В корзину
                </button>
              </div>
              {product.category && (
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-[#1a1a1a] border border-[#3a3a3a] rounded text-[#4DA3FF]">
                  {product.category}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-[#a0a0a0]">
          <p>Товары не найдены</p>
        </div>
      )}
    </div>
  );
}

