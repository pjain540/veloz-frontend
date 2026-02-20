import React from 'react'

const AllCustomers = React.lazy(() => import('./all'))
const TrashCustomers = React.lazy(() => import('./trash'))
const DetailCustomer = React.lazy(() => import('./detail'))

const customersRoutes = [
    {
        path: '/customers/all',
        name: 'All Customers',
        element: AllCustomers,
    },
    {
        path: '/customers/trash',
        name: 'Trash Customers',
        element: TrashCustomers,
    },
    {
        path: '/customers/:id/detail',
        name: 'Detail Customer',
        element: DetailCustomer,
    },
]

export default customersRoutes

