import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { sendResponse } from "../../shared/utils/responseHandler";
import { HTTP_STATUS } from "../../config/constants";

/**
 * Generic validation middleware for Joi schemas
 * @param schema Joi schema to validate against
 * @returns middleware function
 */
export const validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false, // Include all errors in the response
            allowUnknown: true, // Allow fields not defined in the schema (e.g., timestamps)
            stripUnknown: true, // Remove fields not defined in the schema
        });

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(", ");

            return sendResponse(res, {
                statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
                success: false,
                message: errorMessage,
                data: null,
            });
        }

        next();
    };
};
