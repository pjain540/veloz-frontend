import { HTTP_STATUS } from "../../config/constants"
import { sendResponse } from "../../shared/utils/responseHandler"
import { deleteOrderByIdService, getOrderByIdService, getOrdersService, getTrashedOrdersService, restoreOrderService, softDeleteOrderService } from "./order.service"
import { Request, Response } from "express"

export const getOrders = async (req: Request, res: Response) => {
    try {
        const result = await getOrdersService()
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Orders fetched successfully",
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

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const result = await getOrderByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Order fetched successfully",
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

export const softDeleteById = async (req: Request, res: Response) => {
    try {
        const result = await softDeleteOrderService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Order deleted successfully",
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

export const getTrashedOrders = async (req: Request, res: Response) => {
    try {
        const result = await getTrashedOrdersService()
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Trashed orders fetched successfully",
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

export const restoreOrder = async (req: Request, res: Response) => {
    try {
        const result = await restoreOrderService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Order restored successfully",
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

export const deleteOrderByID = async (req: Request, res: Response) => {
    try {
        const result = await deleteOrderByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Order deleted successfully",
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