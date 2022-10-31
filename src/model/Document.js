class Document {

    constructor(documentData = {}) {

        if (documentData.hasOwnProperty('documentId')) {
            this.documentId = documentData.documentId;
        }

        if (documentData.hasOwnProperty('type')) {
            this.type = documentData.type;
        }

    }

}

export default Document;