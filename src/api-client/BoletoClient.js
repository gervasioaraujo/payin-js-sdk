import PayInClient from "./PayInClient.js";
import Config from "../util/Config.js";
import PayInRequest from "../model/PayInRequest.js";

class BoletoClient extends PayInClient {

    static ENDPOINT = "/v1/payments/charges/boleto";

    constructor(configData = new Config(), accessToken = null) {
        super(configData, accessToken);
    }

    async createPayIn(boletoRequest = new PayInRequest()) {
        const url = this.configData.getPayInBaseUrl() + BoletoClient.ENDPOINT;
        const boletoResponse = await super.createPayIn(url, boletoRequest);
        return boletoResponse;
    }

}

export default BoletoClient;