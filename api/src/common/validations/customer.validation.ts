import Joi from "joi";

export const createCustomerValidation = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name cannot exceed 20 characters',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email',
    }),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Phone number must be exactly 10 digits'
        }),
    address: Joi.array().items(
        Joi.object({
            pincode: Joi.string().required().messages({
                'string.empty': 'Pincode is required',
            }),
            houseNo: Joi.string().required().messages({
                'string.empty': 'House number is required',
            }),
            street: Joi.string().required().messages({
                'string.empty': 'Street is required',
            }),
        })
    ).min(1).required().messages({
        'array.min': 'At least one address is required',
    }),
});


export const updateCustomerValidation = Joi.object({
    name: Joi.string().min(3).max(20).optional().messages({
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name cannot exceed 20 characters',
    }),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    address: Joi.array().items(
        Joi.object({
            pincode: Joi.string().optional(),
            houseNo: Joi.string().optional(),
            street: Joi.string().optional(),
        })
    ).optional(),
});
