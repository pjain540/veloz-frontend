import OrderModel from '../../modules/orders/order.model';
import { IOrder } from '../../modules/orders/order.interface';

export const createOrder = async (orderData: Partial<IOrder>): Promise<IOrder> => {
    return await OrderModel.create(orderData);
}

export const getOrders = async () => {
    return await OrderModel.find({ deletedAt: null }).populate("customer", "name email phone").populate({
        path: "products.productId",
        select: "name image price salePrice",
        populate: {
            path: "category",
            select: "name"
        }
    }).sort({ createdAt: -1 });
}

export const findOrderById = async (orderId: string) => {
    return await OrderModel.findById(orderId).populate("customer", "name email phone").populate({
        path: "products.productId",
        populate: {
            path: "category",
        }
    });
}

export const findOrderByIdandUpdate = async (orderId: string) => {
    return await OrderModel.findByIdAndUpdate(orderId, { deletedAt: new Date() }, { new: true });
}

export const getLastOrder = async () => {
    return await OrderModel.findOne().sort({ createdAt: -1 });
}

export const restoreOrder = async (orderId: string) => {
    return await OrderModel.findByIdAndUpdate(orderId, { deletedAt: null }, { new: true });
}

export const getTrashedOrders = async () => {
    return await OrderModel.find({ deletedAt: { $ne: null } }).populate("customer", "name email phone").populate({
        path: "products.productId",
        select: "name image price salePrice",
        populate: {
            path: "category",
            select: "name"
        }
    }).sort({ createdAt: -1 });
}

export const deleteOrderById = async (orderId: string) => {
    return await OrderModel.findByIdAndDelete(orderId)
}

