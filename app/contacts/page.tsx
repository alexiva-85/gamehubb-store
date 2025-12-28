export const metadata = {
  title: 'Контакты - GameHubb Store',
  description: 'Контактная информация и поддержка',
};

export default function ContactsPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Контакты</h1>
      
      <div className="space-y-6">
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Служба поддержки</h2>
          <div className="space-y-3">
            <div>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@gamehubb.store" className="text-blue-600 hover:underline">
                support@gamehubb.store
              </a>
            </div>
            <div>
              <strong>Telegram:</strong>{' '}
              <a href="https://t.me/gamehubb_support" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                @gamehubb_support
              </a>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Режим работы</h2>
          <div className="space-y-2">
            <p><strong>Понедельник - Пятница:</strong> 10:00 - 20:00 (МСК)</p>
            <p><strong>Суббота - Воскресенье:</strong> 12:00 - 18:00 (МСК)</p>
            <p className="text-sm text-gray-600 mt-2">
              Ответ на обращение в течение 24 часов в рабочие дни
            </p>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">По вопросам</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Технические проблемы с заказом</li>
            <li>Вопросы по доставке цифровых товаров</li>
            <li>Возврат средств</li>
            <li>Партнерство и сотрудничество</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

