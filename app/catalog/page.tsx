import CatalogClient from './CatalogClient';

export default function CatalogPage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Каталог товаров</h1>
      <CatalogClient />
    </div>
  );
}

