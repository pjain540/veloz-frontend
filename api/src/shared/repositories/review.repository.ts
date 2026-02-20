import { IReview } from "../../modules/reviews/review.interface";
import ReviewModel from '../../modules/reviews/review.model'

export const createReview = async (reviewData: IReview) => {
    return await ReviewModel.create(reviewData)
}

export const getReviewsByProductId = async (productId: string) => {
    return await ReviewModel.find({ product: productId }).populate('product', 'name image')
}