import mongoose from "mongoose";


const DBconnect = async()=>{
    try {
        const connectionRef  = await mongoose.connect(process.env.MONGODBURI)
         console.log(process.env.MONGODBURI)
        // console.log(connectionRef )
        console.log("DB is connected succesfully")

    } catch (error) {
        console.log(`Name of the error is ${error.name} and message is ${error.message}`);
    }
}

export default DBconnect;