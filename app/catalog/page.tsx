import Link from "next/link";
import { GAMES } from "@/lib/games";

export const metadata = {
  title: "Каталог игр — GameHubb",
  description: "Выберите игру и перейдите к товарам для пополнения.",
};

export default function CatalogPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Выберите игру</h1>
        <p className="text-sm text-muted-foreground">
          Далее вы увидите товары и варианты пополнения для выбранной игры.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((g) => (
          <Link
            key={g.slug}
            href={`/catalog/${g.slug}`}
            className="rounded-xl border p-4 hover:bg-muted/50 transition"
          >
            <div className="text-lg font-medium">{g.name}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
