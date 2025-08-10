import { TVCASClient } from '../index';

const client = new TVCASClient('ykiV80bWWUutz35','http://192.168.88.135:8080/api.php');

(async () => {
    try {
        // получить информацию о карте
        const card = await client.cardInfo('2100033661');
        console.log(card);

        // обновить карту
        // const updated = await client.cardInfo('2100000000', {
        //     descr: 'Jack London',
        //     pair: 0,
        //     start: '1234567890',
        //     finish: '1234567890',
        //     access_criteria: '00000001',
        // });
        // console.log(updated);
    } catch (err) {
        console.error(err);
    }
})();