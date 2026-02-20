import { Document, Types } from "mongoose"

export interface IProduct extends Document {
    name: string
    slug: string
    description: string
    price: number
    salePrice: number
    cookingTime: string
    isBestseller: boolean
    isShowAtHome: boolean
    keyDetails: string
    packContain: string
    ingredients: string
    instructions: string
    nutritionalValue: string
    category: Types.ObjectId
    // type: string
    image: object
    gallery: object[]
    deletedAt?: Date | null
}
