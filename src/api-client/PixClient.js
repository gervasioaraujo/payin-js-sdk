import PayInClient from "./PayInClient.js";
import Config from "../util/Config.js";
import PayInRequest from "../model/PayInRequest.js";

class PixClient extends PayInClient {

    static ENDPOINT = "/v1/payments/charges/pix";

    constructor(configData = new Config(), accessToken = "") {
        super(accessToken);
        this.configData = configData;
    }

    // *********
    createPayIn(pixRequest = new PayInRequest()) {
        const url = this.configData.getPayInBaseUrl() + PixClient.ENDPOINT;
        const pixResponse = super.requestPayIn(url, pixRequest);
        return pixResponse;
    }

}

export default PixClient;