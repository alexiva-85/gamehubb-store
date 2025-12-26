import { redirect } from 'next/navigation';

/**
 * Корневая страница приложения
 * Редиректит на каталог товаров
 * Дополнительно настроены редиректы в next.config.ts и vercel.json для максимальной надежности
 */
export default function Page() {
  redirect('/catalog');
}
