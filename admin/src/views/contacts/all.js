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
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilEyedropper as cilEye } from '@coreui/icons'
import { getAllContacts, softDeletecontact } from 'src/api'
import { toast } from 'react-toastify'
import { timeAgo } from 'src/utils/formatDate'


const AllContacts = () => {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState('')

    const fetchContacts = async () => {
        try {
            const res = await getAllContacts()
            if (res.success) {
                setContacts(res.data)
            }
        } catch (error) {
            console.error('Error fetching contacts:', error)
            toast.error('Failed to load contacts')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContacts()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                const response = await softDeletecontact(id)
                if (response.success) {
                    toast.success(response.message || 'Contact deleted successfully')
                    fetchContacts()
                } else {
                    toast.error(response.message || 'Failed to delete contact')
                }
            } catch (error) {
                console.error('Error deleting contact:', error)
                toast.error('An error occurred while deleting the contact')
            }
        }
    }

    const handleViewMessage = (message) => {
        setSelectedMessage(message)
        setVisible(true)
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4 shadow-sm">
                    <CCardHeader className="py-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-bold text-white">All Contacts</h5>
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
                                        <CTableHeaderCell className="bg-body-tertiary">Contact</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Phone</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Message</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Created At</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {contacts.length === 0 ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan="6" className="text-center py-4 text-muted">
                                                No contacts found.
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : (
                                        contacts.map((item, index) => (
                                            <CTableRow key={item._id}>
                                                <CTableDataCell className="text-center text-muted">
                                                    {index + 1}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div>
                                                        <div className="fw-bold text-white">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
                                                        <div className="small text-muted">{item.email}</div>
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="small text-muted">{item.phone}</div>
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <CButton
                                                        color="primary"
                                                        // variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleViewMessage(item.message)}
                                                    >
                                                        View Message
                                                    </CButton>
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="small text-muted">{timeAgo(item.createdAt)}</div>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center text-nowrap">
                                                    <CButton
                                                        color="danger"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(item._id)}
                                                        title="Delete Contact"
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

            <CModal visible={visible} onClose={() => setVisible(false)} centered alignment='center'>
                <CModalHeader>
                    <CModalTitle>Contact Message</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p className="text-white">{selectedMessage || 'No message provided.'}</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    )
}

export default AllContacts
