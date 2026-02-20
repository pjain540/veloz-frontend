const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/category/frontend/get-all`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        throw error;
    }
};

export const isProductShowAtHome = async () => {
    try {
        const response = await fetch(`${BASE_URL}/product/list?isShowAtHome=true`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw error;
    }
};

export const bestsellerProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/product/list?isBestseller=true`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw error;
    }
};

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/product/list`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw error;
    }
};

export const productFilterByCategory = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/product/list?category=${id}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw error;
    }
};

export const productGetBySlug = async (slug: string) => {
    try {
        const response = await fetch(`${BASE_URL}/product/list?slug=${slug}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw error;
    }
};

export const searchProductByName = async (name: string) => {
    try {
        const response = await fetch(`${BASE_URL}/product/list?search=${name}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw error;
    }
};

export const createCustomer = async (formData: any) => {
    try {
        const response = await fetch(`${BASE_URL}/customer/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        return data;

    } catch (error: any) {
        console.error("Failed to create customer:", error.message);
        throw error;
    }
};

export const createOrder = async (formData: any) => {
    try {
        const response = await fetch(`${BASE_URL}/order/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Failed to create order:", error);
        throw error;
    }
};

export const createContact = async (formData: any) => {
    try {
        const response = await fetch(`${BASE_URL}/contact/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Failed to create contact:", error);
        throw error;
    }
}

export const createReview = async (formData: any) => {
    try {
        const response = await fetch(`${BASE_URL}/review/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Failed to create review:", error);
        throw error;
    }
}

export const getReviewByProduct = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/review/get-by-product-id/${id}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch review:", error);
        throw error;
    }
};

export const getFreeShippingAbove = async () => {
    try {
        const response = await fetch(`${BASE_URL}/setting/get-slug/free-shipping-above`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch free shipping above:", error);
        throw error;
    }
};




