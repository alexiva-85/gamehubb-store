import Image from 'next/image';

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

interface CatalogProductsProps {
  products: Product[];
}

export default function CatalogProducts({ products }: CatalogProductsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col"
        >
          {product.imageUrl && (
            <div className="w-full h-48 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden relative">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="flex-grow space-y-2">
            <h3 className="font-semibold text-lg">{product.title}</h3>
            {product.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              {product.category && (
                <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {product.category}
                </span>
              )}
              <span className="text-xs text-gray-500">{product.sku}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-blue-600">
                {formatPrice(product.priceRub)}
              </span>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                disabled
                aria-label={`Купить ${product.title}`}
              >
                Купить
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

