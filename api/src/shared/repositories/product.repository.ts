import ProductModel from "../../modules/products/product.model"
import { IProduct } from "../../modules/products/product.interface"
import mongoose from "mongoose"

export const createProduct = async (payload: IProduct): Promise<IProduct> => {
    return await ProductModel.create(payload)
}

export const findProductBySlug = async (slug: string): Promise<IProduct | null> => {
    return await ProductModel.findOne({ slug })
}

export const findAll = async () => {
    return await ProductModel.find({ deletedAt: null }).populate('category', 'name').sort({ createdAt: -1 })
}

export const findById = async (id: string) => {
    return await ProductModel.findById(id).populate('category', 'name')
}

export const updateProduct = async (id: string, payload: IProduct) => {
    return await ProductModel.findByIdAndUpdate(id, payload, { new: true })
}

export const deleteProduct = async (id: string) => {
    return await ProductModel.findByIdAndDelete(id)
}

export const trashProductById = async (id: string) => {
    return await ProductModel.findByIdAndUpdate(id, { deletedAt: new Date() })
}

export const multiDeleteProduct = async (ids: string[]) => {
    return await ProductModel.deleteMany({ _id: { $in: ids } })
}

export const findByIds = async (ids: string[]) => {
    return await ProductModel.find({ _id: { $in: ids } })
}

export const multiTrashProduct = async (ids: string[]) => {
    return await ProductModel.updateMany({ _id: { $in: ids } }, { deletedAt: new Date() })
}

export const restoreProduct = async (id: string) => {
    return await ProductModel.findByIdAndUpdate(id, { deletedAt: null })
}

export const findProducts = async (filters: any) => {
    const query: any = {};

    if (filters.isTrashed) {
        query.deletedAt = { $ne: null };
    } else {
        query.deletedAt = null;
    }

    if (filters.category) {
        query.category = filters.category;
    }

    if (filters.slug) {
        query.slug = filters.slug;
    }

    if (filters.isShowAtHome) {
        query.isShowAtHome = filters.isShowAtHome;
    }

    if (filters.search) {
        query.name = { $regex: filters.search, $options: 'i' };
    }

    if (filters.isBestseller !== undefined) {
        query.isBestseller = filters.isBestseller;
    }

    return await ProductModel.find(query)
        .populate('category', 'name')
        .sort({ createdAt: -1 });
}

export const showTrashedProduct = async () => {
    return await ProductModel.find({ deletedAt: { $ne: null } }).sort({ createdAt: -1 })
}
