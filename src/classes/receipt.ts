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

// returns true if the receipt is valid, false otherwise
export function validateReceipt(receipt: Receipt) { 
    if(!(new RegExp("^[\\w\\s\\-&]+$")).test(receipt.retailer)) {
        return false;
    }

    if(isNaN((new Date(receipt.purchaseDate)).getTime())) {
        return false;
    }

    if(!/^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/.test(receipt.purchaseTime)) {
        return false;
    }

    let runningTotalInCents = 0; // in cents to maintain accuracy
    for(const item of receipt.items) {
        if(!(new RegExp("^[\\w\\s\\-]+$")).test(item.shortDescription)) {
            return false;
        }

        if(!(new RegExp("^\\d+\\.\\d{2}$")).test(item.price)) {
            return false;
        }

        runningTotalInCents += (parseFloat(item.price) * 100);
    }

    if(!(new RegExp("^\\d+\\.\\d{2}$")).test(receipt.total)) {
        return false;
    }

    if(runningTotalInCents !== (parseFloat(receipt.total) * 100)) { // ensure that receipt total actually adds up
        return false;
    }

    return true;
}