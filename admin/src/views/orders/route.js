import React from 'react'

const AllOrders = React.lazy(() => import('./all'))
const OrderDetails = React.lazy(() => import('./details'))
const TrashOrders = React.lazy(() => import('./trash'))

const routes = [
    {
        path: '/orders/all',
        name: 'Orders',
        element: AllOrders,
    },
    {
        path: '/orders/:id/details',
        name: 'Order Details',
        element: OrderDetails,
    },
    {
        path: '/orders/trash',
        name: 'Trash Orders',
        element: TrashOrders,
    },
]

export default routes