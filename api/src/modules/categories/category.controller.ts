import { Request, Response } from "express"
import { createCategoryService, deleteCategoryService, getAllCategoriesService, getCategoryByIdService, updateCategoryService } from "./category.service"
import { sendResponse } from "../../shared/utils/responseHandler"
import { HTTP_STATUS } from "../../config/constants"

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await createCategoryService(req, res)
        return sendResponse(res, {
            success: true,
            statusCode: HTTP_STATUS.CREATED,
            message: "Category created successfully",
            data: category
        })
    } catch (error: any) {
        return sendResponse(res, {
            success: false,
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategoriesService()
        return sendResponse(res, {
            success: true,
            statusCode: HTTP_STATUS.OK,
            message: "Categories fetched successfully",
            data: categories
        })
    } catch (error: any) {
        return sendResponse(res, {
            success: false,
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string }
        const category = await getCategoryByIdService(id)
        return sendResponse(res, {
            success: true,
            statusCode: HTTP_STATUS.OK,
            message: "Category fetched successfully",
            data: category
        })
    } catch (error: any) {
        return sendResponse(res, {
            success: false,
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string }
        const category = await updateCategoryService(id, req)
        return sendResponse(res, {
            success: true,
            statusCode: HTTP_STATUS.OK,
            message: "Category updated successfully",
            data: category
        })
    } catch (error: any) {
        return sendResponse(res, {
            success: false,
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string }
        const category = await deleteCategoryService(id)
        return sendResponse(res, {
            success: true,
            statusCode: HTTP_STATUS.OK,
            message: "Category deleted successfully",
            data: category
        })
    } catch (error: any) {
        return sendResponse(res, {
            success: false,
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}
