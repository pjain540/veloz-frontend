import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

cloudinary.config({
    cloud_name: "dnltcccie",
    api_key: "165562846535981",
    api_secret: "KIsxfzm9rkwrIDQcDZvdnRMhu60"
})

export const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: 'veloz',
            allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
            resource_type: 'auto',
            public_id: Date.now() + '-' + file.originalname.split('.')[0],
        }
    }
})

export default cloudinary