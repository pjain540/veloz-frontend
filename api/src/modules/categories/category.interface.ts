import { Document, Types } from "mongoose";

export interface ICategory extends Document {
    name: string
    slug: string
    image: object
    deletedAt?: Date | null
}