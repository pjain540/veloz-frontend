import { Request, Response } from "express";
import { createReviewService, getReviewsByProductIdService } from "./review.service";
import { sendResponse } from "../../shared/utils/responseHandler";

export const createReviewController = async (req: Request, res: Response) => {
    try {
        const review = await createReviewService(req)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Review created successfully',
            data: review
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

export const getReviewsByProductIdController = async (req: Request, res: Response) => {
    try {
        const reviews = await getReviewsByProductIdService(req)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Reviews fetched successfully',
            data: reviews
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