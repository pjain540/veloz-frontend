import { sendResponse } from "../../shared/utils/responseHandler";
import { deleteContactService, getContactsService, getTrashedContactsService, restoreContactService, softDeleteContactService } from "./contact.service";
import { Request, Response } from "express";

export const getAllContacts = async (req: Request, res: Response) => {
    try {
        const result = await getContactsService();
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Contacts fetched successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: "Failed to fetch contacts",
            data: error
        })
    }
}

export const soltDeletecontactById = async (req: Request, res: Response) => {
    try {
        const result = await softDeleteContactService(req);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Contact deleted successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: "Failed to delete contact",
            data: error
        })
    }
}

export const getTrashedContacts = async (req: Request, res: Response) => {
    try {
        const result = await getTrashedContactsService();
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Trashed contacts fetched successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: "Failed to fetch trashed contacts",
            data: error
        })
    }
}

export const restoreContact = async (req: Request, res: Response) => {
    try {
        const result = await restoreContactService(req);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Contact restored successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: "Failed to restore contact",
            data: error
        })
    }
}

export const deleteContact = async (req: Request, res: Response) => {
    try {
        const result = await deleteContactService(req);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Contact deleted successfully",
            data: result
        })
    } catch (error) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: "Failed to delete contact",
            data: error
        })
    }
}