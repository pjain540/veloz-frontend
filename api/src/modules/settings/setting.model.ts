import { model, Schema } from "mongoose";
import { ISetting } from "./setting.interface";

const settingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    value: {
        type: Object,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

export default model<ISetting>('Setting', settingSchema)