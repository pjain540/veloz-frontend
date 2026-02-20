import ContactModel from "../../modules/contacts/contact.model"
import { IContact } from "../../modules/contacts/contact.interface"

export const createContact = async (data: IContact) => {
    return await ContactModel.create(data)
}

export const getContacts = async () => {
    return await ContactModel.find({ deletedAt: null }).sort({ createdAt: -1 })
}

export const getContactByIdAndTrashed = async (id: string) => {
    return await ContactModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
}

export const getAllTrashedContacts = async () => {
    return await ContactModel.find({ deletedAt: { $ne: null } }).sort({ createdAt: -1 })
}

export const restoreContact = async (id: string) => {
    return await ContactModel.findByIdAndUpdate(id, { deletedAt: null }, { new: true })
}

export const deleteContact = async (id: string) => {
    return await ContactModel.findByIdAndDelete(id)
}