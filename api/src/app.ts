import express from "express"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"
import { swaggerSpec } from "./config/swagger"
import swaggerUi from "swagger-ui-express"
import { routeConstants } from "./config/route.constants"
import router from "./routes"
import webhookRouter from "./webhook.routes"

const app = express()

// app.use(cors({
//     origin: [
//         "http://localhost:3000",
//         "http://localhost:3002",
//         "https://62f7jbbq-3002.inc1.devtunnels.ms",
//         "https://62f7jbbq-3000.inc1.devtunnels.ms"
//     ],
//     credentials: true
// }));

// Mount webhook routes BEFORE express.json() for raw body access
app.use("/api", webhookRouter)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(routeConstants.API_BASE.DEFAULT, router)

export default app