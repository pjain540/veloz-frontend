import { Request, Response } from "express"
import { sendResponse } from "../../shared/utils/responseHandler"
import { createSettingService, getAllSettingsService, getSettingBySlugService, updateSettingBySlugService } from "./setting.service"

export const createSettingController = async (req: Request, res: Response) => {
    try {
        const setting = await createSettingService(req)
        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Setting created successfully",
            data: setting
        })
    } catch (error: any) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: error.message,
            data: null
        })
    }
}

export const getSettingBySlugController = async (req: Request, res: Response) => {
    try {
        const setting = await getSettingBySlugService(req)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Setting fetched successfully",
            data: setting
        })
    } catch (error: any) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: error.message,
            data: null
        })
    }
}

export const updateSettingBySlugController = async (req: Request, res: Response) => {
    try {
        const setting = await updateSettingBySlugService(req)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Setting updated successfully",
            data: setting
        })
    } catch (error: any) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: error.message,
            data: null
        })
    }
}

export const getAllSettingsController = async (req: Request, res: Response) => {
    try {
        const settings = await getAllSettingsService()
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Settings fetched successfully",
            data: settings
        })
    } catch (error: any) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: error.message,
            data: null
        })
    }
}