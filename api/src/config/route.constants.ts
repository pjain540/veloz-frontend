export const routeConstants = {
    API_BASE: {
        DEFAULT: '/api'
    },
    AUTH: {
        BASE: '/auth',
    },
    CATEGORY: {
        BASE: '/category',
        CREATE: '/create',
        GET_ALL: '/get-all',
        GET_BY_ID: '/get-by-id/:id',
        UPDATE: '/update/:id',
        DELETE: '/delete/:id',
        FRONTEND: {
            GET_ALL: '/frontend/get-all'
        }
    },
    PRODUCT: {
        BASE: '/product',
        CREATE: '/create',
        GET_ALL: '/get-all',
        GET_BY_ID: '/get-by-id/:id',
        UPDATE: '/update/:id',
        DELETE: '/delete/:id',
        TRASH: '/trash/:id',
        MULTI_TRASH: '/multi-trash',
        MULTI_DELETE: '/multi-delete',
        RESTORE: '/restore/:id',
        FRONTEND: {
            LIST: '/list',
        }
    },
    CUSTOMER: {
        BASE: '/customer',
        GET_ALL: '/get-all',
        GET_BY_ID: '/get-by-id/:id',
        UPDATE: '/update/:id',
        DELETE: '/delete/:id',
        TRASH: '/trash/:id',
        TRASHED: '/trashed',
        MULTI_TRASH: '/multi-trash',
        MULTI_DELETE: '/multi-delete',
        RESTORE: '/restore/:id',
        FRONTEND: {
            CREATE: '/create',
        }
    },
    ORDER: {
        BASE: '/order',
        GET_ALL: '/get-all',
        GET_BY_ID: '/get-by-id/:id',
        UPDATE: '/update/:id',
        DELETE: '/delete/:id',
        TRASH: '/trash/:id',
        TRASHED: '/trashed',
        MULTI_TRASH: '/multi-trash',
        MULTI_DELETE: '/multi-delete',
        RESTORE: '/restore/:id',
        GET_BY_ID_QUERY_PARAMS: '/get-by-id-query-params',
        FRONTEND: {
            CREATE: '/create',
        }
    },
    CONTACT: {
        BASE: '/contact',
        GET_ALL: '/get-all',
        GET_BY_ID: '/get-by-id/:id',
        UPDATE: '/update/:id',
        DELETE: '/delete/:id',
        TRASH: '/trash/:id',
        TRASHED: '/trashed',
        MULTI_TRASH: '/multi-trash',
        MULTI_DELETE: '/multi-delete',
        RESTORE: '/restore/:id',
        FRONTEND: {
            CREATE: '/create',
        }
    },
    REVIEW: {
        BASE: '/review',
        GET_ALL: '/get-all',
        GET_BY_ID: '/get-by-id/:id',
        UPDATE: '/update/:id',
        DELETE: '/delete/:id',
        TRASH: '/trash/:id',
        TRASHED: '/trashed',
        MULTI_TRASH: '/multi-trash',
        MULTI_DELETE: '/multi-delete',
        RESTORE: '/restore/:id',
        FRONTEND: {
            CREATE: '/create',
            GET_BY_PRODUCT_ID: '/get-by-product-id/:id',
        }
    },
    SETTING: {
        BASE: '/setting',
        CREATE: '/create',
        GET_SLUG: '/get-slug/:slug',
        UPDATE: '/update/:slug',
        GET_ALL: '/get-all',
    },
    FILE: {
        BASE: '/file',
        CREATE: '/create',
        CREATE_MULTIPLE: '/create-multiple'
    },
    DASHBOARD: {
        BASE: '/dashboard',
        GET_COUNTS: '/counts',
        GET_RECENT_ORDERS: '/recent-orders'
    }
}