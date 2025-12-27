import CatalogClient from './CatalogClient';

export default function CatalogPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Catalog (M0)</h1>
      <CatalogClient />
    </div>
  );
}

