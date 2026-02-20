import { model, Schema } from "mongoose";
import { IFile } from "./file.interface";

const FileSchema: Schema<IFile> = new Schema({
    originalName: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

export default model<IFile>('File', FileSchema)