import { Request, Response } from "express"
import { categoryPayload, create, deleteById, findAll, findById, findBySlug, updateById } from "../../shared/repositories/category.repository"
import { createFileService } from "../files/file.service"
import { slugify } from "../../helpers/slugify"
import { AnyBulkWriteOperation } from "mongoose"
import cloudinary from "../../config/cloudinary"
import uploadToCloudinary from "../../helpers/uploadToCloudinary"

export const createCategoryService = async (req: Request, res: Response) => {
    const { name } = req.body
    if (!name) throw new Error('Name is required')
    const file = req.file

    if (!file) throw new Error('Image is required')
    const uploadedImage = await uploadToCloudinary(file);
    const slug = slugify(name)
    const categoryExists = await findBySlug(slug)
    if (categoryExists) throw new Error('Category already exists')

    const category: categoryPayload = {
        name,
        slug: slug,
        image: {
            public_id: uploadedImage.public_id,
            url: uploadedImage.url
        }
    }
    return await create(category)
}

export const getAllCategoriesService = async () => {
    return await findAll()
}

export const getCategoryByIdService = async (id: string) => {
    return await findById(id)
}

export const updateCategoryService = async (id: string, req: Request) => {
    const { name } = req.body
    if (!name) throw new Error('Name is required')

    const file = req.file
    const slug = slugify(name)

    const categoryExists = await findBySlug(slug)
    if (categoryExists && (categoryExists as any)._id.toString() !== id) {
        throw new Error('Another category with this name/slug already exists')
    }

    const categoryData: any = {
        name,
        slug: slug,
    }

    if (file) {
        const uploadedImage = await uploadToCloudinary(file)
        categoryData.image = {
            public_id: uploadedImage.public_id,
            url: uploadedImage.url
        }
    }

    return await updateById(id, categoryData)
}

export const deleteCategoryService = async (id: string) => {
    const category = await findById(id)
    if (!category) throw new Error('Category not found')
    const imageObj = category.image as any
    if (imageObj && imageObj.public_id) {
        await cloudinary.uploader.destroy(imageObj.public_id)
        console.log("Cloudinary image deleted successfully")
    }
    return await deleteById(id)
}

