import { permanentRedirect } from 'next/navigation';

/**
 * Корневая страница приложения
 * Редиректит на каталог товаров
 */
export default function Home() {
  permanentRedirect('/catalog');
}
