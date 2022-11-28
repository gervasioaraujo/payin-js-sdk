import { v4 as uuidv4 } from 'uuid';

import Config from "./util/Config.js";
import PayInRequest from "./model/PayInRequest.js";
import RefundRequest from './model/RefundRequest.js';
import Country from "./util/Country.js";
import Currency from "./util/Currency.js";
import PaymentMethod from "./util/PaymentMethod.js";
import PaymentFlow from "./util/PaymentFlow.js";
import PayInService from "./service/PayInService.js";

const configData = new Config({
    clientId: "5d64815a0i63n4vuo4haktlb3a",
    clientSecret: "1dkbocf1bojiefu2akfmnv5dd9evhmqtc833i62c7q3u8flvbt4o",
    apiKey: "fztXT5QuK755svjly94H6anwAYD1Ap3249jH2djb",
    isLiveMode: false
});

const payInService = new PayInService(configData);

const idempotencyKey = uuidv4();

function getPixPayInRequestDemo() {
    return new PayInRequest({
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
            "phone": "+5586988920714",
            "document": {
                "documentId": "02140699319",
                "type": "CPF"
            }
        }
    });
}

function getBoletoPayInRequestDemo() {
    const today = new Date();
    today.setDate(today.getDate() + 5);
    const paymentDeadline = today.getTime() / 1000;

    return new PayInRequest({
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
}

function getCreditCardPayInRequestDemo() {
    return new PayInRequest({
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
            // "cardNumber": "4510100541737493", // Success
            "cardNumber": "4444333322221112",
            "expirationMonth": "05",
            "expirationYear": "2026",
            "cvc": "715"
        },
        "installments": 3,
    });
}

async function createPayIn(payInRequest = new PayInRequest()) {
    const payInResponse = await payInService.createPayIn(payInRequest);
    return payInResponse;
}

async function testCreatePix() {
    const payInRequest = getPixPayInRequestDemo();
    const payInResponse = await createPayIn(payInRequest);
    console.log(payInResponse);
}

// testCreatePix();

async function testCancelPixPayIn() {

    const payInRequest = getPixPayInRequestDemo();
    const payInResponse = await createPayIn(payInRequest);
    console.log(payInResponse);

    setTimeout(async () => {
        const cancelResponse = await payInService.cancelPayIn(idempotencyKey);
        console.log(cancelResponse)
    }, 3000)

}

// testCancelPixPayIn()

async function testCreateBoleto() {
    const payInRequest = getBoletoPayInRequestDemo();
    const payInResponse = await createPayIn(payInRequest);
    console.log(payInResponse);
}

// testCreateBoleto();

async function testCreateCreditCard() {
    const payInRequest = getCreditCardPayInRequestDemo();
    const payInResponse = await createPayIn(payInRequest);
    console.log(payInResponse);
}

// testCreateCreditCard();

async function testGetPayIn() {
    const payInService = new PayInService(configData);
    const idempotencyKey = "d0331082-459f-4c4f-TESTE-GERV4";
    const getResponse = await payInService.getPayIn(idempotencyKey);
    console.log(getResponse);
}

// testGetPayIn();

async function testRefundPayIn() {

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

// testRefundPayIn();

async function testGetBoletoPdfUrl() {
    const payInService = new PayInService(configData);
    const idempotencyKey = "CBINTER-STAGING-BL-A111-AAAAAB";
    const getResponse = await payInService.getBoletoPdfUrl(idempotencyKey);
    console.log(getResponse);
}

// testGetBoletoPdfUrl();