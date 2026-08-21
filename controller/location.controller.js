import Country from "../models/location.model.js"
import apiResponse from "../service/response-handler/apiResponse.js"
import errorResponse from "../service/response-handler/errorResponse.js"


const addCountry = async (req, res)=>{
    const alldata = req.body

    const reqStaticData = ["countryName", "discription", "continent", "currency", "climate", "peakSeason", "capitalCity", "largestCity", "products"]

    //Check if the data is sending correctly.
    for(let v in alldata){
        const value = alldata[v]
        if(!reqStaticData.includes(v)){
            console.log(v)
            return res.status(400).json("Bad request " + v + " field is missing" )
        }
        if(value === null || value === undefined || (typeof value === "string" && value.trim()== "") || (Array.isArray(value) && value.length === 0)){
            console.log(v + " part two  ")
            return res.status(400).json("Bad request " +  "data is messing in the field " + v )
        }
    }

    const existedCountry = await Country.findOne({countryName: {$eq : alldata.countryName}})
    if(existedCountry)return res.status(409).json(new errorResponse (409, `Country already existed with name ${alldata.countryName}`))
        const savedCountry = await Country.create({
            countryName : alldata.countryName,
            discription: alldata.discription, 
            continent: alldata.continent, 
            currency: alldata.currency, 
            climate: alldata.climate, 
            peakSeason: alldata.peakSeason, 
            capitalCity: alldata.capitalCity, 
            largestCity: alldata.largestCity, 
            products: alldata.products
        })

        if(!savedCountry)return res.send(500).json(new errorResponse(500, "Not able to save the country"))
    return res.status(200).json(new apiResponse(200, "Country saved succesfully", savedCountry ))
}
 
export default addCountry;