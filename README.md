# TVCAS SDK

SDK для работы с API TVCAS — получение и обновление информации о смарт-картах через HTTP API.

---

## Установка

```bash
npm install tvcas-sdk
```

---

## Быстрый старт

```ts
import { TVCASClient } from 'tvcas-sdk';

const client = new TVCASClient('your_api_key');

(async () => {
  try {
    // Получить информацию о карте
    const card = await client.cardInfo('2100000000');
   
    // Обновить параметры карты
    const updated = await client.cardInfo('2100000000', {
      descr: 'Jack London',
      pair: 0,
      start: '1234567890',
      finish: '1234567890',
      access_criteria: '00000001',
    });
   
  } catch (err) {
    console.error('Ошибка:', err);
  }
})();
```

---

## API

### Конструктор

```ts
new TVCASClient(apiKey: string, baseUrl?: string)
```

- `apiKey` — ключ API для доступа к TVCAS.
- `baseUrl` — URL API (по умолчанию `http://tvcas.local/api.php`).

---

### Метод `cardInfo`

```ts
cardInfo(serialNo: string, setParams?: object): Promise<object>
```

Получить или обновить информацию о карте.

- `serialNo` — серийный номер карты.
- `setParams` — объект с параметрами для обновления (необязательно), например:

```ts
{
  descr: string,
  pair: 0 | 1,
  start: string,          // UNIX-время в виде строки
  finish: string,         // UNIX-время в виде строки
  access_criteria: string // битовая маска, например "00000001"
}
```

Возвращает Promise с объектом данных карты или обновлёнными данными.

---

## Обработка ошибок

При ошибках API выбрасывается исключение с одним из следующих кодов:

- `NOT_VALID_API_KEY` — неверный ключ API
- `SMARTCARD_NOT_FOUND` — смарт-карта не найдена
- `UNKNOWN_SET_PARAMETER` — неизвестный параметр в `set`
- `ACCESS_CRITERIA_ERROR` — неправильное значение `access_criteria`
- `PAIR_ERROR` — ошибка установки флага `pair`
- `START_ERROR` или `FINISH_ERROR` — неверное время в формате Unix

---

## Зависимости

- [node-fetch](https://www.npmjs.com/package/node-fetch)

---

## Лицензия

MIT

---

