import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/modules/users/user.model";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/veloz");

        const adminExists = await User.findOne({ email: "admin@veloz.com" });
        if (!adminExists) {
            await User.create({
                email: "admin@veloz.com",
                password: "password123",
                role: "admin",
            });
            console.log("Admin generated: admin@veloz.com / password123");
        } else {
            console.log("Admin already exists.");
        }
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
