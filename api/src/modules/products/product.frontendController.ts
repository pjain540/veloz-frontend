import { Request, Response } from "express"
import { getProductsService } from "./product.service"
import { sendResponse } from "../../shared/utils/responseHandler"
import { HTTP_STATUS } from "../../config/constants"

export const getProductsFrontend = async (req: Request, res: Response) => {
    try {
        const products = await getProductsService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Products fetched successfully',
            data: products
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        })
    }
}
