import { Request } from "express";
import { IProduct } from "./product.interface";
import { createProduct, deleteProduct, findAll, findById, findByIds, findProductBySlug, findProducts, multiDeleteProduct, multiTrashProduct, restoreProduct, trashProductById, updateProduct } from "../../shared/repositories/product.repository";
import { slugify } from "../../helpers/slugify";
import mongoose from "mongoose";
import uploadToCloudinary from "../../helpers/uploadToCloudinary";
import cloudinary from "../../config/cloudinary";

export const getProductsService = async (req: Request) => {
    const { category, search, isBestseller, isTrashed, isShowAtHome, slug } = req.query;

    const filters: any = {};

    if (category) {
        filters.category = new mongoose.Types.ObjectId(category as string);
    }

    if (isTrashed === 'true') {
        filters.isTrashed = true;
    }

    if (slug) {
        filters.slug = slug;
    }

    if (isShowAtHome === 'true') {
        filters.isShowAtHome = true;
    }

    if (search) {
        filters.search = search as string;
    }

    if (isBestseller) {
        filters.isBestseller = isBestseller === 'true';
    }

    return await findProducts(filters);
}

export const getAllProductsService = async (req: Request) => {
    return await findAll()
}

export const createProductService = async (req: Request) => {
    const { name } = req.body
    let { category } = req.body
    const files = req.files as any

    if (typeof category === 'string') {
        category = new mongoose.Types.ObjectId(category)
    }

    const mainImagePromise = files?.image ? uploadToCloudinary(files.image[0]) : Promise.resolve(null);
    const galleryPromises = files?.gallery ? files.gallery.map((f: any) => uploadToCloudinary(f)) : [];
    const [mainImage, galleryImages] = await Promise.all([
        mainImagePromise,
        Promise.all(galleryPromises)
    ]);
    const slug = slugify(name)

    const existingProduct = await findProductBySlug(slug)
    if (existingProduct) {
        throw new Error('Product already exists')
    }

    const payLoad: IProduct = {
        ...req.body,
        category,
        slug,
        image: mainImage,
        gallery: galleryImages
    }

    return await createProduct(payLoad)
}

export const getProductByIdService = async (req: Request) => {
    const { id } = req.params as { id: string }
    return await findById(id)
}

export const updateProductService = async (req: Request) => {
    const { id } = req.params as { id: string }
    const { name } = req.body
    let { category } = req.body
    const files = req.files as any

    // 🔹 Get existing product first
    const existingProduct = await findById(id)
    if (!existingProduct) {
        throw new Error("Product not found")
    }

    // 🔹 Upload images
    const mainImagePromise = files?.image
        ? uploadToCloudinary(files.image[0])
        : Promise.resolve(null)

    const galleryPromises = files?.gallery
        ? files.gallery.map((f: any) => uploadToCloudinary(f))
        : []

    const [mainImage, newGalleryImages] = await Promise.all([
        mainImagePromise,
        Promise.all(galleryPromises)
    ])

    const payLoad: any = { ...req.body }

    // 🔹 Convert category
    if (category && typeof category === 'string') {
        payLoad.category = new mongoose.Types.ObjectId(category)
    }

    // 🔹 Slug logic
    if (name) {
        const slug = slugify(name)
        const existingSlugProduct = await findProductBySlug(slug)

        if (
            existingSlugProduct &&
            (existingSlugProduct as any)._id.toString() !== id
        ) {
            throw new Error('Another product with this name/slug already exists')
        }

        payLoad.slug = slug
    }

    // 🔹 Update main image only if new uploaded
    if (mainImage) {
        payLoad.image = mainImage
    }

    // 🔥 APPEND GALLERY LOGIC
    if (newGalleryImages && newGalleryImages.length > 0) {
        payLoad.gallery = [
            ...(existingProduct.gallery || []),
            ...newGalleryImages
        ]
    }

    return await updateProduct(id, payLoad)
}


export const deleteProductService = async (req: Request) => {
    const { id } = req.params as { id: string }
    const existingProduct = await findById(id)
    if (!existingProduct) throw new Error('Product not found')
    const imageObj = existingProduct.image as any
    if (imageObj && imageObj.public_id) {
        await cloudinary.uploader.destroy(imageObj.public_id)
        console.log("Cloudinary image deleted successfully")
    }
    const galleryImages = existingProduct.gallery as any
    if (galleryImages && galleryImages.length > 0) {
        await Promise.all(galleryImages.map((image: any) => cloudinary.uploader.destroy(image.public_id)))
        console.log("Cloudinary gallery images deleted successfully")
    }
    return await deleteProduct(id)
}

export const trashProductByIdService = async (req: Request) => {
    const { id } = req.params as { id: string }
    const existingProduct = await findById(id)
    if (!existingProduct) throw new Error('Product not found')
    return await trashProductById(id)
}

export const multiDeleteProductService = async (req: Request) => {
    const { ids } = req.body as { ids: string[] }
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new Error('Please provide an array of IDs')
    }

    const products = await findByIds(ids)

    const publicIdsToDelete: string[] = []

    products.forEach(product => {
        const image = product.image as any
        if (image && image.public_id) {
            publicIdsToDelete.push(image.public_id)
        }

        const gallery = product.gallery as any[]
        if (gallery && gallery.length > 0) {
            gallery.forEach((img: any) => {
                if (img.public_id) {
                    publicIdsToDelete.push(img.public_id)
                }
            })
        }
    })

    // 3. Delete from Cloudinary in parallel
    if (publicIdsToDelete.length > 0) {
        await Promise.all(publicIdsToDelete.map(id => cloudinary.uploader.destroy(id)))
        console.log(`Successfully deleted ${publicIdsToDelete.length} images from Cloudinary`)
    }

    // 4. Delete from Database
    return await multiDeleteProduct(ids)
}

export const multiTrashProductService = async (req: Request) => {
    const { ids } = req.body as { ids: string[] }
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new Error('Please provide an array of IDs')
    }
    return await multiTrashProduct(ids)
}

export const restoreProductService = async (req: Request) => {
    const { id } = req.params as { id: string }
    const existingProduct = await findById(id)
    if (!existingProduct) throw new Error('Product not found')
    return await restoreProduct(id)
}
