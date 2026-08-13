import fs from 'fs/promises';
import asyncHandler from '../service/error-handler/asyncErrorHandler.js';
import apiResponse from '../service/response-handler/apiResponse.js';
import errorResponse from '../service/response-handler/errorResponse.js';

const readFileData =  asyncHandler(async (req, res)=>{
    const data = await fs.readFile('./error-logs/errorlog.txt', "utf-8")

    if(!data) throw new errorResponse(200, "hjghj" );

    return res.status(200).json(
        new apiResponse(200, "Log File Data Read Successfull" , data)
    )
})
export default readFileData;