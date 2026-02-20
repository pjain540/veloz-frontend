import { model, Schema } from "mongoose";
import { ICustomer } from "./customer.interface";

const customerSchema = new Schema<ICustomer>({
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
    address: [
        {
            _id: false,
            pincode: { type: String, required: true },
            houseNo: { type: String, required: true },
            street: { type: String, required: true },
        }
    ],
    deletedAt: {
        type: Date,
        default: null
    }

}, { timestamps: true })

export default model<ICustomer>('Customer', customerSchema)