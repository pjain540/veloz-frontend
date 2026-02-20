import { Request } from "express";
import mongoose from "mongoose";
import {
    createContact,
    deleteContact,
    getAllTrashedContacts,
    getContactByIdAndTrashed,
    getContacts,
    restoreContact
} from "../../shared/repositories/contact.repository";

export const createContactService = async (req: Request) => {
    return await createContact(req.body);
};

export const getContactsService = async () => {
    return await getContacts();
};

export const softDeleteContactService = async (req: Request) => {
    const { id } = req.params as { id: string };
    console.log("trashed id:", id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Contact ID");
    }
    return await getContactByIdAndTrashed(id);
};

export const getTrashedContactsService = async () => {
    return await getAllTrashedContacts();
};

export const restoreContactService = async (req: Request) => {
    const { id } = req.params as { id: string };
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Contact ID");
    }
    return await restoreContact(id);
};

export const deleteContactService = async (req: Request) => {
    const { id } = req.params as { id: string };
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Contact ID");
    }
    return await deleteContact(id);
};
