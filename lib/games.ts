export interface Game {
  slug: string;
  name: string;
  imageUrl?: string;
}

export const GAMES: Game[] = [
  {
    slug: 'mobile-legends',
    name: 'Mobile Legends: Bang Bang',
  },
  {
    slug: 'free-fire',
    name: 'Free Fire',
  },
  {
    slug: 'roblox',
    name: 'Roblox',
  },
  {
    slug: 'genshin-impact',
    name: 'Genshin Impact',
  },
  {
    slug: 'honkai-star-rail',
    name: 'Honkai: Star Rail',
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return GAMES.find((game) => game.slug === slug);
}

