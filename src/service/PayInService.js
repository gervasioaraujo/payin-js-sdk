import Config from "../util/Config.js";
import AuthClient from "../api-client/AuthClient.js";
import PayInRequest from "../model/PayInRequest.js";
import PaymentMethod from "../util/PaymentMethod.js";
import PixClient from "../api-client/PixClient.js";
import BoletoClient from "../api-client/BoletoClient.js";
import CreditCardClient from "../api-client/CreditCardClient.js";
import PayInClient from "../api-client/PayInClient.js";
import RefundRequest from "../model/RefundRequest.js";

class PayInService {

    constructor(configData = new Config()) {
        this.configData = configData;
    }

    async getAccessToken() {
        try {
            const authResponse = await this.authClient.authenticate();
            if (authResponse.hasOwnProperty('access_token')) {
                return authResponse.access_token;
            }
            return null;
        } catch (e) {
            throw new Error("Error while getting the access token.");
        }
    }

    async createPayIn(
        payInRequest = new PayInRequest()
    ) {
        this.authClient = new AuthClient(this.configData);
        const accessToken = await this.getAccessToken();

        if (accessToken != null) {

            const paymentMethod = payInRequest.getPaymentMethod();

            switch (paymentMethod) {
                case PaymentMethod.CREDIT_CARD:
                    this.payInClient = new CreditCardClient(this.configData, accessToken);
                    break;
                case PaymentMethod.PIX_STATIC_QR:
                    this.payInClient = new PixClient(this.configData, accessToken);
                    break;
                case PaymentMethod.BOLETO:
                    this.payInClient = new BoletoClient(this.configData, accessToken);
                    break;
                default:
                    this.payInClient = null;
                    break;
            }

            const payInResponse = await this.payInClient.createPayIn(payInRequest);
            return payInResponse;
        }
    }

    async getPayIn(idempotencyKey = null) {
        this.authClient = new AuthClient(this.configData);
        const accessToken = await this.getAccessToken();

        if (accessToken != null) {
            this.payInClient = new PayInClient(this.configData, accessToken);
            const getResponse = await this.payInClient.getPayIn(idempotencyKey);
            return getResponse;
        }
    }

    async cancelPayIn(idempotencyKey = null) {
        this.authClient = new AuthClient(this.configData);
        const accessToken = await this.getAccessToken();

        if (accessToken != null) {
            this.payInClient = new PayInClient(this.configData, accessToken);
            const cancelResponse = await this.payInClient.cancelPayIn(idempotencyKey);
            return cancelResponse;
        }
    }

    async refundPayIn(
        refundRequest = new RefundRequest()
    ) {
        this.authClient = new AuthClient(this.configData);
        const accessToken = await this.getAccessToken();

        if (accessToken != null) {
            this.payInClient = new PayInClient(this.configData, accessToken);
            const refundResponse = await this.payInClient.refundPayIn(refundRequest);
            return refundResponse;
        }
    }

}

export default PayInService;