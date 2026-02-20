import { Request, Response } from "express";
import { HTTP_STATUS } from "../../config/constants";
import { sendResponse } from "../../shared/utils/responseHandler";
import { createOrderService } from "./order.service";

export const createOrderController = async (req: Request, res: Response) => {
    try {
        const order = await createOrderService(req);
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Order created successfully',
            data: order
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