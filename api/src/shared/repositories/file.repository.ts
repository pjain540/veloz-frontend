import FileModel from "../../modules/files/file.model";

interface createFileModelPayload {
    originalName: string
    fileName: string
    mimeType: string
    size: number
    url: string
}

export const createFile = async (payload: createFileModelPayload) => {
    return await FileModel.create(payload)
}