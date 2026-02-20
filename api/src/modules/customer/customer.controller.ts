import { Request, Response } from "express";
import { deleteCustomerByIdService, deleteMultipleCustomersByIdService, findAllCustomersService, findCustomerByIdService, getTrashedCustomersService, restoreCustomerByIdService, softDeleteCustomerByIdService, softDeleteMultipleCustomersByIdService, updateCustomerByIdService } from "./customer.service";
import { sendResponse } from "../../shared/utils/responseHandler";
import { HTTP_STATUS } from "../../config/constants";

export const findAllCustomer = async (req: Request, res: Response) => {
    try {
        const result = await findAllCustomersService()
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Customers fetched successfully",
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

export const findCustomerById = async (req: Request, res: Response) => {
    try {
        const result = await findCustomerByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Customer fetched successfully",
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

export const updateCustomerById = async (req: Request, res: Response) => {
    try {
        const result = await updateCustomerByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Customer updated successfully",
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

export const deleteCustomerById = async (req: Request, res: Response) => {
    try {
        const result = await deleteCustomerByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Customer deleted successfully",
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

export const deleteMultipleCustomersById = async (req: Request, res: Response) => {
    try {
        const result = await deleteMultipleCustomersByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Customers deleted successfully",
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

export const softDeleteCustomerById = async (req: Request, res: Response) => {
    try {
        const result = await softDeleteCustomerByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Customer deleted successfully",
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

export const softDeleteMultipleCustomersById = async (req: Request, res: Response) => {
    try {
        const result = await softDeleteMultipleCustomersByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Customers deleted successfully",
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

export const restoreCustomerById = async (req: Request, res: Response) => {
    try {
        const result = await restoreCustomerByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Customer restored successfully",
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

export const getTrashedCustomers = async (req: Request, res: Response) => {
    try {
        const result = await getTrashedCustomersService()
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Trashed customers fetched successfully",
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

