import { Request } from "express";
import mongoose from "mongoose";
import { createReview, getReviewsByProductId } from "../../shared/repositories/review.repository";

export const createReviewService = async (req: Request) => {
    const body = req.body
    if (!body.name || !body.message || !body.product || !body.rating) {
        throw new Error('All fields are required')
    }
    if (!mongoose.Types.ObjectId.isValid(body.product)) {
        throw new Error('Invalid product ID')
    }
    if (typeof body.product == 'string') {
        body.product = new mongoose.Types.ObjectId(body.product)
    }
    return await createReview(body)
}

export const getReviewsByProductIdService = async (req: Request) => {
    const { id } = req.params as { id: string }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid product ID')
    }
    return await getReviewsByProductId(id)
}