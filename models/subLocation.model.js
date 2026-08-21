import mongoose from "mongoose"

const SubLocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }, country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country"
    }, timeForVisit: {
        type: String
    }, Guides: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guide"
    }, images: {
        type: String

    }, business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "business" //For Location  Businesses
    }

}, { timestamps: true }) 

const SubLocation = new mongoose.model("SubLocation", SubLocationSchema)

export default SubLocation;