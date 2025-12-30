import Card from '@/app/components/Card';

export const metadata = {
  title: 'Публичная оферта - GameHubb Store',
  description: 'Условия использования и публичная оферта',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Публичная оферта</h1>
      
      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">1. Общие положения</h2>
          <p className="text-zinc-300">
            Настоящий документ является публичной офертой (далее — «Оферта») интернет-магазина GameHubb Store 
            (далее — «Продавец») о заключении договора купли-продажи цифровых товаров на условиях, 
            изложенных ниже.
          </p>
          <p className="text-zinc-300">
            Акцептом настоящей Оферты является совершение Покупателем действий по оформлению и оплате заказа.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">2. Предмет договора</h2>
          <p className="text-zinc-300">
            Продавец обязуется передать Покупателю цифровые товары (пополнение игровых счетов, 
            игровые ресурсы, внутриигровая валюта и иные цифровые товары для компьютерных и мобильных игр) 
            в порядке и на условиях, определенных настоящей Офертой.
          </p>
          <p className="text-zinc-300">
            Цифровые товары предоставляются в электронном виде и не имеют материального носителя.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">3. Порядок оформления и оплаты заказа</h2>
          <p className="text-zinc-300">
            Покупатель самостоятельно оформляет заказ через интерфейс интернет-магазина, 
            выбирая необходимые цифровые товары.
          </p>
          <p className="text-zinc-300">
            Оплата заказа производится через платежную систему Robokassa. 
            Принимаются банковские карты, электронные кошельки и другие способы оплаты, 
            доступные в системе Robokassa.
          </p>
          <p className="text-zinc-300">
            Моментом оплаты считается поступление денежных средств на счет Продавца.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">4. Доставка цифровых товаров</h2>
          <p className="text-zinc-300">
            Доставка цифровых товаров осуществляется автоматически через API игровых платформ 
            или вручную сотрудниками службы поддержки.
          </p>
          <p className="text-zinc-300">
            <strong>Типичное время доставки:</strong> от 5 минут до 24 часов с момента подтверждения оплаты.
          </p>
          <p className="text-zinc-300">
            В случае технических проблем доставка может быть отложена, но не более чем на 72 часа. 
            При невозможности доставки в указанный срок Покупателю возвращаются денежные средства.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">5. Права и обязанности сторон</h2>
          <p className="text-zinc-300">
            Продавец обязуется предоставить Покупателю качественные цифровые товары в соответствии 
            с описанием на сайте.
          </p>
          <p className="text-zinc-300">
            Покупатель обязуется предоставить корректные данные для доставки цифровых товаров 
            (игровой аккаунт, сервер, персонаж и т.д.).
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">6. Ответственность</h2>
          <p className="text-zinc-300">
            Продавец не несет ответственности за действия игровых платформ, блокировки аккаунтов 
            или изменения правил игр третьими лицами.
          </p>
          <p className="text-zinc-300">
            В случае невозможности доставки товара по вине Продавца, денежные средства возвращаются Покупателю.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">7. Возврат средств</h2>
          <p className="text-zinc-300">
            Возврат средств осуществляется в соответствии с политикой возвратов, 
            размещенной на странице <a href="/refund" className="text-blue-300 hover:underline hover:text-blue-200">/refund</a>.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium mb-4 text-zinc-100">8. Контактная информация</h2>
          <p className="text-zinc-300">
            По всем вопросам обращайтесь в службу поддержки: 
            <a href="/contacts" className="text-blue-300 hover:underline hover:text-blue-200"> контакты</a>.
          </p>
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

