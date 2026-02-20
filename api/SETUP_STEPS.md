# Project Setup Steps: Node.js with TypeScript

This file documents the steps taken to set up the `veloz-api` project.

## 1. Project Initialization
Initialized the Node.js environment:
```powershell
npm init -y
```

## 2. Dependency Installation
Installed TypeScript and related development tools:
- `typescript`: The core TypeScript compiler.
- `ts-node`: Execution engine for TypeScript on Node.js.
- `@types/node`: Type definitions for Node.js APIs.
- `tsx`: A faster alternative for running TypeScript files during development.

```powershell
npm install -D typescript ts-node @types/node tsx
```

## 3. TypeScript Configuration
Generated and configured `tsconfig.json`:
```powershell
npx tsc --init --rootDir src --outDir dist --esModuleInterop --module commonjs --target es2020 --moduleResolution node --sourceMap true --declaration true
```

## 4. Project Structure
Created the source directory and initial entry point:
- `src/`: Directory for source code.
- `src/index.ts`: The main entry point.

## 5. Scripts Configuration
Added the following scripts to `package.json`:
- `dev`: Runs the app in development mode using `tsx`.
- `build`: Compiles TypeScript to JavaScript in the `dist/` folder.
- `start`: Runs the compiled JavaScript from the `dist/` folder.

## 7. Additional Dependencies
Added key web development and utility packages:
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `mongoose`: MongoDB object modeling tool.
- `joi`: Data validation library.
- `dotenv`: Loads environment variables from a `.env` file.
- `cors`: Middleware for Cross-Origin Resource Sharing.
- `multer`: Middleware for handling `multipart/form-data` (file uploads).
- `swagger-ui-express` & `swagger-jsdoc`: Tools for serving auto-generated Swagger documentation.
- `nodemon`: Monitor for any changes in your source and automatically restart your server.

```powershell
npm install express mongoose joi dotenv cors multer swagger-ui-express swagger-jsdoc
npm install -D @types/express @types/cors @types/multer @types/swagger-ui-express @types/swagger-jsdoc nodemon
```

## 8. Development Workflow with Nodemon
The project is configured to use `tsx` for fast development, but you can also use `nodemon` for monitoring changes.

## 9. How to Run
- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Production**: `npm start`
