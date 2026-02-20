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
import { cilReload, cilTrash } from '@coreui/icons'
import { getTrashedCustomer, restoreCustomer, deleteCustomer } from 'src/api'
import { toast } from 'react-toastify'

const TrashCustomers = () => {
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTrashedCustomers = async () => {
        try {
            const res = await getTrashedCustomer()
            if (res.success) {
                setCustomers(res.data)
            }
        } catch (error) {
            console.error('Error fetching trashed customers:', error)
            toast.error('Failed to load trashed customers')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTrashedCustomers()
    }, [])

    const handleRestore = async (id) => {
        if (window.confirm('Are you sure you want to restore this customer?')) {
            try {
                const response = await restoreCustomer(id)
                if (response.success) {
                    toast.success(response.message)
                    fetchTrashedCustomers()
                } else {
                    toast.error(response.message || 'Failed to restore customer')
                }
            } catch (error) {
                console.error('Error restoring customer:', error)
                toast.error('An error occurred while restoring the customer')
            }
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to permanently delete this customer? This action cannot be undone.')) {
            try {
                const response = await deleteCustomer(id)
                if (response.success) {
                    toast.success(response.message)
                    fetchTrashedCustomers()
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
                        <h5 className="mb-0 fw-bold text-white">Trash Customers</h5>
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
                                                No trashed customers found.
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
                                                        color="success"
                                                        variant="outline"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleRestore(item._id)}
                                                        title="Restore Customer"
                                                    >
                                                        <CIcon icon={cilReload} />
                                                    </CButton>
                                                    <CButton
                                                        color="danger"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(item._id)}
                                                        title="Permanently Delete Customer"
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

export default TrashCustomers
