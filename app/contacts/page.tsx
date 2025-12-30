import Card from '@/app/components/Card';
import TelegramLink from '@/app/components/TelegramLink';
import { getContactInfo, getDisplayTelegramUsername } from '@/lib/contacts';

export const metadata = {
  title: 'Контакты - GameHubb Store',
  description: 'Контактная информация и поддержка',
};

export default function ContactsPage() {
  const contactInfo = getContactInfo();
  const telegramUsername = getDisplayTelegramUsername(contactInfo);
  const isBot = !contactInfo.supportTgUsername;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Контакты</h1>
      
      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-medium mb-4 text-zinc-100">Служба поддержки</h2>
          <div className="space-y-3 text-zinc-300">
            <div>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${contactInfo.email}`} className="text-blue-300 hover:underline hover:text-blue-200">
                {contactInfo.email}
              </a>
            </div>
            <div>
              <strong>Telegram:</strong>{' '}
              <TelegramLink username={telegramUsername} className="text-blue-300 hover:underline hover:text-blue-200">
                @{telegramUsername}{isBot ? ' (поддержка)' : ''}
              </TelegramLink>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-medium mb-4 text-zinc-100">Режим работы</h2>
          <div className="space-y-2 text-zinc-300">
            <p><strong>Понедельник - Пятница:</strong> 10:00 - 20:00 (МСК)</p>
            <p><strong>Суббота - Воскресенье:</strong> 12:00 - 18:00 (МСК)</p>
            <p className="text-sm text-zinc-400 mt-2">
              Ответ на обращение в течение 24 часов в рабочие дни
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-medium mb-4 text-zinc-100">По вопросам</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-300">
            <li>Технические проблемы с заказом</li>
            <li>Вопросы по доставке цифровых товаров</li>
            <li>Возврат средств</li>
            <li>Партнерство и сотрудничество</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

