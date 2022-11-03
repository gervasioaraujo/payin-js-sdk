import PayInClient from "./PayInClient.js";
import Config from "../util/Config.js";
import PayInRequest from "../model/PayInRequest.js";

class CreditCardClient extends PayInClient {

    static ENDPOINT = "/v1/payments/charges/card";

    constructor(configData = new Config(), accessToken = null) {
        super(configData, accessToken);
    }

    async createPayIn(creditCardRequest = new PayInRequest()) {
        const url = this.configData.getPayInBaseUrl() + CreditCardClient.ENDPOINT;
        const creditCardResponse = await super.createPayIn(url, creditCardRequest);
        return creditCardResponse;
    }

}

export default CreditCardClient;