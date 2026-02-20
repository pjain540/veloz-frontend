import { Document } from "mongoose";

export interface ICustomer extends Document {
    name: string;
    email: string;
    phone: string;
    address: {
        pincode: string;
        houseNo: string;
        street: string;
    }[],
    deletedAt: Date | null
}