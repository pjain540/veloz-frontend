import mongoose from "mongoose"
import dns from "dns"

dns.setServers(['8.8.8.8', '1.1.1.1'])

const connectDB = async () => {
    try {
        console.log(`MongoDB connecting... ["${process.env.MONGO_URI}"]`)
        await mongoose.connect(process.env.MONGO_URI!, {
            family: 4
        })
        console.log("✅ MongoDB connected successfully!! 🚀")
    } catch (error: any) {
        console.log("❌ Error connecting mongoDB!!", error.message)
        process.exit(1)
    }
}

export default connectDB