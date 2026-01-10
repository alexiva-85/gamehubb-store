import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGameBySlug } from '@/lib/games';
import { getProductsByGame } from '@/lib/products';
import GameCatalogClient from './GameCatalogClient';

interface PageProps {
  params: Promise<{ gameSlug: string }>;
}

export default async function GameCatalogPage({ params }: PageProps) {
  const { gameSlug } = await params;
  const game = getGameBySlug(gameSlug);

  if (!game) {
    notFound();
  }

  const products = await getProductsByGame(gameSlug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/catalog"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4 inline-block"
        >
          ← Назад к играм
        </Link>
        <h1 className="text-3xl font-bold mt-2">{game.name}</h1>
      </div>
      <GameCatalogClient initialProducts={products} />
    </div>
  );
}

