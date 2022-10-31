import Payer from "./Payer.js";

class PayInRequest {

    constructor(requestData = {}) {

        if (requestData.hasOwnProperty('idempotencyKey')) {
            this.idempotencyKey = requestData.idempotencyKey;
        }

        if (requestData.hasOwnProperty('amount')) {
            this.amount = requestData.amount;
        }

        if (requestData.hasOwnProperty('currency')) {
            this.currency = requestData.currency;
        }

        if (requestData.hasOwnProperty('country')) {
            this.country = requestData.country;
        }

        if (requestData.hasOwnProperty('paymentMethod')) {
            this.paymentMethod = requestData.paymentMethod;
        }

        if (requestData.hasOwnProperty('paymentFlow')) {
            this.paymentFlow = requestData.paymentFlow;
        }

        if (requestData.hasOwnProperty('callbackUrl')) {
            this.callbackUrl = requestData.callbackUrl;
        }

        if (requestData.hasOwnProperty('payer')) {
            const payerObj = new Payer(requestData.payer);
            this.payer = payerObj;
        }
    }

    getIdempotencyKey() {
        return this.idempotencyKey;
    }

    // getAmount() {
    //     return this.amount;
    // }

    // getCurrency() {
    //     return this.currency;
    // }

    // getCountry() {
    //     return this.country;
    // }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    // getPaymentFlow() {
    //     return this.paymentFlow;
    // }

    // getCallbackUrl() {
    //     return this.callbackUrl;
    // }

    // getPayer() {
    //     return this.payer;
    // }
}

export default PayInRequest;