import { Router } from "express";
import { createProduct, deleteProductById, getAllProducts, getProductById, multiDeleteProduct, multiTrashProduct, restoreProduct, trashProductById, updateProductById } from "./product.controllers";
import { routeConstants } from "../../config/route.constants";
import { uploadProductFiles } from "../../helpers/fileHelper";
import { getProductsFrontend } from "./product.frontendController";

const router = Router()

/**
 * @openapi
 * /api/product/create:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               salePrice:
 *                 type: number
 *               cookingTime:
 *                 type: string
 *               keyDetails:
 *                 type: string
 *               packContain:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               instructions:
 *                 type: string
 *               nutritionalValue:
 *                 type: string
 *               category:
 *                 type: string
 *               type:
 *                 type: string
 *               isBestseller:
 *                 type: boolean
 *               isShowAtHome:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *               gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product created successfully
 */
router.post(routeConstants.PRODUCT.CREATE, uploadProductFiles, createProduct)
/**
 * @openapi
 * /api/product/get-all:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.PRODUCT.GET_ALL, getAllProducts)
/**
 * @openapi
 * /api/product/get-by-id/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get product by ID
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
router.get(routeConstants.PRODUCT.GET_BY_ID, getProductById)
/**
 * @openapi
 * /api/product/update/{id}:
 *   put:
 *     tags:
 *       - Product
 *     summary: Update a product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               salePrice:
 *                 type: number
 *               cookingTime:
 *                 type: string
 *               keyDetails:
 *                 type: string
 *               packContain:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               instructions:
 *                 type: string
 *               nutritionalValue:
 *                 type: string
 *               category:
 *                 type: string
 *               type:
 *                 type: string
 *               isBestseller:
 *                 type: boolean
 *               isShowAtHome:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *               gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put(routeConstants.PRODUCT.UPDATE, uploadProductFiles, updateProductById)
/**
 * @openapi
 * /api/product/delete/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete a product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete(routeConstants.PRODUCT.DELETE, deleteProductById)
/**
 * @openapi
 * /api/product/trash/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Soft delete a product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product trashed successfully
 */
router.get(routeConstants.PRODUCT.TRASH, trashProductById)
/**
 * @openapi
 * /api/product/multi-delete:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Bulk delete products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Products deleted successfully
 */
router.delete(routeConstants.PRODUCT.MULTI_DELETE, multiDeleteProduct)
/**
 * @openapi
 * /api/product/multi-trash:
 *   post:
 *     tags:
 *       - Product
 *     summary: Bulk soft delete products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Products trashed successfully
 */
router.post(routeConstants.PRODUCT.MULTI_TRASH, multiTrashProduct)
/**
 * @openapi
 * /api/product/restore/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Restore a trashed product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product restored successfully
 */
router.get(routeConstants.PRODUCT.RESTORE, restoreProduct)

//frontend routes
/**
 * @openapi
 * /api/product/frontend/list:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get products with optional filters (category, search, isBestseller)
 *     parameters:
 *       - name: category
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: search
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: isBestseller
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.PRODUCT.FRONTEND.LIST, getProductsFrontend)
export default router
