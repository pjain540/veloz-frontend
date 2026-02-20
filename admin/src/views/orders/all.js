import React, { useState, useEffect } from 'react'
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
    CButton,
    CSpinner,
    CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDescription, cilTrash } from '@coreui/icons'
import { getAllOrders, softDeleteOrder } from 'src/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { timeAgo } from 'src/utils/formatDate'

const AllOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchOrders = async () => {
        console.log("fetchOrders")
        try {
            const res = await getAllOrders()
            if (res.success) {
                setOrders(res.data)
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
            toast.error('Failed to load orders')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const handleView = (id) => {
        navigate(`/orders/${id}/details`)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            const response = await softDeleteOrder(id) // Implement delete API if available
            toast.success(response.message)
            fetchOrders()
        }
    }

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

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4 shadow-sm">
                    <CCardHeader className="py-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-bold text-white">All Orders</h5>
                    </CCardHeader>
                    <CCardBody>
                        {loading ? (
                            <div className="text-center py-5">
                                <CSpinner color="primary" />
                            </div>
                        ) : (
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className="text-nowrap mt-4">
                                    <CTableRow className='bg-light'>
                                        <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '50px' }}>#</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Customer</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Order No</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Amount</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Payment Status</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Created At</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {orders.length === 0 ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan="6" className="text-center py-4 text-muted">
                                                No orders found.
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : (
                                        orders.map((order, index) => (
                                            <CTableRow key={order._id}>
                                                <CTableDataCell className="text-center text-muted">
                                                    {index + 1}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div>
                                                        <div className="fw-bold">{order.customer?.name.charAt(0).toUpperCase() + order.customer?.name.slice(1) || 'Unknown'}</div>
                                                        <div className="small text-muted">{order.customer?.email}</div>
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="fw-bold">{order.orderNo || 'Unknown'}</div>
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="fw-bold">₹{order.amount}</div>
                                                    <div className="small text-muted">{order.paymentMethod}</div>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center">
                                                    <CBadge color={getPaymentStatusColor(order.paymentStatus)} className="text-uppercase">
                                                        {order.paymentStatus}
                                                    </CBadge>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center">
                                                    <div className="small">{timeAgo(order.createdAt)}</div>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center text-nowrap">
                                                    <CButton
                                                        color="info"
                                                        variant="outline"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleView(order._id)}
                                                        title="View Order"
                                                    >
                                                        <CIcon icon={cilDescription} />
                                                    </CButton>
                                                    <CButton
                                                        color="danger"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(order._id)}
                                                        title="Delete Order"
                                                    >
                                                        <CIcon icon={cilTrash} />
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
    )
}

export default AllOrders
