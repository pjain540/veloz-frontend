import express from "express"
import cors from "cors"
import path from "path"
import { swaggerSpec } from "./config/swagger"
import swaggerUi from "swagger-ui-express"
import { routeConstants } from "./config/route.constants"
import router from "./routes"

const app = express()

app.use(cors(
    {
        origin: ["*", "http://localhost:3000", "http://localhost:3002"],
        credentials: true
    }
))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(routeConstants.API_BASE.DEFAULT, router)

export default app