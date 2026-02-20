import cloudinary from "../config/cloudinary";

const uploadToCloudinary = (file: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "veloz" },
            (error, result) => {
                if (error) return reject(error);
                resolve({ public_id: result?.public_id, url: result?.secure_url });
            }
        );
        uploadStream.end(file.buffer);
    });
};

export default uploadToCloudinary