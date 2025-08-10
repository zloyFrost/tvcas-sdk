import fetch from 'node-fetch';

export interface SetParams {
    descr?: string;
    pair?: 0 | 1;
    start?: string;          // unix timestamp в виде строки
    finish?: string;         // unix timestamp в виде строки
    access_criteria?: string; // строка битовой маски, например "00000001"
    [key: string]: any;
}

export interface CardInfo {
    serial_no: string;
    descr?: string;
    pair?: number;
    start?: string;
    finish?: string;
    access_criteria?: string;
    [key: string]: any;
}

export class TVCASClient {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string, baseUrl = 'http://tvcas.local/api.php') {
        if (!apiKey) throw new Error('API key is required');
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    /**
     * Получить или обновить информацию о карте
     * @param serialNo серийный номер карты
     * @param setParams параметры для обновления (необязательно)
     */
    async cardInfo(serialNo: string, setParams?: SetParams): Promise<CardInfo> {
        if (!serialNo) throw new Error('serialNo is required');

        const url = new URL(this.baseUrl);
        url.searchParams.set('api_key', this.apiKey);
        url.searchParams.set('serial_no', serialNo);

        if (setParams) {
            Object.entries(setParams).forEach(([key, val]) => {
                url.searchParams.set(`set[${key}]`, String(val));
            });
        }

        const res = await fetch(url.toString());
        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        const errorCodes = new Set([
            'NOT_VALID_API_KEY',
            'SMARTCARD_NOT_FOUND',
            'UNKNOWN_SET_PARAMETER',
            'ACCESS_CRITERIA_ERROR',
            'PAIR_ERROR',
            'START_ERROR',
            'FINISH_ERROR',
        ]);

        if (typeof data === 'string' && errorCodes.has(data)) {
            throw new Error(`TVCAS API error: ${data}`);
        }

        return data as CardInfo;
    }
}