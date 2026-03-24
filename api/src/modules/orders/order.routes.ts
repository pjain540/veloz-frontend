import { Router } from "express";
import { createOrderController } from "./order.frontendController";
import { routeConstants } from "../../config/route.constants";
import { deleteOrderByID, getOrderById, getOrderByIdQueryParams, getOrders, getTrashedOrders, restoreOrder, softDeleteById } from "./order.controller";

const router = Router();


/**
 * @openapi
 * /api/order/get-all:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.ORDER.GET_ALL, getOrders);

/**
 * @openapi
 * /api/order/get-by-id:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get order by ID
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.ORDER.GET_BY_ID, getOrderById);

/**
 * @openapi
 * /api/order/trash:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get trashed orders
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.ORDER.TRASH, softDeleteById)

/**
 * @openapi
 * /api/order/trashed:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get trashed orders
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.ORDER.TRASHED, getTrashedOrders)

/**
 * @openapi
 * /api/order/restore:
 *   get:
 *     tags:
 *       - Order
 *     summary: Restore order
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.ORDER.RESTORE, restoreOrder)

router.delete(routeConstants.ORDER.DELETE, deleteOrderByID)

router.get(routeConstants.ORDER.GET_BY_ID_QUERY_PARAMS, getOrderByIdQueryParams)

//frontend
/**
 * @openapi
 * /api/order/create:
 *   post:
 *     tags:
 *       - Order
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderNo:
 *                 type: string
 *               customer:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               amount:
 *                 type: number
 *               paymentStatus:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               transactionId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post(routeConstants.ORDER.FRONTEND.CREATE, createOrderController);


export default router;

