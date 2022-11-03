import { v4 as uuidv4 } from 'uuid';

import Config from "./util/Config.js";
import PayInRequest from "./model/PayInRequest.js";
import RefundRequest from './model/RefundRequest.js';
import Country from "./util/Country.js";
import Currency from "./util/Currency.js";
import PaymentMethod from "./util/PaymentMethod.js";
import PaymentFlow from "./util/PaymentFlow.js";
import PayInService from "./service/PayInService.js";

async function testPix() {

    const isLiveMode = false;

    const configData = new Config({
        clientId: "5d64815a0i63n4vuo4haktlb3a",
        clientSecret: "1dkbocf1bojiefu2akfmnv5dd9evhmqtc833i62c7q3u8flvbt4o",
        apiKey: "fztXT5QuK755svjly94H6anwAYD1Ap3249jH2djb",
        isLiveMode
    });

    const idempotencyKey = uuidv4();

    const payInRequest = new PayInRequest({
        "idempotencyKey": idempotencyKey,
        "amount": 135,
        "currency": Currency.BRL,
        "country": Country.BRAZIL,
        "paymentMethod": PaymentMethod.PIX_STATIC_QR,
        "paymentFlow": PaymentFlow.DIRECT,
        "callbackUrl": "https://pix-teste.requestcatcher.com/test",
        "payer": {
            "name": "Gervásio Araújo",
            "email": "gervasfj@gmail.com",
            //"phone": "+5586988920714",
            "document": {
                "documentId": "02140699319",
                "type": "CPF"
            }
        }
    });

    const payInService = new PayInService(configData);
    const payInResponse = await payInService.createPayIn(payInRequest);
    console.log(payInResponse);

    // setTimeout(async () => {
    //     const cancelResponse = await payInService.cancelPayIn(idempotencyKey);
    //     console.log(cancelResponse)
    // }, 4000)


}

// testPix();

async function testBoleto() {

    const isLiveMode = false;

    const configData = new Config({
        clientId: "5d64815a0i63n4vuo4haktlb3a",
        clientSecret: "1dkbocf1bojiefu2akfmnv5dd9evhmqtc833i62c7q3u8flvbt4o",
        apiKey: "fztXT5QuK755svjly94H6anwAYD1Ap3249jH2djb",
        isLiveMode
    });

    const idempotencyKey = uuidv4();

    const today = new Date();
    today.setDate(today.getDate() + 5);
    const paymentDeadline = today.getTime() / 1000;

    const payInRequest = new PayInRequest({
        "idempotencyKey": idempotencyKey,
        "amount": 535,
        "currency": Currency.BRL,
        "country": Country.BRAZIL,
        "paymentMethod": PaymentMethod.BOLETO,
        "paymentFlow": PaymentFlow.DIRECT,
        "callbackUrl": "https://pix-teste.requestcatcher.com/test",
        "payer": {
            "name": "Gervásio Araújo",
            "email": "gervasfj@gmail.com",
            "phone": "+5586988920714",
            "document": {
                "documentId": "02140699319",
                "type": "CPF"
            },
            "billingAddress": {
                "zipCode": "65633310",
                "state": "MA",
                "city": "Timon",
                "district": "Unknown",
                "street": "Rua 13",
                "number": "Unknown",
                "country": "BR"
            }
        },
        "paymentTerm": {
            "paymentDeadline": paymentDeadline
        }
    });

    const payInService = new PayInService(configData);
    const payInResponse = await payInService.createPayIn(payInRequest);
    console.log(payInResponse);

    // setTimeout(async () => {
    //     const cancelResponse = await payInService.cancelPayIn(idempotencyKey);
    //     console.log(cancelResponse)
    // }, 4000)


}

// testBoleto();

async function testCreditCard() {

    const configData = new Config({
        clientId: "5d64815a0i63n4vuo4haktlb3a",
        clientSecret: "1dkbocf1bojiefu2akfmnv5dd9evhmqtc833i62c7q3u8flvbt4o",
        apiKey: "fztXT5QuK755svjly94H6anwAYD1Ap3249jH2djb",
        isLiveMode: false
    });

    const idempotencyKey = uuidv4();

    const payInRequest = new PayInRequest({
        "idempotencyKey": idempotencyKey,
        "amount": 535,
        "currency": Currency.BRL,
        "country": Country.BRAZIL,
        "paymentMethod": PaymentMethod.CREDIT_CARD,
        "paymentFlow": PaymentFlow.DIRECT,
        "callbackUrl": "https://pix-teste.requestcatcher.com/test",
        "payer": {
            "name": "Gervásio Araújo",
            "email": "gervasfj@gmail.com",
            "phone": "+5586988920714",
            "document": {
                "documentId": "02140699319",
                "type": "CPF"
            },
            "billingAddress": {
                "zipCode": "65633310",
                "state": "MA",
                "city": "Timon",
                "district": "Unknown",
                "street": "Rua 13",
                "number": "Unknown",
                "country": "BR"
            }
        },
        "card": {
            "cardHolderName": "Captured",
            "cardNumber": "4510100541737493",
            "expirationMonth": "05",
            "expirationYear": "2026",
            "cvc": "715"
        },
        "installments": 3,
    });

    const payInService = new PayInService(configData);
    const payInResponse = await payInService.createPayIn(payInRequest);
    console.log(payInResponse);

    // setTimeout(async () => {
    //     const cancelResponse = await payInService.cancelPayIn(idempotencyKey);
    //     console.log(cancelResponse)
    // }, 4000)


}

testCreditCard();

async function testRefund() {

    const isLiveMode = false;

    const configData = new Config({
        clientId: "5d64815a0i63n4vuo4haktlb3a",
        clientSecret: "1dkbocf1bojiefu2akfmnv5dd9evhmqtc833i62c7q3u8flvbt4o",
        apiKey: "fztXT5QuK755svjly94H6anwAYD1Ap3249jH2djb",
        isLiveMode
    });

    const idempotencyKey = uuidv4();

    const refundRequest = new RefundRequest({
        "idempotencyKey": idempotencyKey,
        "referenceId": "d0331082-459f-4c4f-TESTE-GERV1",
        "amount": 135,
        "currency": Currency.BRL,
        "country": Country.BRAZIL,
        "description": "Refund Test",
        "callbackUrl": "https://pix-teste.requestcatcher.com/test"
    });

    const payInService = new PayInService(configData);
    const refundResponse = await payInService.refundPayIn(refundRequest);
    console.log(refundResponse);

}

// testRefund();