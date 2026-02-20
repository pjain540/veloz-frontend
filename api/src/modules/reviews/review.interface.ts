import { Document, Types } from "mongoose";

export interface IReview extends Document {
    name: string;
    message: string;
    product: Types.ObjectId;
    rating: number;
    deletedAt: Date | null;
}