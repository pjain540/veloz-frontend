import { sendResponse } from "../../shared/utils/responseHandler";
import { createContactService } from "./contact.service";
import { Request, Response } from "express";

export const createContactController = async (req: Request, res: Response) => {
    try {
        const result = await createContactService(req);
        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Contact created successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: "Failed to create contact",
            data: error
        })
    }
}