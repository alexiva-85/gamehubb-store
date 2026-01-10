import Card from '@/app/components/Card';
import TelegramLink from '@/app/components/TelegramLink';
import { getContactInfo, getDisplayTelegramUsername } from '@/lib/contacts';

export const metadata = {
  title: 'Политика возвратов - GameHubb Store',
  description: 'Политика возврата средств и доставки',
};

export default function RefundPage() {
  const contactInfo = getContactInfo();
  const telegramUsername = getDisplayTelegramUsername(contactInfo);
  const isBot = !contactInfo.supportTgUsername;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Политика доставки и возвратов GameHubb Store</h1>
      
      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">1. Общие положения</h2>
          <p className="text-zinc-300 mb-3">
            1.1. Настоящая политика регулирует порядок доставки цифровых товаров (пополнение игровых аккаунтов, внутриигровая валюта/ресурсы, цифровые коды и аналогичные цифровые продукты) и рассмотрение обращений по возвратам/спорным ситуациям в GameHubb Store.
          </p>
          <p className="text-zinc-300 mb-3">
            1.2. Цифровые товары относятся к товарам/услугам, которые исполняются мгновенно или в короткий срок и после успешной доставки не подлежат &quot;физическому&quot; возврату (начисление нельзя &quot;откатить&quot; на стороне продавца в большинстве игровых систем).
          </p>
          <p className="text-zinc-300">
            1.3. Мы всегда стремимся решать спорные случаи в пользу клиента, если проблема подтверждается проверкой заказа и логов/статусов провайдера.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">2. Доставка цифровых товаров</h2>
          
          <h3 className="text-xl font-medium mb-3 mt-4 text-zinc-100">2.1. Способы доставки</h3>
          <p className="text-zinc-300 mb-3">
            Доставка осуществляется одним из способов:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-300">
            <li>Автоматически через интеграции/провайдеров и API (основной способ).</li>
            <li>Вручную службой поддержки (резервный способ при технических сбоях, повышенной нагрузке, необходимости проверки данных).</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4 text-zinc-100">2.2. Сроки доставки (ориентировочные)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-300 mb-3">
            <li>Автоматическая доставка: обычно 5–60 минут.</li>
            <li>Ручная доставка: обычно 1–24 часа.</li>
            <li>В редких случаях (сбой платформы/провайдера, технические работы, блокировки на стороне игры): до 72 часов.</li>
          </ul>
          <p className="text-zinc-300 text-sm italic">
            Примечание: сроки указаны как ориентиры и могут меняться по причинам, не зависящим от GameHubb Store (статус игровых серверов, провайдеров, платежных систем и т.д.).
          </p>

          <h3 className="text-xl font-medium mb-3 mt-4 text-zinc-100">2.3. Подтверждение доставки</h3>
          <p className="text-zinc-300">
            Доставка считается выполненной, если провайдер/игровая система вернула статус &quot;успешно/complete/success&quot; и/или по данным заказа зафиксировано фактическое начисление/передача цифрового товара на указанный аккаунт/ID.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">3. Когда возможен возврат</h2>
          <p className="text-zinc-300 mb-3">
            Возврат денежных средств (полностью или частично) возможен, если подтверждается одно из следующих обстоятельств:
          </p>
          
          <h3 className="text-xl font-medium mb-3 mt-4 text-zinc-100">3.1. Недоставка</h3>
          <p className="text-zinc-300 mb-3">
            Оплата прошла, но доставка не выполнена в течение 72 часов, и службе поддержки не удалось завершить выполнение заказа.
          </p>

          <h3 className="text-xl font-medium mb-3 mt-4 text-zinc-100">3.2. Техническая ошибка на стороне магазина/провайдера</h3>
          <p className="text-zinc-300 mb-3">
            Списание прошло, заказ завис, статус противоречивый, начисление не произошло и это подтверждается проверкой.
          </p>

          <h3 className="text-xl font-medium mb-3 mt-4 text-zinc-100">3.3. Дублирование списания/двойная оплата</h3>
          <p className="text-zinc-300 mb-3">
            Один и тот же заказ оплачен дважды по ошибке и доставка не была выполнена дважды (или второй платеж не потребовался).
          </p>

          <h3 className="text-xl font-medium mb-3 mt-4 text-zinc-100">3.4. Отмена до начала исполнения</h3>
          <p className="text-zinc-300 mb-3">
            Если заказ ещё не был отправлен в исполнение (не начата доставка/не передан провайдеру), поддержка может отменить заказ и оформить возврат.
          </p>
          <p className="text-zinc-300 text-sm italic">
            Примечание: в отдельных случаях возможна альтернатива возврату — повторная доставка, замена товара, выдача эквивалентного продукта или бонуса — по согласованию с клиентом.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">4. Когда возврат не производится</h2>
          <p className="text-zinc-300 mb-3">
            Возврат, как правило, не производится, если:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-300">
            <li>Доставка успешно выполнена и соответствует описанию товара/заказа (подтверждено статусом и/или фактическим начислением).</li>
            <li>Клиент указал неверные данные (ID/логин, сервер, регион, ник, параметры аккаунта и т.п.), из-за чего товар был доставлен не туда/не может быть доставлен.</li>
            <li>Товар относится к цифровым/потребляемым продуктам, которые после доставки считаются использованными/активированными (в том числе внутриигровая валюта/ресурсы, direct top-up).</li>
            <li>Аккаунт клиента заблокирован/ограничен игровой платформой по причинам, не связанным с действиями GameHubb Store, и при этом доставка была выполнена корректно.</li>
            <li>Прошёл срок обращения по спору (см. раздел 5.2), и мы не можем надёжно проверить обстоятельства заказа.</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">5. Спорные ситуации и порядок рассмотрения</h2>
          
          <h3 className="text-xl font-medium mb-3 mt-4 text-zinc-100">5.1. Как подать обращение</h3>
          <p className="text-zinc-300 mb-3">
            Для рассмотрения вопроса клиенту нужно написать в поддержку и указать:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-300">
            <li>номер заказа;</li>
            <li>краткое описание проблемы;</li>
            <li>корректные данные аккаунта/ID;</li>
            <li>при необходимости — скриншоты из игры/истории операций (если это поможет ускорить проверку).</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-4 text-zinc-100">5.2. Срок обращения</h3>
          <p className="text-zinc-300 mb-3">
            Рекомендуемый срок обращения по проблемам доставки — в течение 7 дней с момента оплаты.
          </p>

          <h3 className="text-xl font-medium mb-3 mt-4 text-zinc-100">5.3. Сроки проверки</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-300">
            <li>Первичный ответ: обычно в течение 24 часов.</li>
            <li>Проверка и решение: обычно 1–3 рабочих дня, в сложных случаях — дольше (если требуется запрос провайдеру/платформе).</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">6. Сроки и способ возврата</h2>
          <p className="text-zinc-300 mb-3">
            6.1. При одобрении возврата средства возвращаются тем же способом оплаты, которым была совершена покупка (если технически возможно).
          </p>
          <p className="text-zinc-300 mb-3">
            6.2. Срок возврата после одобрения: обычно 5–10 рабочих дней. Фактическое зачисление зависит от платежной системы и банка.
          </p>
          <p className="text-zinc-300">
            6.3. Если по техническим причинам возврат на исходный способ невозможен, поддержка предложит альтернативный вариант — по согласованию с клиентом.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">7. Важные примечания</h2>
          <p className="text-zinc-300 mb-3">
            7.1. Мы не можем гарантировать работу игровых серверов/платформ, а также отсутствие задержек на стороне провайдеров, однако делаем всё возможное для своевременной доставки.
          </p>
          <p className="text-zinc-300">
            7.2. Если отдельные положения настоящей политики противоречат обязательным требованиям законодательства, применяются соответствующие требования закона.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-medium mb-4 text-zinc-100">Контакты для обращений</h2>
          <p className="text-zinc-300 mb-3">
            Для оформления возврата или решения спорных ситуаций обращайтесь в службу поддержки:
          </p>
          <ul className="list-none space-y-2 text-zinc-300">
            <li><strong>Email:</strong> <a href={`mailto:${contactInfo.email}`} className="text-blue-300 hover:underline hover:text-blue-200">{contactInfo.email}</a></li>
            <li>
              <strong>Telegram:</strong>{' '}
              <TelegramLink username={telegramUsername} className="text-blue-300 hover:underline hover:text-blue-200">
                @{telegramUsername}{isBot ? ' (поддержка)' : ''}
              </TelegramLink>
            </li>
          </ul>
        </Card>

        <Card>
          <p className="text-sm text-zinc-400">
            Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </Card>
      </div>
    </div>
  );
}
