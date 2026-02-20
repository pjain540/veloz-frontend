
import { Request } from "express";
import { createOrder, deleteOrderById, findOrderById, findOrderByIdandUpdate, getLastOrder, getOrders, getTrashedOrders, restoreOrder } from "../../shared/repositories/order.repository";
import mongoose from "mongoose";
import { generateNextOrderNo } from "../../helpers/orderHelper";


export const createOrderService = async (req: Request) => {
    const body = req.body;

    if (body.customer) {
        if (!mongoose.Types.ObjectId.isValid(body.customer)) {
            throw new Error("Invalid Customer ID");
        }
        body.customer = new mongoose.Types.ObjectId(body.customer);
    }

    if (body.products && Array.isArray(body.products)) {
        body.products = body.products.map((p: any) => {
            if (!mongoose.Types.ObjectId.isValid(p.productId)) {
                throw new Error(`Invalid Product ID: ${p.productId}`);
            }
            return {
                ...p,
                productId: new mongoose.Types.ObjectId(p.productId)
            };
        });
    }

    const lastOrder = await getLastOrder();
    const lastOrderNo = lastOrder ? lastOrder.orderNo : null;
    body.orderNo = generateNextOrderNo(lastOrderNo);

    return await createOrder(body);
}

export const getOrdersService = async () => {
    return await getOrders();
}

export const getOrderByIdService = async (req: Request) => {
    const orderId = req.params as { id: string };
    if (!mongoose.Types.ObjectId.isValid(orderId.id)) {
        throw new Error("Invalid Order ID");
    }
    return await findOrderById(orderId.id);
}

export const softDeleteOrderService = async (req: Request) => {
    const orderId = req.params as { id: string };
    if (!mongoose.Types.ObjectId.isValid(orderId.id)) {
        throw new Error("Invalid Order ID");
    }
    return await findOrderByIdandUpdate(orderId.id);
}

export const getTrashedOrdersService = async () => {
    return await getTrashedOrders();
}

export const restoreOrderService = async (req: Request) => {
    const orderId = req.params as { id: string };
    if (!mongoose.Types.ObjectId.isValid(orderId.id)) {
        throw new Error("Invalid Order ID");
    }
    return await restoreOrder(orderId.id);
}

export const deleteOrderByIdService = async (req: Request) => {
    const orderId = req.params as { id: string };
    if (!mongoose.Types.ObjectId.isValid(orderId.id)) {
        throw new Error("Invalid Order ID");
    }
    return await deleteOrderById(orderId.id);
}

