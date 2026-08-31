import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(

    {
        countryName: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String
        },
        continent: {
            type: String,
            required: true,
            enum: ["Asia", "Europe", "Africa", "North America", "South America", "Australia", "Antarctica"],
        },
        currency: {
            type: String,
            required: true
        },
        climate: {
            type: String,
            enum: [
                "tropical",
                "dry",
                "temperate",
                "continental",
                "polar",
                "mediterranean",
                "arid",
                "semi-arid",
                "subtropical",
                "oceanic",
                "alpine"
            ],
            required: true
        },
        peakSeason: {
            type: [String],
            enum: [
                "spring",
                "summer",
                "autumn",
                "winter"
            ]
        }
        ,
        capitalCity: {
            type: String,
            required: true
        },
        largestCity: {
            type: String
        },
         images: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
         }
        ,
        guides: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        products: {   //Pending this well add in the next step
            type: String
        }
        ,
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },


    }
    , { timeStamps: true })

    const Country = mongoose.model("Country", countrySchema)

    export default Country


    