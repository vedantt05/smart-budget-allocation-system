import mongoose from "mongoose";

const connectDatabase = async () => {
    console.log("Attempting MongoDB connection...");
    console.log("URI exists:", !!process.env.MONGODB_URI);

    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ MongoDB Connected!");
        console.log("Host:", connection.connection.host);
        console.log("Database:", connection.connection.name);

    } catch (error) {
        console.error("❌ MongoDB Error:");
        console.error(error);
        process.exit(1);
    }
};

export default connectDatabase;