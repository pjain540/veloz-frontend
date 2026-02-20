import React from 'react'

const AllContact = React.lazy(() => import('./all'))
const TrashContact = React.lazy(() => import('./trash'))

const routes = [
    {
        path: '/contacts/all',
        name: 'Contacts',
        element: AllContact,
    },
    {
        path: '/contacts/trash',
        name: 'Trash Contacts',
        element: TrashContact,
    },
]

export default routes