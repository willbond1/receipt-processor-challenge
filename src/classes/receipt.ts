import { Request, Response, NextFunction } from "express";

export interface Receipt {
    retailer: string;
    purchaseDate: string;
    purchaseTime: string;
    items: {
        shortDescription: string;
        price: string;
    }[];
    total: string;
}

// middleware function for validating request bodies of this type
export function validateReceipt(req: Request, res: Response, next: NextFunction) {
    function invalidReceiptError() {
        res.status(400).json({ error: `Provided receipt is invalid: ${req.body}`});
    }

    const { retailer, purchaseDate, purchaseTime, items, total} = req.body;
    if(typeof retailer !== 'string' ||
        typeof purchaseDate !== 'string' ||
        typeof purchaseTime !== 'string' ||
        !Array.isArray(items) ||
        typeof total !== 'string'
    ) {
        invalidReceiptError();
    }

    if(!(new RegExp("^[\\w\\s\\-&]+$")).test(retailer)) {
        invalidReceiptError();
    }

    if(isNaN((new Date(purchaseDate)).getTime())) {
        invalidReceiptError();
    }

    if(!/^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/.test(purchaseTime)) {
        invalidReceiptError();
    }

    let runningTotalInCents = 0; // in cents to maintain accuracy
    for(const item of items) {
        const { shortDescription, price } = item;
        if(typeof shortDescription !== 'string' ||
            typeof price !== 'string'
        ) {
            invalidReceiptError();
        }

        if(!(new RegExp("^[\\w\\s\\-]+$")).test(shortDescription)) {
            invalidReceiptError();
        }

        if(!(new RegExp("^\\d+\\.\\d{2}$")).test(price)) {
            invalidReceiptError();
        }

        runningTotalInCents += (parseFloat(price) * 100);
    }

    if(!(new RegExp("^\\d+\\.\\d{2}$")).test(total)) {
        invalidReceiptError();
    }

    if(runningTotalInCents !== (parseFloat(total) * 100)) { // ensure that receipt total actually adds up
        invalidReceiptError();
    }

    next();
}