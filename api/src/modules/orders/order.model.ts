import mongoose, { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
    orderNo: {
        type: String,
        required: true,
        unique: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: Number,
            _id: false
        }
    ],
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: "unpaid",
    },
    paymentMethod: {
        type: String,
        default: "stripe",
    },
    transactionId: {
        type: String,
    },
    deletedAt: {
        type: Date,
        default: null
    },
    address: {
        pincode: { type: String, required: true },
        houseNo: { type: String, required: true },
        street: { type: String, required: true }
    }
}, { timestamps: true });

export default model<IOrder>("Order", orderSchema);