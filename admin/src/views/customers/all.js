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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDescription, cilTrash, } from '@coreui/icons'
import { getAllCustomers, softDeleteCustomer } from 'src/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AllCustomers = () => {
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchCustomers = async () => {
        try {
            const res = await getAllCustomers()
            if (res.success) {
                setCustomers(res.data)
            }
        } catch (error) {
            console.error('Error fetching customers:', error)
            toast.error('Failed to load customers')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    const handleView = (id) => {
        navigate(`/customers/${id}/detail`)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                const response = await softDeleteCustomer(id)
                if (response.success) {
                    toast.success(response.message)
                    fetchCustomers()
                } else {
                    toast.error(response.message || 'Failed to delete customer')
                }
            } catch (error) {
                console.error('Error deleting customer:', error)
                toast.error('An error occurred while deleting the customer')
            }
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4 shadow-sm">
                    <CCardHeader className="py-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-bold text-white">All Customers</h5>
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
                                        <CTableHeaderCell className="bg-body-tertiary">Phone</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {customers.length === 0 ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan="4" className="text-center py-4 text-muted">
                                                No customers found.
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : (
                                        customers.map((item, index) => (
                                            <CTableRow key={item._id}>
                                                <CTableDataCell className="text-center text-muted">
                                                    {index + 1}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div>
                                                        <div className="fw-bold text-white">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
                                                        <div className="small text-muted">
                                                            {item.email}
                                                        </div>
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="small text-muted">{item.phone || 'N/A'}</div>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center text-nowrap">
                                                    <CButton
                                                        color="info"
                                                        variant="outline"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleView(item._id)}
                                                        title="View Customer"
                                                    >
                                                        <CIcon icon={cilDescription} />
                                                    </CButton>
                                                    <CButton
                                                        color="danger"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(item._id)}
                                                        title="Delete Customer"
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

export default AllCustomers
