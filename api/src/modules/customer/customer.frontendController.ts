import { Request, Response } from "express"
import { HTTP_STATUS } from "../../config/constants"
import { sendResponse } from "../../shared/utils/responseHandler"
import { CreateCustomerService } from "./customer.service"

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const result = await CreateCustomerService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.CREATED,
            success: true,
            message: "Customer created successfully",
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