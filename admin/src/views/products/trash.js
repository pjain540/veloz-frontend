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
    CAvatar,
    CButton,
    CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilReload, cilTrash } from '@coreui/icons'
import { showTrashProduct, restoreProduct, deleteProduct } from 'src/api'
import { toast } from 'react-toastify'

const TrashProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTrashProducts = async () => {
        try {
            const res = await showTrashProduct()
            if (res.success) {
                setProducts(res.data)
            }
        } catch (error) {
            console.error('Error fetching trash products:', error)
            toast.error('Failed to load trash products')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTrashProducts()
    }, [])

    const handleRestore = async (id) => {
        if (window.confirm('Are you sure you want to restore this product?')) {
            try {
                const response = await restoreProduct(id)
                toast.success(response.message || 'Product restored successfully')
                fetchTrashProducts()
            } catch (error) {
                toast.error(error.message || 'Failed to restore product')
            }
        }
    }

    const handleDeletePermanent = async (id) => {
        if (window.confirm('WARNING: This will permanently delete the product. Proceed?')) {
            try {
                const response = await deleteProduct(id)
                toast.success(response.message || 'Product deleted permanently')
                fetchTrashProducts()
            } catch (error) {
                toast.error(error.message || 'Failed to delete product')
            }
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4 shadow-sm">
                    <CCardHeader className="py-3">
                        <h5 className="mb-0 fw-bold text-white">Trash Products</h5>
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
                                        <CTableHeaderCell className="bg-body-tertiary">Product</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Category</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Cooking Time</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Price / Sale Price</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {products.length === 0 ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan="6" className="text-center py-4 text-muted">
                                                Trash is empty.
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : (
                                        products.map((item, index) => (
                                            <CTableRow key={item._id}>
                                                <CTableDataCell className="text-center text-muted">
                                                    {index + 1}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <CAvatar
                                                            src={item.image?.url || 'https://placehold.co/40'}
                                                            size="md"
                                                            className="border rounded shadow-sm"
                                                        />
                                                        <div>
                                                            <div className="fw-bold text-white">{item.name}</div>
                                                        </div>
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <span className="badge bg-light text-dark border fw-normal px-2 py-1">
                                                        {item.category?.name || 'Uncategorized'}
                                                    </span>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center">
                                                    <div className="small text-muted">{item.cookingTime || 'N/A'}</div>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center">
                                                    <div className="fw-bold">
                                                        ${item.price}
                                                        {item.salePrice && (
                                                            <span className="text-danger ms-1" style={{ fontSize: '0.85em' }}>
                                                                / ${item.salePrice}
                                                            </span>
                                                        )}
                                                    </div>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center text-nowrap">
                                                    <CButton
                                                        color="success"
                                                        variant="outline"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleRestore(item._id)}
                                                        title="Restore Product"
                                                    >
                                                        <CIcon icon={cilReload} />
                                                    </CButton>
                                                    <CButton
                                                        color="danger"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDeletePermanent(item._id)}
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

export default TrashProducts
