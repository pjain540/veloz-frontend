import { createFile } from "../../shared/repositories/file.repository"

export const createFileService = async (file: Express.Multer.File) => {
    if (!file) throw new Error('File is required')

    const fileData = {
        public_id: file.filename,
        url: file.path
    }

    // return await createFile(fileData)
    return fileData
}