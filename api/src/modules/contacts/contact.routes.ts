import { Router } from "express";
import { routeConstants } from "../../config/route.constants";
import {
    deleteContact,
    getAllContacts,
    getTrashedContacts,
    restoreContact,
    soltDeletecontactById
} from "./contact.controllers";
import { createContactController } from "./contact.frontendController";

const router = Router();

/**
 * @openapi
 * /api/contact/get-all:
 *   get:
 *     tags:
 *       - Contact
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.CONTACT.GET_ALL, getAllContacts);

/**
 * @openapi
 * /api/contact/trash/{id}:
 *   get:
 *     tags:
 *       - Contact
 *     summary: Soft delete contact (Move to trash)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact moved to trash successfully
 */
router.get(routeConstants.CONTACT.TRASH, soltDeletecontactById);

/**
 * @openapi
 * /api/contact/trashed:
 *   get:
 *     tags:
 *       - Contact
 *     summary: Get all trashed contacts
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get(routeConstants.CONTACT.TRASHED, getTrashedContacts);

/**
 * @openapi
 * /api/contact/restore/{id}:
 *   get:
 *     tags:
 *       - Contact
 *     summary: Restore a trashed contact
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact restored successfully
 */
router.get(routeConstants.CONTACT.RESTORE, restoreContact);

/**
 * @openapi
 * /api/contact/delete/{id}:
 *   delete:
 *     tags:
 *       - Contact
 *     summary: Permanently delete a contact
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted permanently
 */
router.delete(routeConstants.CONTACT.DELETE, deleteContact);

// Frontend Routes
/**
 * @openapi
 * /api/contact/create:
 *   post:
 *     tags:
 *       - Contact
 *     summary: Create a new contact (Frontend)
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
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 */
router.post(routeConstants.CONTACT.FRONTEND.CREATE, createContactController);

export default router;
