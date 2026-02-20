import { Request, Response } from "express"
import { sendResponse } from "../../shared/utils/responseHandler"
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, multiDeleteProductService, multiTrashProductService, restoreProductService, trashProductByIdService, updateProductService } from "./product.service"
import { HTTP_STATUS } from "../../config/constants"

export const createProduct = async (req: Request, res: Response) => {
    try {
        const result = await createProductService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.CREATED,
            success: true,
            message: 'Product created successfully',
            data: result
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

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await getAllProductsService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Products fetched successfully',
            data: result
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

export const getProductById = async (req: Request, res: Response) => {
    try {
        const result = await getProductByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Product fetched successfully',
            data: result
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

export const updateProductById = async (req: Request, res: Response) => {
    try {
        const result = await updateProductService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Product updated successfully',
            data: result
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

export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const result = await deleteProductService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Product deleted successfully',
            data: result
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

export const trashProductById = async (req: Request, res: Response) => {
    try {
        const result = await trashProductByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Product trashed successfully',
            data: result
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

export const multiDeleteProduct = async (req: Request, res: Response) => {
    try {
        const result = await multiDeleteProductService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Products deleted successfully',
            data: result
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

export const multiTrashProduct = async (req: Request, res: Response) => {
    try {
        const result = await multiTrashProductService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Products trashed successfully',
            data: result
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

export const restoreProduct = async (req: Request, res: Response) => {
    try {
        const result = await restoreProductService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Product restored successfully',
            data: result
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
