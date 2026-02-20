import swaggerAutogen from "swagger-autogen"
import path from "path"

const doc = {
    info: {
        title: "Veloz API",
        description: "API documentation for Veloz"
    },
    host: "localhost:3001",
    schemes: ["http", "https"]
}

const outputFile = path.join(process.cwd(), "swagger-output.json")
const endpointsFiles = [
    path.resolve(__dirname, "../app.ts"),
    path.resolve(__dirname, "../routes.ts"),
    path.resolve(__dirname, "../modules/**/*.routes.ts") // Focus on route files
]

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    console.log("Swagger output file has been generated")
})