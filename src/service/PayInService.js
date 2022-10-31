import Config from "../util/Config.js";
import AuthClient from "../api-client/AuthClient.js";
import PayInRequest from "../model/PayInRequest.js";
import PaymentMethod from "../util/PaymentMethod.js";
import PixClient from "../api-client/PixClient.js";

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
            console.log(accessToken);
            console.log(payInRequest);

            const paymentMethod = payInRequest.getPaymentMethod();

            switch (paymentMethod) {
                case PaymentMethod.CREDIT_CARD:
                    // this.payInClient = new CreditCardClient($configData, $accessToken);
                    break;
                case PaymentMethod.PIX_STATIC_QR:
                    this.payInClient = new PixClient(this.configData, accessToken);
                    break;
                case PaymentMethod.BOLETO:
                    // this.payInClient = new BoletoClient($configData, $accessToken);
                    break;
                default:
                    this.payInClient = null;
            }

            const payInResponse = this.payInClient.createPayIn(payInRequest);
            return payInResponse;
        }
    }

}

export default PayInService;