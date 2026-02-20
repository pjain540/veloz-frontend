import { Request, Response } from "express";
import { createCustomer, deleteCustomerById, deleteMultipleCustomersById, findAllCustomers, findCustomerByEmail, findCustomerById, getTrashedCustomers, restoreCustomerById, softDeleteCustomerById, softDeleteMultipleCustomersById, updateCustomerById } from "../../shared/repositories/customer.repository";
import mongoose from "mongoose";

export const CreateCustomerService = async (req: Request) => {
    const body = req.body
    const { email, address: incomingAddresses } = body

    const existingCustomer = await findCustomerByEmail(email)

    if (existingCustomer) {
        // Filter out addresses that already exist in the customer's record
        const newAddresses = incomingAddresses.filter((newAddr: any) => {
            return !existingCustomer.address.some((existingAddr: any) =>
                existingAddr.pincode === newAddr.pincode &&
                existingAddr.houseNo === newAddr.houseNo &&
                existingAddr.street === newAddr.street
            )
        })

        if (newAddresses.length > 0) {
            // Append new addresses to the existing ones
            existingCustomer.address.push(...newAddresses)
            return await existingCustomer.save()
        }

        return existingCustomer
    }

    // Create new customer if they don't exist
    return await createCustomer(body)
}

export const findAllCustomersService = async () => {
    return await findAllCustomers()
}

export const findCustomerByIdService = async (req: Request) => {
    let { id } = req.params as { id: string }
    if (!id) {
        throw new Error('Customer ID is required')
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Customer ID");
    }

    return await findCustomerById(id)
}

export const updateCustomerByIdService = async (req: Request) => {
    let { id } = req.params as { id: string }
    if (!id) {
        throw new Error('Customer ID is required')
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Customer ID");
    }

    return await updateCustomerById(id, req.body)
}

export const deleteCustomerByIdService = async (req: Request) => {
    let { id } = req.params as { id: string }
    if (!id) {
        throw new Error('Customer ID is required')
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Customer ID");
    }

    return await deleteCustomerById(id)
}

export const deleteMultipleCustomersByIdService = async (req: Request) => {
    let { ids } = req.body as { ids: string[] }
    if (!ids) {
        throw new Error('Customer IDs are required')
    }
    if (!Array.isArray(ids)) {
        throw new Error("Invalid Customer IDs");
    }

    return await deleteMultipleCustomersById(ids)
}

export const softDeleteCustomerByIdService = async (req: Request) => {
    let { id } = req.params as { id: string }
    if (!id) {
        throw new Error('Customer ID is required')
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Customer ID");
    }

    return await softDeleteCustomerById(id)
}

export const softDeleteMultipleCustomersByIdService = async (req: Request) => {
    let { ids } = req.body as { ids: string[] }
    if (!ids) {
        throw new Error('Customer IDs are required')
    }
    if (!Array.isArray(ids)) {
        throw new Error("Invalid Customer IDs");
    }

    return await softDeleteMultipleCustomersById(ids)
}

export const restoreCustomerByIdService = async (req: Request) => {
    let { id } = req.params as { id: string }
    if (!id) {
        throw new Error('Customer ID is required')
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Customer ID");
    }

    return await restoreCustomerById(id)
}

export const getTrashedCustomersService = async () => {
    return await getTrashedCustomers()
}

