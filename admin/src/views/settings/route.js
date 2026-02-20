import React from 'react'

const Settings = React.lazy(() => import('./index'))

const routes = [
    {
        path: '/settings/index',
        name: 'Setting',
        element: Settings,
    },
    {
        path: '/settings/index/:slug',
        name: 'Setting',
        element: Settings,
    },
]

export default routes