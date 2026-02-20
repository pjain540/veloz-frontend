import { model, Schema, Types } from "mongoose";
import { ICategory } from "./category.interface";

const CategorySchema: Schema<ICategory> = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

export default model<ICategory>('Category', CategorySchema)