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
    CForm,
    CFormInput,
    CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { getAllCategory, createCategory, getCategoryById, updateCategoryById, deleteCategoryById } from 'src/api'
import { toast } from 'react-toastify'

const IndexCategory = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        image: null,
    })

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const res = await getAllCategory()
            if (res.success) {
                setCategories(res.data)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
            toast.error('Failed to load categories')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e) => {
        const { name, value, type, files } = e.target
        if (type === 'file') {
            const file = files[0]
            setFormData({ ...formData, [name]: file })
            if (file) {
                setImagePreview(URL.createObjectURL(file))
            }
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name) {
            toast.error('Please enter a category name')
            return
        }

        const data = new FormData()
        data.append('name', formData.name)
        if (formData.image instanceof File) {
            data.append('image', formData.image)
        } else if (editingId && formData.image?.url) {
            data.append('existingImage', JSON.stringify(formData.image))
        }

        setSubmitLoading(true)
        try {
            let response
            if (editingId) {
                response = await updateCategoryById(editingId, data)
                toast.success(response.message || 'Category updated successfully')
            } else {
                response = await createCategory(data)
                toast.success(response.message || 'Category created successfully')
            }
            resetForm()
            fetchCategories()
        } catch (error) {
            toast.error(error.message || 'Operation failed')
        } finally {
            setSubmitLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({ name: '', image: null })
        setImagePreview(null)
        setEditingId(null)
    }

    const handleEdit = async (id) => {
        try {
            const res = await getCategoryById(id)
            if (res.success) {
                const cat = res.data
                setFormData({
                    name: cat.name,
                    image: cat.image || null,
                })
                setEditingId(id)
                if (cat.image?.url) {
                    setImagePreview(cat.image.url)
                } else {
                    setImagePreview(null)
                }
                // Scroll to form
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        } catch (error) {
            toast.error('Failed to fetch category details')
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to permanently delete this category?')) {
            try {
                const response = await deleteCategoryById(id)
                toast.success(response.message || 'Category deleted')
                fetchCategories()
            } catch (error) {
                toast.error(error.message || 'Delete failed')
            }
        }
    }

    return (
        <CRow>
            {/* Left Column: Form */}
            <CCol md={4}>
                <CCard className="mb-4 shadow-sm border-0">
                    <CCardHeader className="py-3">
                        <h5 className="mb-0 fw-bold text-white">
                            {editingId ? 'Edit Category' : 'Add New Category'}
                        </h5>
                    </CCardHeader>
                    <CCardBody className="p-4">
                        <CForm onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <CFormLabel htmlFor="name" className="fw-semibold text-white">Category Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter category name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <CFormLabel htmlFor="image" className="fw-semibold text-white">Category Image</CFormLabel>
                                <CFormInput
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleChange}
                                />
                                {imagePreview && (
                                    <div className="mt-3 p-2 border rounded bg-light text-center" style={{ width: 'fit-content' }}>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{ maxWidth: '100px', height: '100px', objectFit: 'contain' }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="d-grid gap-2">
                                <CButton color="primary" type="submit" disabled={submitLoading} className="py-2 fw-bold">
                                    {submitLoading ? 'Saving...' : editingId ? 'Update Category' : 'Create Category'}
                                </CButton>
                                {editingId && (
                                    <CButton color="secondary" variant="outline" onClick={resetForm}>
                                        Cancel Edit
                                    </CButton>
                                )}
                            </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Right Column: Table */}
            <CCol md={8}>
                <CCard className="mb-4 shadow-sm border-0">
                    <CCardHeader className="py-3">
                        <h5 className="mb-0 fw-bold text-white">Category List</h5>
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
                                        <CTableHeaderCell className="bg-body-tertiary">Image</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary text-center">Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {categories.length === 0 ? (
                                        <CTableRow>
                                            <CTableDataCell colSpan="4" className="text-center py-4 text-muted">
                                                No categories found.
                                            </CTableDataCell>
                                        </CTableRow>
                                    ) : (
                                        categories.map((item, index) => (
                                            <CTableRow key={item._id}>
                                                <CTableDataCell className="text-center text-muted">
                                                    {index + 1}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <CAvatar
                                                        src={item.image?.url || 'https://placehold.co/40'}
                                                        size="md"
                                                        className="border shadow-sm"
                                                    />
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="fw-bold text-white">{item.name}</div>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-center text-nowrap">
                                                    <CButton
                                                        color="info"
                                                        variant="outline"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleEdit(item._id)}
                                                    >
                                                        <CIcon icon={cilPencil} />
                                                    </CButton>
                                                    <CButton
                                                        color="danger"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(item._id)}
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

export default IndexCategory
