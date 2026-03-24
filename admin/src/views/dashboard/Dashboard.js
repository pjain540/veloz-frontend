import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CSpinner,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDescription } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { getRecentOrders } from 'src/api'
import { timeAgo } from 'src/utils/formatDate'

const getPaymentStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'paid':
      return 'success'
    case 'unpaid':
      return 'danger'
    case 'failed':
      return 'danger'
    default:
      return 'secondary'
  }
}

const Dashboard = () => {
  const [recentOrders, setRecentOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getRecentOrders()
      .then((res) => setRecentOrders(res.data || []))
      .catch((err) => console.error('Failed to load recent orders', err))
      .finally(() => setLoadingOrders(false))
  }, [])

  return (
    <>
      {/* Stats Cards */}
      <WidgetsDropdown className="mb-4" />

      {/* Recent Orders */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 shadow-sm">
            <CCardHeader className="py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Recent Orders</h5>
              <CButton
                color="primary"
                variant="outline"
                size="sm"
                onClick={() => navigate('/orders/all')}
              >
                View All
              </CButton>
            </CCardHeader>
            <CCardBody>
              {loadingOrders ? (
                <div className="text-center py-5">
                  <CSpinner color="primary" />
                </div>
              ) : (
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead className="text-nowrap">
                    <CTableRow className="bg-light">
                      <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: 50 }}>
                        #
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Customer</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Order No</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary">Amount</CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary text-center">
                        Payment Status
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary text-center">
                        Created At
                      </CTableHeaderCell>
                      <CTableHeaderCell className="bg-body-tertiary text-center">
                        Actions
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {recentOrders.length === 0 ? (
                      <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center py-4 text-muted">
                          No recent orders found.
                        </CTableDataCell>
                      </CTableRow>
                    ) : (
                      recentOrders.map((order, index) => (
                        <CTableRow key={order._id}>
                          <CTableDataCell className="text-center text-muted">
                            {index + 1}
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="fw-bold">
                              {order.customer?.name
                                ? order.customer.name.charAt(0).toUpperCase() +
                                  order.customer.name.slice(1)
                                : 'Unknown'}
                            </div>
                            <div className="small text-muted">{order.customer?.email}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="fw-bold">{order.orderNo || 'Unknown'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="fw-bold">₹{order.amount}</div>
                            <div className="small text-muted">{order.paymentMethod}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CBadge
                              color={getPaymentStatusColor(order.paymentStatus)}
                              className="text-uppercase"
                            >
                              {order.paymentStatus}
                            </CBadge>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div className="small">{timeAgo(order.createdAt)}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CButton
                              color="info"
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/orders/${order._id}/details`)}
                              title="View Order"
                            >
                              <CIcon icon={cilDescription} />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    )}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
