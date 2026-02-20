import { Router } from "express";
import { routeConstants } from "../../config/route.constants";
import { createCustomer } from "./customer.frontendController";
import { validate } from "../../common/middlewares.ts/validate.middleware";
import { createCustomerValidation, updateCustomerValidation } from "../../common/validations/customer.validation";
import { deleteCustomerById, deleteMultipleCustomersById, findAllCustomer, findCustomerById, getTrashedCustomers, restoreCustomerById, softDeleteCustomerById, softDeleteMultipleCustomersById, updateCustomerById } from "./customer.controller";

const router = Router();

/**
 * @openapi
 * /api/customer/get-all:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.CUSTOMER.GET_ALL, findAllCustomer);
/**
 * @openapi
 * /api/customer/get-by-id/{id}:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get customer by ID
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
router.get(routeConstants.CUSTOMER.GET_BY_ID, findCustomerById);
/**
 * @openapi
 * /api/customer/update/{id}:
 *   put:
 *     tags:
 *       - Customer
 *     summary: Update a customer
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     pincode:
 *                       type: string
 *                     houseNo:
 *                       type: string
 *                     street:
 *                       type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 */
router.put(routeConstants.CUSTOMER.UPDATE, validate(updateCustomerValidation), updateCustomerById);
/**
 * @openapi
 * /api/customer/delete/{id}:
 *   delete:
 *     tags:
 *       - Customer
 *     summary: Delete a customer
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 */
router.delete(routeConstants.CUSTOMER.DELETE, deleteCustomerById);
/**
 * @openapi
 * /api/customer/multi-delete:
 *   post:
 *     tags:
 *       - Customer
 *     summary: Delete multiple customers
 *     parameters:
 *       - name: ids
 *         in: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *     responses:
 *       200:
 *         description: Customers deleted successfully
 */
router.post(routeConstants.CUSTOMER.MULTI_DELETE, deleteMultipleCustomersById);

/**
 * @openapi
 * /api/customer/trash/{id}:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Soft delete a customer
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 */
router.get(routeConstants.CUSTOMER.TRASH, softDeleteCustomerById);

/**
 * @openapi
 * /api/customer/multi-trash:
 *   post:
 *     tags:
 *       - Customer
 *     summary: Soft delete multiple customers
 *     parameters:
 *       - name: ids
 *         in: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *     responses:
 *       200:
 *         description: Customers deleted successfully
 */
router.post(routeConstants.CUSTOMER.MULTI_TRASH, softDeleteMultipleCustomersById);

/**
 * @openapi
 * /api/customer/restore/{id}:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Restore a customer
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer restored successfully
 */
router.get(routeConstants.CUSTOMER.RESTORE, restoreCustomerById);

/**
 * @openapi
 * /api/customer/trashed:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get all trashed customers
 *     responses:
 *       200:
 *         description: Trashed customers fetched successfully
 */
router.get(routeConstants.CUSTOMER.TRASHED, getTrashedCustomers);
//frontend
/**
 * @openapi
 * /api/customer/create:
 *   post:
 *     tags:
 *       - Customer
 *     summary: Create a new customer or add address to existing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     pincode:
 *                       type: string
 *                     houseNo:
 *                       type: string
 *                     street:
 *                       type: string
 *     responses:
 *       201:
 *         description: Customer created/updated successfully
 */
router.post(routeConstants.CUSTOMER.FRONTEND.CREATE, validate(createCustomerValidation), createCustomer);


export default router;
