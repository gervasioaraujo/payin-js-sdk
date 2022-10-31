import axios from "axios";

import PayInRequest from "../model/PayInRequest.js";

// abstract
class PayInClient {

    constructor(accessToken = "") {
        this.accessToken = accessToken;
    }
    // abstract
    // createPayIn(payInRequest = {})

    // setAccessToken(accessToken = "") {
    //     this.accessToken = accessToken;
    // }

    async requestPayIn(url = "", payInRequest = new PayInRequest()) {
        
        const jsonPayload = JSON.stringify(payInRequest);

        console.log(url);
        console.log(jsonPayload);

        try {
            const response = await axios.post(
                url,
                jsonPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": this.configData.getClientApiKey(),
                        "Authorization": `Bearer ${this.accessToken}`
                    }
                });

            const payInResponse = response.data;
            console.log(payInResponse);
            return payInResponse;
        } catch (error) {
            console.error(error);
            throw "Error while request pay in to Liquido BR API.";
        }
    }

}

export default PayInClient;