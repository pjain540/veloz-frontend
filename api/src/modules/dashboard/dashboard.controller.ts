import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/responseHandler";
import { HTTP_STATUS } from "../../config/constants";
import Product from "../products/product.model";
import Order from "../orders/order.model";
import Contact from "../contacts/contact.model";
import Customer from "../customer/customer.model";

export const getCounts = async (req: Request, res: Response) => {
    try {
        const [productCount, orderCount, contactCount, customerCount] = await Promise.all([
            Product.countDocuments({ deletedAt: null }),
            Order.countDocuments({ deletedAt: null }),
            Contact.countDocuments({ deletedAt: null }),
            Customer.countDocuments({ deletedAt: null })
        ]);

        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Dashboard counts fetched successfully',
            data: {
                productCounts: productCount,
                orderCounts: orderCount,
                contactCounts: contactCount,
                customerCounts: customerCount
            }
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        });
    }
};

export const getRecentOrders = async (req: Request, res: Response) => {
    try {
        const recentOrders = await Order.find({ deletedAt: null })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('customer');

        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: 'Recent orders fetched successfully',
            data: recentOrders
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        });
    }
};
