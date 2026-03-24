import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBasket,
  cilCart,
  cilList,
  cilSpeedometer,
  cilStar,
  cilContact,
  cilUser,
  cilSettings,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Ecommerce',
  },
  {
    component: CNavGroup,
    name: 'Products',
    to: '/products',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Products',
        to: '/products/all',
      },
      {
        component: CNavItem,
        name: 'Add Product',
        to: '/products/create',
      },
      {
        component: CNavItem,
        name: 'Trash',
        to: '/products/trash',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Orders',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Orders',
        to: '/orders/all',
      },
      {
        component: CNavItem,
        name: 'Trash Orders',
        to: '/orders/trash',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Category',
    to: '/category/index',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Enquiry',
  },
  {
    component: CNavGroup,
    name: 'Contacts',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Contacts',
        to: '/contacts/all',
      },
      {
        component: CNavItem,
        name: 'Trash Contacts',
        to: '/contacts/trash',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Users',
  },
  {
    component: CNavGroup,
    name: 'Customers',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Customers',
        to: '/customers/all',
      },
      {
        component: CNavItem,
        name: 'Trash Customers',
        to: '/customers/trash',
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'Setting',
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/settings/index',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },

]

export default _nav
