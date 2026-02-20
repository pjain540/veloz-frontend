import { model, Schema } from "mongoose"
import { IProduct } from "./product.interface"

const ProductSchema: Schema<IProduct> = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    cookingTime: {
        type: String,
        required: true
    },
    isBestseller: {
        type: Boolean,
        default: false
    },
    isShowAtHome: {
        type: Boolean,
        default: false
    },
    keyDetails: {
        type: String,
        required: true
    },
    packContain: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    nutritionalValue: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    // type: {
    //     type: String,
    //     required: true
    // },
    image: {
        type: Object,
        required: true
    },
    gallery: {
        type: [Schema.Types.Mixed],
        default: [],
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

export default model<IProduct>('Product', ProductSchema)