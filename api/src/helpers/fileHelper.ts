import multer from "multer"
import { storage } from "../config/cloudinary"
import path from "path"
import fs from "fs"

//checking if upload directory exists
// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, {
//         recursive: true
//     })
// }

//storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const now = new Date()
//         const year = now.getFullYear().toString()
//         const month = String(now.getMonth() + 1).padStart(2, "0")
//         const uploadPath = path.join("uploads", year, month)

//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, {
//                 recursive: true
//             })
//         }

//         cb(null, uploadPath)
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, uniqueSuffix + path.extname(file.originalname))
//     }
// })

//file filter
// const fileFilter = (req: any, file: any, cb: any) => {
//     const allowedTypes = /jpeg|jpg|png|gif|webp/
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = allowedTypes.test(file.mimetype)

//     if (extname && mimetype) {
//         return cb(null, true)
//     } else {
//         cb(new Error("Invalid file type"), false)
//     }
// }

//initialize multer
export const upload = multer({
    // storage: storage,
    storage: multer.memoryStorage(),
    // fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

//single file upload
export const uploadSingleFile = upload.single("image")

//multiple file upload
export const uploadMultipleFiles = upload.array("gallery", 5)

export const uploadProductFiles = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 5 }
])
