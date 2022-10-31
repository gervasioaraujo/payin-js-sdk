import Document from "./Document.js";

class Payer {

    constructor(payerData = {}) {

        if (payerData.hasOwnProperty('name')) {
            this.name = payerData.name;
        }

        if (payerData.hasOwnProperty('email')) {
            this.email = payerData.email;
        }

        if (payerData.hasOwnProperty('phone')) {
            this.phone = payerData.phone;
        }

        if (payerData.hasOwnProperty('document')) {
            const documentObj = new Document(payerData.document);
            this.document = documentObj;
        }

    }

}

export default Payer;