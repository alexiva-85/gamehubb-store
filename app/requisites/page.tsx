import Card from '@/app/components/Card';

export const metadata = {
  title: 'Реквизиты продавца - GameHubb Store',
  description: 'Реквизиты и информация о продавце',
};

export default function RequisitesPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Реквизиты продавца</h1>
      
      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-medium mb-4 text-zinc-100">Информация о продавце</h2>
          
          <div className="space-y-3 text-zinc-300">
            <div>
              <strong>Статус:</strong> Самозанятый
            </div>
            <div>
              <strong>Полное имя:</strong> Иващенко Александр Владимирович
            </div>
            <div>
              <strong>ИНН:</strong> 470315391829
            </div>
            <div>
              <strong>Страна:</strong> Россия
            </div>
            <div>
              <strong>Город:</strong> Санкт-Петербург
            </div>
            <div>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@gamehubb.store" className="text-blue-300 hover:underline hover:text-blue-200">
                support@gamehubb.store
              </a>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-medium mb-4 text-zinc-100">Дополнительная информация</h2>
          <p className="text-zinc-300">
            Продавец осуществляет деятельность в качестве самозанятого лица в соответствии 
            с законодательством Российской Федерации.
          </p>
          <p className="mt-2 text-zinc-300">
            Все платежи обрабатываются через платежную систему Robokassa.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-medium mb-4 text-zinc-100">Контактная информация</h2>
          <p className="text-zinc-300">
            По всем вопросам обращайтесь в службу поддержки:{' '}
            <a href="/contacts" className="text-blue-300 hover:underline hover:text-blue-200">контакты</a>.
          </p>
        </Card>
      </div>
    </div>
  );
}

