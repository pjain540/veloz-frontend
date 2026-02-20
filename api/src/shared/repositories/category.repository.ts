import { Types } from "mongoose";
import CategoryModel from "../../modules/categories/category.model";

export interface categoryPayload {
    name: string
    slug: string
    image: object
}

export const create = async (category: categoryPayload) => {
    return await CategoryModel.create(category)
}

export const findBySlug = async (slug: string) => {
    return await CategoryModel.findOne({ slug })
}

export const findAll = async () => {
    return await CategoryModel.find({ deletedAt: null }).sort({ createdAt: -1 })
}

export const findById = async (id: string) => {
    return await CategoryModel.findById(id)
}

export const updateById = async (id: string, category: categoryPayload) => {
    return await CategoryModel.findByIdAndUpdate(id, category, { new: true })
}

export const deleteById = async (id: string) => {
    return await CategoryModel.findByIdAndDelete(id)
}



