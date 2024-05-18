import mongoose from "mongoose";

const connectToMongo = async () => {
    try {
        const connectionOfMongo = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB has been connetced sucessfully");
    } catch (error) {
        console.log("Error is in MOngoDB connection : ", error);
    }
}

export default connectToMongo;