import React from 'react'

const AllProducts = React.lazy(() => import('./all'))
const CreateProduct = React.lazy(() => import('./create'))
const Trash = React.lazy(() => import('./trash'))

const routes = [
    // { path: '/products', name: 'Products', element: AllProducts, exact: true },
    { path: '/products/all', name: 'All Products', element: AllProducts },
    { path: '/products/create', name: 'Create Product', element: CreateProduct },
    { path: '/products/trash', name: 'Trash', element: Trash },
    { path: '/product/:id/edit', name: 'Edit Product', element: CreateProduct },
]

export default routes
