import { Receipt } from './receipt';

class ReceiptMap {
    private _map: Record<string, Receipt> = {};

    addReceipt(id: string, json: Receipt) {
        this._map[id] = json;
    }

    hasReceipt(id: string) {
        return this._map.hasOwnProperty(id);
    }

    getReceipt(id: string) {
        return this._map[id];
    }
}

export const receipts = new ReceiptMap();