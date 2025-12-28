export const metadata = {
  title: 'Политика возвратов - GameHubb Store',
  description: 'Политика возврата средств и доставки',
};

export default function RefundPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Политика возвратов и доставки</h1>
      
      <div className="space-y-6 prose max-w-none">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
          <p>
            Настоящая политика определяет порядок возврата денежных средств и условия доставки 
            цифровых товаров в интернет-магазине GameHubb Store.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Доставка цифровых товаров</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-4">2.1. Способ доставки</h3>
          <p>
            Доставка цифровых товаров (пополнение игровых счетов, игровые ресурсы, внутриигровая валюта) 
            осуществляется:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Автоматически</strong> через API игровых платформ (основной способ)</li>
            <li><strong>Вручную</strong> сотрудниками службы поддержки (при технических проблемах с API)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-4">2.2. Время доставки</h3>
          <p>
            <strong>Типичное время доставки:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Автоматическая доставка: от 5 минут до 1 часа</li>
            <li>Ручная доставка: от 1 часа до 24 часов</li>
            <li>В исключительных случаях: до 72 часов</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-4">2.3. Что происходит при неудачной доставке</h3>
          <p>
            В случае невозможности доставить цифровой товар:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Покупатель уведомляется о проблеме в течение 24 часов</li>
            <li>Служба поддержки предпринимает попытки решить проблему в течение 72 часов</li>
            <li>При невозможности доставки в указанный срок производится полный возврат денежных средств</li>
            <li>Возврат осуществляется на тот же способ оплаты, который использовался при покупке</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Возврат денежных средств</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-4">3.1. Условия возврата</h3>
          <p>
            Возврат денежных средств возможен в следующих случаях:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Товар не был доставлен в течение 72 часов с момента оплаты</li>
            <li>Доставлен неверный товар (не соответствует описанию)</li>
            <li>Техническая ошибка при доставке, подтвержденная службой поддержки</li>
            <li>Отмена заказа до момента начала доставки</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-4">3.2. Случаи, когда возврат невозможен</h3>
          <p>
            Возврат денежных средств <strong>не производится</strong> в следующих случаях:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Товар успешно доставлен и соответствует описанию</li>
            <li>Покупатель указал неверные данные для доставки (игровой аккаунт, сервер и т.д.)</li>
            <li>Товар был использован или активирован</li>
            <li>Прошло более 14 дней с момента оплаты</li>
            <li>Блокировка аккаунта игровой платформой по причинам, не связанным с действиями Продавца</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-4">3.3. Порядок возврата</h3>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Покупатель обращается в службу поддержки с запросом на возврат</li>
            <li>Указывает номер заказа и причину возврата</li>
            <li>Служба поддержки рассматривает запрос в течение 3 рабочих дней</li>
            <li>При одобрении возврата денежные средства возвращаются на способ оплаты в течение 5-10 рабочих дней</li>
          </ol>

          <h3 className="text-xl font-semibold mb-3 mt-4">3.4. Сроки возврата</h3>
          <p>
            Возврат денежных средств осуществляется в течение 5-10 рабочих дней с момента одобрения запроса. 
            Срок зачисления средств зависит от платежной системы и банка.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Контакты для возврата</h2>
          <p>
            Для оформления возврата обращайтесь в службу поддержки:
          </p>
          <ul className="list-none space-y-2">
            <li><strong>Email:</strong> <a href="mailto:support@gamehubb.store" className="text-blue-600 hover:underline">support@gamehubb.store</a></li>
            <li><strong>Telegram:</strong> <a href="https://t.me/gamehubb_support" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@gamehubb_support</a></li>
          </ul>
          <p className="mt-4">
            В запросе обязательно укажите номер заказа и причину возврата.
          </p>
        </section>

        <section className="text-sm text-gray-600 mt-8">
          <p>
            Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </section>
      </div>
    </div>
  );
}

