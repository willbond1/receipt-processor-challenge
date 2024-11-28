import { Router } from 'express';
import { Receipt, validateReceipt } from '../classes/receipt';
import { v4 as uuidv4 } from 'uuid';
import { pointMap } from '../classes/pointMap';

export const processReceiptsRoute = Router();

processReceiptsRoute.post('/process', validateReceipt, (req, res) => {
    const receipt: Receipt = req.body;
    let pointValue = 0;

    // 1 point for every alphanumeric character in retailer name
    for(const c of receipt.retailer){
        if(/^[0-9a-z]$/i.test(c)) { // use regex to check
            pointValue++;
        }
    }

    const totalCents = parseFloat(receipt.total) * 100; // convert to integer cent value for simplicity
    // 50 points if total is round dollar amount (cents divisible by 100)
    if(totalCents % 100 === 0){
        pointValue += 50;
    }
    // 25 points if total is a multiple of 0.25 (cents divisible by 25)
    if(totalCents % 25 === 0){
        pointValue += 25;
    }

    // 5 points for every 2 items on the receipt
    pointValue += (Math.floor(receipt.items.length / 2) * 5); // get the number of items (length of array) and divide by 2 ignoring remainder, before multiplying by 5

    // for each item...
    receipt.items.forEach(item => {
        // if the length of the trimmed description is divisible by 3...
        if(item.shortDescription.trim().length % 3 === 0){
            // ...multiply the price by 0.2 and round up, adding the result to the point value
            pointValue += Math.ceil(parseFloat(item.price) * 0.2);
        }
    });

    // 6 points if the day in the date is odd
    if((new Date(receipt.purchaseDate)).getDate() % 2 === 1){
        pointValue += 6;
    }

    // 10 points if the time is in between 2 PM and 4 PM (14:00 and 16:00)
    const [ hour, _minute ] = receipt.purchaseTime.split(':');
    if(parseInt(hour) >= 14 && parseInt(hour) <= 16){
        pointValue += 10;
    }

    // generate id and store point value in pointMap record
    const id = uuidv4();
    pointMap[id] = pointValue;

    res.status(200).json({ id });
});