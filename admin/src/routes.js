import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
import productRoutes from './views/products/route'
import categoryRoutes from './views/category.js/route'
import orderRoutes from './views/orders/route'
import contactRoutes from './views/contacts/route'
import customerRoutes from './views/customers/route'
import settingRoutes from './views/settings/route'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  ...productRoutes,
  ...categoryRoutes,
  ...orderRoutes,
  ...contactRoutes,
  ...customerRoutes,
  ...settingRoutes
]

export default routes
