import Card from '@/app/components/Card';
import Link from 'next/link';

export const metadata = {
  title: 'Реферальная программа - GameHubb Store',
  description: 'Условия и правила реферальной программы GameHubb',
};

export default function ReferralPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Реферальная программа</h1>
      
      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">Как это работает</h2>
          <div className="space-y-3 text-zinc-300">
            <p>
              <strong className="text-zinc-100">Друг получает скидку 5% на первую покупку</strong> (применяется автоматически при оформлении заказа).
            </p>
            <p>
              <strong className="text-zinc-100">Ты получаешь:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>7% с первой покупки приглашенного друга</li>
              <li>2% со всех последующих покупок друга</li>
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">Холд начислений</h2>
          <p className="text-zinc-300">
            Начисления блокируются на <strong className="text-zinc-100">48 часов</strong> после зачисления. 
            Это необходимо для защиты от возвратов и спорных ситуаций.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">Вывод средств</h2>
          <div className="space-y-3 text-zinc-300">
            <p>
              <strong className="text-zinc-100">Минимальная сумма вывода:</strong> 500₽
            </p>
            <p>
              Вывод средств осуществляется вручную администратором по заявке. 
              Ориентировочный срок выплаты: <strong className="text-zinc-100">в течение 24 часов</strong> после одобрения заявки.
            </p>
            <p>
              <strong className="text-zinc-100">Доступный актив:</strong> USDT (сеть TON). 
              Для получения используется TON-адрес.
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">Антифрод и ограничения</h2>
          <div className="space-y-3 text-zinc-300">
            <p>Мы применяем строгие меры для защиты программы от злоупотреблений:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-zinc-100">Саморефералы запрещены</strong> — приглашение самого себя через другой аккаунт</li>
              <li><strong className="text-zinc-100">Мультиаккаунты запрещены</strong> — создание нескольких аккаунтов для обхода ограничений</li>
              <li><strong className="text-zinc-100">Возвраты и чарджбэки</strong> — при возврате средств или чарджбэке соответствующие начисления отменяются</li>
              <li><strong className="text-zinc-100">Подозрительные транзакции</strong> — мы оставляем за собой право отменить начисления при обнаружении подозрительной активности</li>
              <li><strong className="text-zinc-100">Право отмены начислений</strong> — администрация оставляет за собой право отменить начисления в случае нарушения правил программы</li>
            </ul>
          </div>
        </Card>

        <Card>
          <p className="text-sm text-zinc-400">
            Подробные условия использования сервиса доступны в{' '}
            <Link href="/terms" className="text-blue-300 hover:underline hover:text-blue-200">
              пользовательском соглашении
            </Link>
            {' '}и{' '}
            <Link href="/refund" className="text-blue-300 hover:underline hover:text-blue-200">
              политике возвратов
            </Link>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}

