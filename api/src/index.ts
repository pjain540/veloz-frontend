import dotenv from "dotenv"
dotenv.config()

import app from "./app";
import connectDB from "./config/db";

const port = process.env.PORT

const startServer = async () => {
    await connectDB()
    app.listen(port, () => console.log(`Server is running on port ${port}`))
}

startServer()
