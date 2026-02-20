const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const createProduct = async (productData) => {
    const formData = new FormData()

    // Append all fields to FormData
    for (const key in productData) {
        if (key === 'gallery' && Array.isArray(productData.gallery)) {
            productData.gallery.forEach((file) => {
                formData.append('gallery', file)
            })
        } else if (key === 'image' && productData.image) {
            formData.append('image', productData.image)
        } else if (productData[key] !== null && productData[key] !== undefined) {
            formData.append(key, productData[key])
        }
    }

    try {
        const response = await fetch(`${API_BASE_URL}/product/create`, {
            method: 'POST',
            body: formData,
        })

        const data = await response.json()
        console.log("response data==============", data)

        if (data.success !== true) {
            throw new Error(data.message || 'Failed to create product')
        }

        return data
    } catch (error) {
        console.error('Error in createProduct:', error)
        throw error
    }
}

export const getAllCategory = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/category/get-all`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get all category')
        }
        return data
    } catch (error) {
        console.error('Error in getAllCategory:', error)
        throw error
    }
}

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/product/get-by-id/${id}`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get product')
        }
        return data
    } catch (error) {
        console.error('Error in getProductById:', error)
        throw error
    }
}

export const updateProduct = async (id, productData) => {
    const formData = new FormData()
    const existingGallery = []

    for (const key in productData) {
        if (key === 'gallery' && Array.isArray(productData.gallery)) {
            productData.gallery.forEach((item) => {
                if (item instanceof File) {
                    formData.append('gallery', item)
                } else if (item && item.url) {
                    existingGallery.push(item)
                }
            })
            formData.append('existingGallery', JSON.stringify(existingGallery))
        }
        else if (key === 'image' && productData.image) {
            if (productData.image instanceof File) {
                formData.append('image', productData.image)
            } else if (productData.image.url) {
                formData.append('existingImage', JSON.stringify(productData.image))
            }
        }
        else if (productData[key] !== null && productData[key] !== undefined) {
            formData.append(key, productData[key])
        }
    }

    try {
        const response = await fetch(`${API_BASE_URL}/product/update/${id}`, {
            method: 'PUT',
            body: formData,
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error in updateProduct:', error)
        throw error
    }
}

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/product/get-all`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get products')
        }
        return data
    } catch (error) {
        console.error('Error in getAllProducts:', error)
        throw error
    }
}

export const trashProduct = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/product/trash/${id}`, {
            method: 'GET',
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error in trashProduct:', error)
        throw error
    }
}

export const showTrashProduct = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/product/list?isTrashed=true`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get trash products')
        }
        return data
    } catch (error) {
        console.error('Error in showTrashProduct:', error)
        throw error
    }
}

export const restoreProduct = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/product/restore/${id}`, {
            method: 'GET',
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error in restoreProduct:', error)
        throw error
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/product/delete/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error in deleteProduct:', error)
        throw error
    }
}

export const createCategory = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/category/create`, {
            method: 'POST',
            body: formData,
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to create category')
        }
        return data
    } catch (error) {
        console.error('Error in createCategory:', error)
        throw error
    }
}

export const getCategoryById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/category/get-by-id/${id}`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get category')
        }
        return data
    } catch (error) {
        console.error('Error in getCategoryById:', error)
        throw error
    }
}

export const deleteCategoryById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/category/delete/${id}`, {
            method: 'GET',
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to delete category')
        }
        return data
    } catch (error) {
        console.error('Error in deleteCategoryById:', error)
        throw error
    }
}

export const updateCategoryById = async (id, formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/category/update/${id}`, {
            method: 'PUT',
            body: formData,
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to update category')
        }
        return data
    } catch (error) {
        console.error('Error in updateCategoryById:', error)
        throw error
    }
}

export const getAllOrders = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/order/get-all`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get orders')
        }
        return data
    } catch (error) {
        console.error('Error in getAllOrders:', error)
        throw error
    }
}

export const getOrderById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/order/get-by-id/${id}`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get order')
        }
        return data
    } catch (error) {
        console.error('Error in getOrderById:', error)
        throw error
    }
}

export const softDeleteOrder = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/order/trash/${id}`, {
            method: 'GET',
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to soft delete order')
        }
        return data
    } catch (error) {
        console.error('Error in softDeleteOrder:', error)
        throw error
    }
}

export const getTrashedOrder = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/order/trashed`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get trashed orders')
        }
        return data
    } catch (error) {
        console.error('Error in getTrashedOrder:', error)
        throw error
    }
}

export const restoreOrder = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/order/restore/${id}`, {
            method: 'GET',
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to restore order')
        }
        return data
    } catch (error) {
        console.error('Error in restoreOrder:', error)
        throw error
    }
}

export const deleteOrder = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/order/delete/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to delete order')
        }
        return data
    } catch (error) {
        console.error('Error in deleteOrder:', error)
        throw error
    }
}

export const getAllContacts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact/get-all`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get contacts')
        }
        return data
    } catch (error) {
        console.error('Error in getAllContacts:', error)
        throw error
    }
}

export const softDeletecontact = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact/trash/${id}`, {
            method: 'GET',
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to soft delete contact')
        }
        return data
    } catch (error) {
        console.error('Error in softDeletecontact:', error)
        throw error
    }
}

export const getTrashedcontact = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact/trashed`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get trashed contacts')
        }
        return data
    } catch (error) {
        console.error('Error in getTrashedContacts:', error)
        throw error
    }
}

export const restoreContact = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact/restore/${id}`, {
            method: 'GET',
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to restore contact')
        }
        return data
    } catch (error) {
        console.error('Error in restorecontact:', error)
        throw error
    }
}

export const deletecontact = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact/delete/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to delete contact')
        }
        return data
    } catch (error) {
        console.error('Error in deletecontact:', error)
        throw error
    }
}

export const getAllCustomers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/customer/get-all`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get customers')
        }
        return data
    } catch (error) {
        console.error('Error in getAllCustomers:', error)
        throw error
    }
}

export const softDeleteCustomer = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customer/trash/${id}`, {
            method: 'GET',
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to soft delete customer')
        }
        return data
    } catch (error) {
        console.error('Error in softDeleteCustomer:', error)
        throw error
    }
}

export const getTrashedCustomer = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/customer/trashed`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get trashed customers')
        }
        return data
    } catch (error) {
        console.error('Error in getTrashedCustomers:', error)
        throw error
    }
}

export const restoreCustomer = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customer/restore/${id}`, {
            method: 'GET',
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to restore customer')
        }
        return data
    } catch (error) {
        console.error('Error in restoreCustomer:', error)
        throw error
    }
}

export const deleteCustomer = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customer/delete/${id}`, {
            method: 'DELETE',
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to delete customer')
        }
        return data
    } catch (error) {
        console.error('Error in deleteCustomer:', error)
        throw error
    }
}

export const getCustomerById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customer/get-by-id/${id}`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get customer')
        }
        return data
    } catch (error) {
        console.error('Error in getCustomerById:', error)
        throw error
    }
}

export const getReviewsByProductId = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/review/get-by-product-id/${id}`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get reviews')
        }
        return data
    } catch (error) {
        console.error('Error in getReviewsByProductId:', error)
        throw error
    }
}

export const createSetting = async (payload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/setting/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to create setting')
        }
        return data
    } catch (error) {
        console.error('Error in createSetting:', error)
        throw error
    }
}

export const updateSetting = async (id, payload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/setting/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        const resData = await response.json()
        if (resData.success !== true) {
            throw new Error(resData.message || 'Failed to update setting')
        }
        return resData
    } catch (error) {
        console.error('Error in updateSetting:', error)
        throw error
    }
}

export const getSettingBySlug = async (slug) => {
    try {
        const response = await fetch(`${API_BASE_URL}/setting/get-slug/${slug}`)
        const resData = await response.json()
        if (resData.success !== true) {
            throw new Error(resData.message || 'Failed to get setting')
        }
        return resData
    } catch (error) {
        console.error('Error in getSettingBySlug:', error)
        throw error
    }
}

export const getAllSetting = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/setting/get-all`)
        const data = await response.json()
        if (data.success !== true) {
            throw new Error(data.message || 'Failed to get all settings')
        }
        return data
    } catch (error) {
        console.error('Error in getAllSetting:', error)
        throw error
    }
}