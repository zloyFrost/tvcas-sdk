interface SetParams {
    descr?: string;
    pair?: 0 | 1;
    start?: string;
    finish?: string;
    access_criteria?: string;
    [key: string]: any;
}
interface CardInfo {
    serial_no: string;
    descr?: string;
    pair?: number;
    start?: string;
    finish?: string;
    access_criteria?: string;
    [key: string]: any;
}
declare class TVCASClient {
    private apiKey;
    private baseUrl;
    constructor(apiKey: string, baseUrl?: string);
    /**
     * Получить или обновить информацию о карте
     * @param serialNo серийный номер карты
     * @param setParams параметры для обновления (необязательно)
     */
    cardInfo(serialNo: string, setParams?: SetParams): Promise<CardInfo>;
}

export { type CardInfo, type SetParams, TVCASClient };
