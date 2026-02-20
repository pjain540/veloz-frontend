import { Router } from "express";
import { createReviewController, getReviewsByProductIdController } from "./review.controller";
import { routeConstants } from "../../config/route.constants";

const router = Router()

/**
 * @openapi
 * /api/review/create:
 *   post:
 *     tags:
 *       - Review
 *     summary: Create a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               message:
 *                 type: string
 *               product:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Review created successfully
 */
router.post(routeConstants.REVIEW.FRONTEND.CREATE, createReviewController)

/**
 * @openapi
 * /api/review/get-by-product-id/{id}:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get reviews by product ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.REVIEW.FRONTEND.GET_BY_PRODUCT_ID, getReviewsByProductIdController)

export default router
