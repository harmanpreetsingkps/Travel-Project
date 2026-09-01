import Country from "../models/location.model.js";
import SubLocation from "../models/subLocation.model.js";
import apiResponse from "../service/response-handler/apiResponse.js";


const addSubLocation = async (req, res) => {
    const data = req.body;


    const dateExpected = ["name", "description", "timeForVisit", "parentLocation"]
    for (let d in data) {
        console.log(d)
        if (!dateExpected.includes(d)) {
            console.log(d)
            return res.status(400).json("Bad request fields is missing")
        }
        if (data[d].trim() === "") {
            return res.status(400).json("Bad request " + data[d] + " data is missing")
        }
    }
    const existedsubLocation = await SubLocation.findOne({ name: { $eq: data.name } })
    if (existedsubLocation) {
        return res.status(409).json(
            new apiResponse("409", "false", "Sub Location is already exists")
        )
    }

        //Check parent Location Like Country
        const existedParentLcoation = await Country.findOne({
            countryName: data.parentLocation
        })
        if(!existedParentLcoation)return res.status(404).json(404, "Country Not Found")

    const savedLocation = await SubLocation.create({
        name: data.name,
        description: data.description,
        timeForVisit: data.timeForVisit,
        country: data.parentLocation._id

    })


   

    if (!savedLocation) return res.status(500).json(new apiResponse(500, false, "Unable To Save The Sub Location"))

                
        existedParentLcoation.sublocation.push(savedLocation._id)
        await existedParentLcoation.save()

    return res.status(200).json(new apiResponse(
        200,
        "Sub Location Saved Successfull",
        savedLocation
    ))
}








const addSubLocationHealthCheck = (req, res) => {
    res.send(`We you the get req and the req method is ${req.method} and the url is ${req.url}`)
}

export { addSubLocation, addSubLocationHealthCheck };