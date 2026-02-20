import { Request, Response } from "express"
import { createCategoryService, getAllCategoriesService } from "./category.service"
import { sendResponse } from "../../shared/utils/responseHandler"
import { HTTP_STATUS } from "../../config/constants"

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
