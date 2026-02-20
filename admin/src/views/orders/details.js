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
    CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilUser, cilLocationPin, cilCreditCard, cilFastfood } from '@coreui/icons'
import { getOrderById } from 'src/api'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { timeAgo } from 'src/utils/formatDate'

const OrderDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await getOrderById(id)
                if (res.success) {
                    setOrder(res.data)
                }
            } catch (error) {
                console.error('Error fetching order details:', error)
                toast.error('Failed to load order details')
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [id])

    const getPaymentStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'paid': return 'success'
            case 'unpaid': return 'danger'
            case 'failed': return 'danger'
            default: return 'secondary'
        }
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <CSpinner color="primary" variant="grow" />
            </div>
        )
    }

    if (!order) {
        return (
            <div className="text-center py-5">
                <h4>Order not found</h4>
                <CButton color="primary" onClick={() => navigate('/orders/all')}>
                    Go Back
                </CButton>
            </div>
        )
    }

    return (
        <CRow>
            <CCol xs={12} className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <CButton color="secondary" variant="outline" onClick={() => navigate(-1)}>
                        <CIcon icon={cilArrowLeft} className="me-2" /> Back to Orders
                    </CButton>
                    <h4 className="mb-0">Order: <span className="text-primary">{order.orderNo}</span></h4>
                </div>
            </CCol>

            {/* Customer & Payment Information */}
            <CCol md={6} className="mb-4">
                <CCard className="h-100 shadow-sm border-0">
                    <CCardHeader className="text-white py-3">
                        <div className="d-flex align-items-center">
                            <CIcon icon={cilUser} className="me-2" />
                            <h5 className="mb-0">Customer Information</h5>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <div className="mb-3">
                            <label className="text-muted small text-uppercase fw-bold">Name</label>
                            <p className="mb-0 fw-bold">{order.customer?.name}</p>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small text-uppercase fw-bold">Email</label>
                            <p className="mb-0">{order.customer?.email}</p>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small text-uppercase fw-bold">Phone</label>
                            <p className="mb-0">{order.customer?.phone || 'N/A'}</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <label className="text-muted small text-uppercase fw-bold">Payment Status</label>
                                <div>
                                    <CBadge color={getPaymentStatusBadge(order.paymentStatus)} className="text-uppercase">
                                        {order.paymentStatus}
                                    </CBadge>
                                </div>
                            </div>
                            <div className="text-end">
                                <label className="text-muted small text-uppercase fw-bold">Amount Paid</label>
                                <h4 className="mb-0 text-primary">₹{order.amount}</h4>
                            </div>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Shipping & Order Details */}
            <CCol md={6} className="mb-4">
                <CCard className="h-100 shadow-sm border-0">
                    <CCardHeader className="bg-dark text-white py-3">
                        <div className="d-flex align-items-center">
                            <CIcon icon={cilLocationPin} className="me-2" />
                            <h5 className="mb-0">Shipping & Order Details</h5>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <div className="mb-3">
                            <label className="text-muted small text-uppercase fw-bold">Address</label>
                            <p className="mb-0">
                                {order.address?.houseNo}, {order.address?.street}<br />
                                <span className="fw-bold">Pincode:</span> {order.address?.pincode}
                            </p>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small text-uppercase fw-bold">Payment Method</label>
                            <p className="mb-0 text-uppercase">
                                <CIcon icon={cilCreditCard} className="me-2" />
                                {order.paymentMethod}
                            </p>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small text-uppercase fw-bold">Order Date</label>
                            <p className="mb-0">{timeAgo(order.createdAt)}</p>
                        </div>
                        <div className="mb-0">
                            <label className="text-muted small text-uppercase fw-bold">Order ID</label>
                            <p className="mb-0 small text-muted">{order._id}</p>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Product Details Table */}
            <CCol xs={12}>
                <CCard className="shadow-sm border-0">
                    <CCardHeader className="text-white py-3">
                        <div className="d-flex align-items-center">
                            <CIcon icon={cilFastfood} className="me-2" />
                            <h5 className="mb-0">Order Items</h5>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CTable align="middle" responsive hover className="mb-0 border">
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell>Product</CTableHeaderCell>
                                    <CTableHeaderCell>Category</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Quantity</CTableHeaderCell>
                                    <CTableHeaderCell className="text-end">Price</CTableHeaderCell>
                                    <CTableHeaderCell className="text-end">Total</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {order.products?.map((item, index) => {
                                    const product = item.productId
                                    return (
                                        <CTableRow key={index}>
                                            <CTableDataCell>
                                                <div className="d-flex align-items-center">
                                                    <CAvatar
                                                        src={product?.image?.url || 'https://via.placeholder.com/50'}
                                                        size="md"
                                                        className="me-3 border"
                                                    />
                                                    <div>
                                                        <div className="fw-bold">{product?.name}</div>
                                                        <div className="small text-muted">{product?.type}</div>
                                                    </div>
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <CBadge color="light" className="text-white bg-opacity-10 border">
                                                    {product?.category?.name || 'Uncategorized'}
                                                </CBadge>
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center fw-bold">
                                                {item.quantity}
                                            </CTableDataCell>
                                            <CTableDataCell className="text-end fw-bold">
                                                ₹{product?.salePrice}
                                            </CTableDataCell>
                                            <CTableDataCell className="text-end fw-bold text-primary">
                                                ₹{product?.salePrice * item.quantity}
                                            </CTableDataCell>
                                        </CTableRow>
                                    )
                                })}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default OrderDetails
