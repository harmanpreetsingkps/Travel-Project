import fs from "fs/promises"

const errorHandler = (err, req, res, next)=>{
    const errorName = err.name || "Error";
    const errorMessage = err.message || "Internal Server Error";
    const  errorStatus = err.status || 500;
    const errorData =  err.data  ||  null;
    const errorStack = err.stack || "No stack trace available";
    
    
    console.log("I run immediately!");
    const date = new Date()
    const fileData = [`
    <h1>Error Name Is "${errorName}"</h1>,
    Error Status is "${errorStatus}",
    Error Message is "${errorMessage}",
    Error Data is "${errorData}",
    Error Date and Time is "${date}",
    Error Stack is "${errorStack}"
    `]
     fs.appendFile("./error-logs/errorlog.txt", fileData )
     .catch((err)=>{
        console.log("Error While Adding data in file" + err.name + " " + err.message)
     })




    return res.status(errorStatus).json({
        errorStatus,
        errorName,
        errorMessage,
        errorData,
        errorStack
    })
}
export default errorHandler;