import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Veloz API',
            version: '1.0.0',
            description: 'API documentation for Veloz'
        },
        servers: [
            {
                url: 'http://localhost:3001',
                name: 'Development Server'
            }
        ]
    },
    apis: ['./src/routes.ts', './src/modules/**/*.ts']
}

export const swaggerSpec = swaggerJsdoc(options)

