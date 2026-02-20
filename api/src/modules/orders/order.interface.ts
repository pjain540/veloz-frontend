import { Document, Types } from "mongoose";

export interface IOrder extends Document {
    orderNo: string;
    products: {
        productId: Types.ObjectId;
        quantity: number;
    }[];
    customer: Types.ObjectId;
    amount: number;
    paymentStatus: string;
    paymentMethod: string;
    transactionId: string;
    deletedAt?: Date | null;
    address: {
        pincode: string;
        houseNo: string;
        street: string;
    }
}