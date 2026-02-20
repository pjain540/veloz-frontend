import { Request, Response } from "express";
import { createFileService } from "./file.service";
import { sendResponse } from "../../shared/utils/responseHandler";
import { HTTP_STATUS } from "../../config/constants";

export const createFile = async (req: Request, res: Response) => {
    try {
        const file: any = req.file
        const fileData = await createFileService(file)
        return sendResponse(res, {
            success: true,
            statusCode: HTTP_STATUS.CREATED,
            message: "File uploaded successfully",
            data: fileData
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