import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilUser, cilLocationPin, cilCalendar } from '@coreui/icons'
import { getCustomerById } from 'src/api'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { timeAgo } from 'src/utils/formatDate'

const CustomerDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [customer, setCustomer] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const res = await getCustomerById(id)
                if (res.success) {
                    setCustomer(res.data)
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
                toast.error('Failed to load customer details')
            } finally {
                setLoading(false)
            }
        }
        fetchCustomer()
    }, [id])

    if (loading) {
        return (
            <div className="text-center py-5">
                <CSpinner color="primary" variant="grow" />
            </div>
        )
    }

    if (!customer) {
        return (
            <div className="text-center py-5">
                <h4>Customer not found</h4>
                <CButton color="primary" onClick={() => navigate('/customers/all')}>
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
                        <CIcon icon={cilArrowLeft} className="me-2" /> Back
                    </CButton>
                    <h4 className="mb-0">Customer Details: <span className="text-primary">{customer.name.charAt(0).toUpperCase() + customer.name.slice(1)}</span></h4>
                </div>
            </CCol>

            {/* Basic Information */}
            <CCol md={6} className="mb-4">
                <CCard className="h-100 shadow-sm border-0">
                    <CCardHeader className="text-white py-3">
                        <div className="d-flex align-items-center">
                            <CIcon icon={cilUser} className="me-2" />
                            <h5 className="mb-0">Basic Information</h5>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <div className="mb-3">
                            <label className="text-muted small text-uppercase fw-bold">Full Name</label>
                            <p className="mb-0 fw-bold">{customer.name.charAt(0).toUpperCase() + customer.name.slice(1)}</p>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small text-uppercase fw-bold">Email Address</label>
                            <p className="mb-0">{customer.email}</p>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small text-uppercase fw-bold">Phone Number</label>
                            <p className="mb-0">{customer.phone || 'N/A'}</p>
                        </div>
                        <hr />
                        <div className="mb-0">
                            <label className="text-muted small text-uppercase fw-bold">
                                <CIcon icon={cilCalendar} className="me-1" /> Registered
                            </label>
                            <p className="mb-0">{timeAgo(customer.createdAt)}</p>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Addresses */}
            <CCol md={6} className="mb-4">
                <CCard className="h-100 shadow-sm border-0">
                    <CCardHeader className="bg-dark text-white py-3">
                        <div className="d-flex align-items-center">
                            <CIcon icon={cilLocationPin} className="me-2" />
                            <h5 className="mb-0">Addresses</h5>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        {customer.address && customer.address.length > 0 ? (
                            customer.address.map((addr, index) => (
                                <div key={index} className={`mb-3 ${index !== customer.address.length - 1 ? 'border-bottom pb-3' : ''}`}>
                                    <label className="text-muted small text-uppercase fw-bold">Address {index + 1}</label>
                                    <p className="mb-0">
                                        {addr.houseNo}, {addr.street}<br />
                                        <span className="fw-bold">Pincode:</span> {addr.pincode}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted italic">No addresses found.</p>
                        )}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default CustomerDetail
