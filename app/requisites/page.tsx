export const metadata = {
  title: 'Реквизиты продавца - GameHubb Store',
  description: 'Реквизиты и информация о продавце',
};

export default function RequisitesPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Реквизиты продавца</h1>
      
      <div className="space-y-6">
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Информация о продавце</h2>
          
          <div className="space-y-3">
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
              <a href="mailto:support@gamehubb.store" className="text-blue-600 hover:underline">
                support@gamehubb.store
              </a>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Дополнительная информация</h2>
          <p>
            Продавец осуществляет деятельность в качестве самозанятого лица в соответствии 
            с законодательством Российской Федерации.
          </p>
          <p className="mt-2">
            Все платежи обрабатываются через платежную систему Robokassa.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Контактная информация</h2>
          <p>
            По всем вопросам обращайтесь в службу поддержки:{' '}
            <a href="/contacts" className="text-blue-600 hover:underline">контакты</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

