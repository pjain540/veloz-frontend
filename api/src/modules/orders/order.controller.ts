import { HTTP_STATUS } from "../../config/constants"
import { stripe } from "../../config/stripe"
import { sendResponse } from "../../shared/utils/responseHandler"
import { deleteOrderByIdService, getByOrderIdQueryParamsService, getOrderByIdService, getOrdersService, getTrashedOrdersService, restoreOrderService, softDeleteOrderService } from "./order.service"
import { Request, Response } from "express"
import Stripe from "stripe"
import orderModel from "./order.model"

export const getOrders = async (req: Request, res: Response) => {
    try {
        const result = await getOrdersService()
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Orders fetched successfully",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        })
    }
}

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const result = await getOrderByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Order fetched successfully",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        })
    }
}

export const softDeleteById = async (req: Request, res: Response) => {
    try {
        const result = await softDeleteOrderService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Order deleted successfully",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        })
    }
}

export const getTrashedOrders = async (req: Request, res: Response) => {
    try {
        const result = await getTrashedOrdersService()
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Trashed orders fetched successfully",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        })
    }
}

export const restoreOrder = async (req: Request, res: Response) => {
    try {
        const result = await restoreOrderService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Order restored successfully",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        })
    }
}

export const deleteOrderByID = async (req: Request, res: Response) => {
    try {
        const result = await deleteOrderByIdService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Order deleted successfully",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        })
    }
}

export const getOrderByIdQueryParams = async (req: Request, res: Response) => {
    try {
        const result = await getByOrderIdQueryParamsService(req)
        sendResponse(res, {
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Order fetched successfully",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        })
    }
}

export const handleStripeWebhook = async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (error: any) {
        console.error("❌ Webhook signature verification failed:", error.message);
        return sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        })
    }
    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

                const orderId = session.metadata?.orderId;

                if (!orderId) {
                    console.error("❌ No orderId found in metadata");
                    break;
                }
                const order = await orderModel.findById(orderId);

                if (!order) {
                    console.error("❌ Order not found:", orderId);
                    break;
                }

                // 🛡 Prevent double updates (idempotency safety)
                if (order.paymentStatus === "paid") {
                    console.log("⚠ Order already marked as paid:", orderId);
                    break;
                }
                order.paymentStatus = "paid";
                order.stripeSessionId = session.id;

                await order.save();

                console.log("✅ Payment successful for order:", orderId);
                break;
            }
            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;

                await orderModel.findOneAndUpdate(
                    { paymentIntentId: paymentIntent.id },
                    { paymentStatus: "failed" }
                );

                console.log("❌ Payment failed:", paymentIntent.id);
                break;
            }
            default:
                console.log(`ℹ Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (error: any) {
        console.error("❌ Webhook handling error:", error.message);
        sendResponse(res, {
            statusCode: HTTP_STATUS.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null
        })
    }

}
