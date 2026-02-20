import CustomerModel from "../../modules/customer/customer.model";

export const createCustomer = async (data: any) => {
    return await CustomerModel.create(data)
}

export const findCustomerByEmail = async (email: string) => {
    return await CustomerModel.findOne({ email })
}

export const findCustomerById = async (id: string) => {
    return await CustomerModel.findById(id)
}

export const findAllCustomers = async () => {
    return await CustomerModel.find({ deletedAt: null }).sort({ createdAt: -1 })
}

export const updateCustomerById = async (id: string, data: any) => {
    return await CustomerModel.findByIdAndUpdate(id, data, { new: true })
}

export const deleteCustomerById = async (id: string) => {
    return await CustomerModel.findByIdAndDelete(id)
}

export const deleteMultipleCustomersById = async (ids: string[]) => {
    return await CustomerModel.deleteMany({ _id: { $in: ids } })
}

export const softDeleteCustomerById = async (id: string) => {
    return await CustomerModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
}

export const softDeleteMultipleCustomersById = async (ids: string[]) => {
    return await CustomerModel.updateMany({ _id: { $in: ids } }, { deletedAt: new Date() })
}

export const restoreCustomerById = async (id: string) => {
    return await CustomerModel.findByIdAndUpdate(id, { deletedAt: null }, { new: true })
}

export const getTrashedCustomers = async () => {
    return await CustomerModel.find({ deletedAt: { $ne: null } }).sort({ createdAt: -1 })
}


