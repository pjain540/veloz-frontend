import { Document } from "mongoose";

export interface IFile extends Document {
    originalName: string
    fileName: string
    mimeType: string
    size: number
    url: string
    deletedAt?: Date | null
}