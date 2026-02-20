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
import { cilReload, cilTrash } from '@coreui/icons'
import { getTrashedcontact, restoreContact, deletecontact } from 'src/api'
import { toast } from 'react-toastify'
import { timeAgo } from 'src/utils/formatDate'

const TrashContacts = () => {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState('')

    const fetchTrashedContacts = async () => {
        try {
            const res = await getTrashedcontact()
            if (res.success) {
                setContacts(res.data)
            }
        } catch (error) {
            console.error('Error fetching trashed contacts:', error)
            toast.error('Failed to load trashed contacts')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTrashedContacts()
    }, [])

    const handleRestore = async (id) => {
        if (window.confirm('Are you sure you want to restore this contact?')) {
            try {
                const response = await restoreContact(id)
                if (response.success) {
                    toast.success(response.message || 'Contact restored successfully')
                    fetchTrashedContacts()
                } else {
                    toast.error(response.message || 'Failed to restore contact')
                }
            } catch (error) {
                console.error('Error restoring contact:', error)
                toast.error('An error occurred while restoring the contact')
            }
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to permanently delete this contact? This action cannot be undone.')) {
            try {
                const response = await deletecontact(id)
                if (response.success) {
                    toast.success(response.message || 'Contact deleted permanently')
                    fetchTrashedContacts()
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
                        <h5 className="mb-0 fw-bold text-white">Trash Contacts</h5>
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
                                        <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Phone</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Message</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Trashed At</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {contacts.length === 0 ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan="6" className="text-center py-4 text-muted">
                                                No trashed contacts found.
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : (
                                        contacts.map((item, index) => (
                                            <CTableRow key={item._id}>
                                                <CTableDataCell className="text-center text-muted">
                                                    {index + 1}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="fw-bold text-white">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
                                                    <div className="small text-muted">{item.email}</div>
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
                                                    <div className="small text-muted" title={item.deletedAt}>
                                                        {timeAgo(item.deletedAt || item.updatedAt)}
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center text-nowrap">
                                                    <CButton
                                                        color="success"
                                                        variant="outline"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleRestore(item._id)}
                                                        title="Restore Contact"
                                                    >
                                                        <CIcon icon={cilReload} />
                                                    </CButton>
                                                    <CButton
                                                        color="danger"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(item._id)}
                                                        title="Permanently Delete"
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

export default TrashContacts
