import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "./category.controller";
import { routeConstants } from "../../config/route.constants";
import { uploadSingleFile } from "../../helpers/fileHelper";

const router = Router()

/**
 * @openapi
 * /api/category/create:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Category created successfully
 */
router.post(routeConstants.CATEGORY.CREATE, uploadSingleFile, createCategory)
/**
 * @openapi
 * /api/category/get-all:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.CATEGORY.GET_ALL, getAllCategories)
/**
 * @openapi
 * /api/category/get-by-id/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get category by ID
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
router.get(routeConstants.CATEGORY.GET_BY_ID, getCategoryById)
/**
 * @openapi
 * /api/category/update/{id}:
 *   put:
 *     tags:
 *       - Category
 *     summary: Update a category
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
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put(routeConstants.CATEGORY.UPDATE, uploadSingleFile, updateCategory)
/**
 * @openapi
 * /api/category/delete/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Delete a category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
router.get(routeConstants.CATEGORY.DELETE, deleteCategory)

//frontend routes
router.get(routeConstants.CATEGORY.FRONTEND.GET_ALL, getAllCategories)
/* #swagger.path = '/api/category/frontend/get-all'
   #swagger.method = 'get'
   #swagger.tags = ['Category'] */

export default router