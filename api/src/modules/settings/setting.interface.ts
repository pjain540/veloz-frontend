import { Document } from "mongoose";

export interface ISetting extends Document {
    name: String,
    slug: String,
    value: Object,
    deletedAt: Date | null
}