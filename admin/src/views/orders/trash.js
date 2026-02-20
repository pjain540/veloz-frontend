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
import { cilReload, cilTrash } from '@coreui/icons'
import { getTrashedOrder, restoreOrder, deleteOrder } from 'src/api'
import { toast } from 'react-toastify'
import { timeAgo } from 'src/utils/formatDate'

const TrashOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTrashedOrders = async () => {
        try {
            const res = await getTrashedOrder()
            if (res.success) {
                setOrders(res.data)
            }
        } catch (error) {
            console.error('Error fetching trashed orders:', error)
            toast.error('Failed to load trashed orders')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTrashedOrders()
    }, [])

    const handleRestore = async (id) => {
        if (window.confirm('Are you sure you want to restore this order?')) {
            try {
                const response = await restoreOrder(id)
                toast.success(response.message || 'Order restored successfully')
                fetchTrashedOrders()
            } catch (error) {
                toast.error(error.message || 'Failed to restore order')
            }
        }
    }

    const handleDeletePermanent = async (id) => {
        if (window.confirm('WARNING: This will permanently delete the order. Proceed?')) {
            try {
                const response = await deleteOrder(id)
                toast.success(response.message || 'Order deleted permanently')
                fetchTrashedOrders()
            } catch (error) {
                toast.error(error.message || 'Failed to delete order')
            }
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
                        <h5 className="mb-0 fw-bold text-white">Trash Orders</h5>
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
                                        <CTableHeaderCell className="bg-body-tertiary">Amount</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Payment Status</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Trashed At</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {orders.length === 0 ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan="6" className="text-center py-4 text-muted">
                                                No trashed orders found.
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
                                                    <div className="fw-bold">₹{order.amount}</div>
                                                    <div className="small text-muted">{order.paymentMethod}</div>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center">
                                                    <CBadge color={getPaymentStatusColor(order.paymentStatus)} className="text-uppercase">
                                                        {order.paymentStatus}
                                                    </CBadge>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center">
                                                    <div className="small">{timeAgo(order.deletedAt || order.updatedAt)}</div>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center text-nowrap">
                                                    <CButton
                                                        color="success"
                                                        variant="outline"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleRestore(order._id)}
                                                        title="Restore Order"
                                                    >
                                                        <CIcon icon={cilReload} />
                                                    </CButton>
                                                    <CButton
                                                        color="danger"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDeletePermanent(order._id)}
                                                        title="Delete Permanently"
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

export default TrashOrders
