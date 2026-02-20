import { model, Schema } from "mongoose";
import { IContact } from "./contact.interface";

const ContactSchema = new Schema<IContact>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

export default model<IContact>("Contact", ContactSchema)
