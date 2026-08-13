

class apiResponse{
    constructor(statuscode, message, data = null ){
        this.success = statuscode < 400;
        this.statuscode = statuscode;
        this.message = message;
        this.data = data

    }
}

export default apiResponse;