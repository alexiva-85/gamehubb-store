'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Card from '@/app/components/Card';
import { PriceMode } from '@prisma/client';
import { updateProductPrice } from './actions';

interface Product {
  sku: string;
  title: string;
  category: string | null;
  isActive: boolean;
  basePriceIdr: number | null;
  priceMode: PriceMode;
  priceRub: number;
  updatedAt: string; // ISO string from server
}

interface PricesTableProps {
  initialData: {
    products: Product[];
    total: number;
    page: number;
    pageSize: number;
    categories: string[];
  };
  searchParams: Record<string, string | undefined>;
}

export default function PricesTable({ initialData, searchParams }: PricesTableProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [editingSku, setEditingSku] = useState<string | null>(null);
  const [editPriceMode, setEditPriceMode] = useState<PriceMode>(PriceMode.AUTO);
  const [editPriceRub, setEditPriceRub] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  // Deterministic number formatter (fixes hydration mismatch)
  const formatInt = (v: number) => {
    const n = Math.round(v);
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.q || '');
  const [filterCategory, setFilterCategory] = useState(searchParams.category || '');
  const [filterIsActive, setFilterIsActive] = useState(searchParams.isActive || 'all');
  const [filterPriceMode, setFilterPriceMode] = useState(searchParams.priceMode || 'all');
  const [filterPageSize, setFilterPageSize] = useState(searchParams.pageSize || '50');

  const applyFilters = () => {
    const params = new URLSearchParams();
    // Preserve admin key
    const adminKey = searchParams.key;
    if (adminKey) params.set('key', adminKey);
    
    if (searchQuery) params.set('q', searchQuery);
    if (filterCategory) params.set('category', filterCategory);
    if (filterIsActive !== 'all') params.set('isActive', filterIsActive);
    if (filterPriceMode !== 'all') params.set('priceMode', filterPriceMode);
    if (filterPageSize !== '50') params.set('pageSize', filterPageSize);
    router.push(`/admin/prices?${params.toString()}`);
  };

  const startEdit = (product: Product) => {
    setEditingSku(product.sku);
    setEditPriceMode(product.priceMode);
    setEditPriceRub(product.priceMode === PriceMode.MANUAL ? product.priceRub.toString() : '');
    setError(null);
    setSuccess(null);
  };

  const cancelEdit = () => {
    setEditingSku(null);
    setEditPriceMode(PriceMode.AUTO);
    setEditPriceRub('');
    setError(null);
    setSuccess(null);
  };

  const saveEdit = async (sku: string) => {
    setError(null);
    setSuccess(null);

    const priceRub = editPriceMode === PriceMode.MANUAL ? parseInt(editPriceRub, 10) : undefined;

    if (editPriceMode === PriceMode.MANUAL && (!priceRub || priceRub <= 0)) {
      setError('Для MANUAL режима необходимо указать цену > 0');
      return;
    }

    startTransition(async () => {
      const result = await updateProductPrice(sku, editPriceMode, priceRub);
      if (result.success) {
        setSuccess('Цена обновлена');
        setEditingSku(null);
        router.refresh();
      } else {
        setError(result.error || 'Ошибка обновления');
      }
    });
  };


  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-900/20 border border-green-500/50 rounded-lg">
          <p className="text-green-400 text-sm">{success}</p>
        </div>
      )}

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Поиск (SKU/название)</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
              placeholder="Поиск..."
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Категория</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
            >
              <option value="">Все</option>
              {initialData.categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Активность</label>
            <select
              value={filterIsActive}
              onChange={(e) => setFilterIsActive(e.target.value)}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
            >
              <option value="all">Все</option>
              <option value="true">Активные</option>
              <option value="false">Неактивные</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Режим цены</label>
            <select
              value={filterPriceMode}
              onChange={(e) => setFilterPriceMode(e.target.value)}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
            >
              <option value="all">Все</option>
              <option value="AUTO">AUTO</option>
              <option value="MANUAL">MANUAL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">На странице</label>
            <select
              value={filterPageSize}
              onChange={(e) => setFilterPageSize(e.target.value)}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm"
            >
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={applyFilters}
            disabled={isPending}
            className="px-4 py-2 bg-[#4DA3FF] text-white rounded hover:bg-[#3d8fdf] text-sm disabled:opacity-50"
          >
            Применить фильтры
          </button>
          <button
            onClick={async () => {
              setSyncing(true);
              setError(null);
              setSuccess(null);
              
              try {
                const adminKey = searchParams.key || '';
                const url = `/api/admin/digiflazz/sync/mobile-legends${adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''}`;
                
                const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-admin-key': adminKey,
                  },
                });

                if (!response.ok) {
                  let errorMessage = 'Ошибка синхронизации';
                  try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.details || errorMessage;
                  } catch {
                    // If response is not JSON, use status text
                    errorMessage = `Ошибка ${response.status}: ${response.statusText}`;
                  }
                  throw new Error(errorMessage);
                }

                const result = await response.json();
                setSuccess(`Синхронизация завершена: импортировано ${result.imported}, обновлено ${result.updated}, пропущено ${result.skipped}`);
                
                // Refresh the page to show new products
                setTimeout(() => {
                  router.refresh();
                }, 1000);
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка синхронизации');
              } finally {
                setSyncing(false);
              }
            }}
            disabled={syncing || isPending}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {syncing ? 'Синхронизация...' : 'Sync Mobile Legends from Digiflazz'}
          </button>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#3a3a3a]">
                <th className="text-left py-2 px-2 text-zinc-400">SKU</th>
                <th className="text-left py-2 px-2 text-zinc-400">Название</th>
                <th className="text-left py-2 px-2 text-zinc-400">Категория</th>
                <th className="text-left py-2 px-2 text-zinc-400">Активен</th>
                <th className="text-right py-2 px-2 text-zinc-400">Base IDR</th>
                <th className="text-left py-2 px-2 text-zinc-400">Режим</th>
                <th className="text-right py-2 px-2 text-zinc-400">Цена (₽)</th>
                <th className="text-left py-2 px-2 text-zinc-400">Обновлено</th>
                <th className="text-left py-2 px-2 text-zinc-400">Действия</th>
              </tr>
            </thead>
            <tbody>
              {initialData.products.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-zinc-400">
                    Товары не найдены
                  </td>
                </tr>
              ) : (
                initialData.products.map((product) => (
                  <tr key={product.sku} className="border-b border-[#3a3a3a]/50 hover:bg-[#1a1a1a]/50">
                    <td className="py-2 px-2 text-zinc-200 font-mono text-xs">{product.sku}</td>
                    <td className="py-2 px-2 text-zinc-200">{product.title}</td>
                    <td className="py-2 px-2 text-zinc-400">{product.category || '-'}</td>
                    <td className="py-2 px-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          product.isActive
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-red-900/30 text-red-400'
                        }`}
                      >
                        {product.isActive ? 'Да' : 'Нет'}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right text-zinc-400">
                      {product.basePriceIdr != null ? formatInt(product.basePriceIdr) : '-'}
                    </td>
                    <td className="py-2 px-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          product.priceMode === PriceMode.AUTO
                            ? 'bg-blue-900/30 text-blue-400'
                            : 'bg-yellow-900/30 text-yellow-400'
                        }`}
                      >
                        {product.priceMode}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right text-zinc-200 font-medium">
                      {editingSku === product.sku ? (
                        <input
                          type="number"
                          value={editPriceRub}
                          onChange={(e) => setEditPriceRub(e.target.value)}
                          disabled={editPriceMode === PriceMode.AUTO}
                          className="w-24 px-2 py-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-sm text-right"
                          placeholder={product.priceRub.toString()}
                          min="1"
                        />
                      ) : (
                        formatInt(product.priceRub)
                      )}
                    </td>
                    <td className="py-2 px-2 text-zinc-400 text-xs">
                      {new Date(product.updatedAt).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="py-2 px-2">
                      {editingSku === product.sku ? (
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs text-zinc-400 mb-1">Режим</label>
                            <select
                              value={editPriceMode}
                              onChange={(e) => {
                                setEditPriceMode(e.target.value as PriceMode);
                                if (e.target.value === PriceMode.AUTO) {
                                  setEditPriceRub('');
                                }
                              }}
                              className="w-full px-2 py-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-white text-xs"
                            >
                              <option value={PriceMode.AUTO}>AUTO</option>
                              <option value={PriceMode.MANUAL}>MANUAL</option>
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveEdit(product.sku)}
                              disabled={isPending || (editPriceMode === PriceMode.MANUAL && !editPriceRub)}
                              className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs disabled:opacity-50"
                            >
                              Сохранить
                            </button>
                            <button
                              onClick={cancelEdit}
                              disabled={isPending}
                              className="px-2 py-1 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded hover:bg-[#333] text-xs disabled:opacity-50"
                            >
                              Отмена
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(product)}
                          disabled={isPending}
                          className="px-2 py-1 bg-[#4DA3FF] text-white rounded hover:bg-[#3d8fdf] text-xs disabled:opacity-50"
                        >
                          Изменить
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {initialData.total > initialData.pageSize && (
          <div className="mt-4 flex justify-between items-center text-sm text-zinc-400">
            <div>
              Показано {initialData.page * initialData.pageSize - initialData.pageSize + 1}-
              {Math.min(initialData.page * initialData.pageSize, initialData.total)} из {initialData.total}
            </div>
            <div className="flex gap-2">
              {initialData.page > 1 && (
                <button
                  onClick={() => {
                    const params = new URLSearchParams(currentSearchParams.toString());
                    params.set('page', (initialData.page - 1).toString());
                    router.push(`/admin/prices?${params.toString()}`);
                  }}
                  className="px-3 py-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded hover:bg-[#333]"
                >
                  Назад
                </button>
              )}
              {initialData.page * initialData.pageSize < initialData.total && (
                <button
                  onClick={() => {
                    const params = new URLSearchParams(currentSearchParams.toString());
                    params.set('page', (initialData.page + 1).toString());
                    router.push(`/admin/prices?${params.toString()}`);
                  }}
                  className="px-3 py-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded hover:bg-[#333]"
                >
                  Вперед
                </button>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
