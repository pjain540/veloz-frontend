import React from 'react'

const IndexCategory = React.lazy(() => import('./index'))

const routes = [
    // { path: '/products', name: 'Products', element: AllProducts, exact: true },
    { path: '/category/index', name: 'Category', element: IndexCategory },
]

export default routes
