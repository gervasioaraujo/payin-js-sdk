
class PaymentTerm {

    constructor(paymentTermData = {}) {
        if (paymentTermData.hasOwnProperty('paymentDeadline')) {
            this.paymentDeadline = paymentTermData.paymentDeadline;
        }
    }
}

export default PaymentTerm;