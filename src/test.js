import Config from "./util/Config.js";
import PayInRequest from "./model/PayInRequest.js";
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

    const payInRequest = new PayInRequest({
        "idempotencyKey": "TESTE-VTEX-G1-AAAE",
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
    payInService.createPayIn(payInRequest);

}

testPix();