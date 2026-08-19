import mongoose from "mongoose";

const imageSchecma = new mongoose.Schema({
    imageDiscription:{
        type: String,
        required: true
    },
    path:{
        type: String,
        requied: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timeStamps: true})

const Image = mongoose.model("Image", imageSchecma)

export default imageSchecma;