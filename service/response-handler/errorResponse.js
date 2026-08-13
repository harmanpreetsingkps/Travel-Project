

class errorResponse extends Error{
    constructor(statuscode = 500, message = "Something Went Wrong", errors = []){
        super(message);

        this.status = statuscode;
        this.success = false;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default errorResponse;