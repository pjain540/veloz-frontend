import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilStar } from '@coreui/icons'
import { createProduct, getAllCategory, getProductById, updateProduct, getReviewsByProductId } from 'src/api'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { timeAgo } from 'src/utils/formatDate'

const CreateProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditMode = !!id
    const [validated, setValidated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [imagePreview, setImagePreview] = useState(null)
    const [galleryPreviews, setGalleryPreviews] = useState([])
    const [reviews, setReviews] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        salePrice: '',
        cookingTime: '',
        isBestseller: false,
        isShowAtHome: false,
        keyDetails: '',
        packContain: '',
        ingredients: '',
        instructions: '',
        nutritionalValue: '',
        category: '',
        // type: '',
        image: null,
        gallery: [],
    })

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                setLoading(true)
                try {
                    const res = await getProductById(id)
                    if (res.success) {
                        const product = res.data
                        setFormData({
                            name: product.name || '',
                            description: product.description || '',
                            price: product.price || '',
                            salePrice: product.salePrice || '',
                            cookingTime: product.cookingTime || '',
                            isBestseller: product.isBestseller || false,
                            isShowAtHome: product.isShowAtHome || false,
                            keyDetails: product.keyDetails || '',
                            packContain: product.packContain || '',
                            ingredients: product.ingredients || '',
                            instructions: product.instructions || '',
                            nutritionalValue: product.nutritionalValue || '',
                            category: product.category?._id || '',
                            // type: product.type || '',
                            image: product.image || null,
                            gallery: product.gallery || [],
                        })
                        if (product.image?.url) setImagePreview(product.image.url)
                        if (product.gallery) {
                            setGalleryPreviews(product.gallery.map((img) => img.url))
                        }
                    }
                } catch (error) {
                    console.error('Error fetching product:', error)
                    toast.error('Failed to load product details')
                } finally {
                    setLoading(false)
                }
            }
            const fetchReviews = async () => {
                try {
                    const res = await getReviewsByProductId(id)
                    if (res.success) {
                        setReviews(res.data)
                    }
                } catch (error) {
                    console.error('Error fetching reviews:', error)
                }
            }
            fetchProduct()
            fetchReviews()
        }
    }, [id, isEditMode])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategory()
                if (res.success) {
                    setCategories(res.data)
                }
            } catch (error) {
                console.error('Error fetching categories:', error)
                toast.error('Failed to load categories')
            }
        }
        fetchCategories()
    }, [])

    // Modules for ReactQuill
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'clean'],
        ],
    }

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked })
        } else if (type === 'file') {
            if (name === 'gallery') {
                const selectedFiles = Array.from(files)
                const totalFiles = [...formData.gallery, ...selectedFiles]
                if (totalFiles.length > 5) {
                    toast.error('You can only upload a maximum of 5 images to the gallery')
                    e.target.value = '' // Reset input
                    return
                }
                setFormData({ ...formData, gallery: totalFiles })

                // Create previews
                const previews = selectedFiles.map(file => URL.createObjectURL(file))
                setGalleryPreviews(prev => [...prev, ...previews])
            } else {
                const file = files[0]
                setFormData({ ...formData, [name]: file })
                if (file) {
                    setImagePreview(URL.createObjectURL(file))
                }
            }
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleQuillChange = (name) => (value) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        // const form = event.currentTarget
        // if (form.checkValidity() === false) {
        //     // event.preventDefault()
        //     event.stopPropagation()
        //     setValidated(true)
        //     return
        // }
        setValidated(true)
        setLoading(true)

        try {
            if (isEditMode) {
                const response = await updateProduct(id, formData)
                toast.success(response.message)
            } else {
                const response = await createProduct(formData)
                toast.success(response.message)
                if (response.data?._id) {
                    navigate(`/product/${response.data._id}/edit`)
                }
            }
        } catch (error) {
            console.error('Failed to create product:', error)
            toast.error(`Error: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4 shadow-sm">
                    <CCardHeader className="py-3">
                        <h5 className="mb-0 fw-bold text-white">
                            {isEditMode ? 'Edit Product' : 'Create New Product'}
                        </h5>
                    </CCardHeader>
                    <CCardBody className="p-4">
                        <CForm
                            className="row g-4"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                            method='POST'
                        >
                            {/* General Information Section */}
                            <CCol md={12}>
                                <h6 className="text-muted border-bottom pb-2 mb-3 fw-bold">General Information</h6>
                            </CCol>
                            <CCol md={4}>
                                <CFormLabel htmlFor="name" className="fw-semibold">Product Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter product name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </CCol>

                            <CCol md={4}>
                                <CFormLabel htmlFor="category" className="fw-semibold">Category</CFormLabel>
                                <CFormSelect
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option disabled value="">Choose category...</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>

                            {/* pricing details */}
                            <CCol md={4}>
                                <CFormLabel htmlFor="price" className="fw-semibold">Price (₹)</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormLabel htmlFor="salePrice" className="fw-semibold">Sale Price (₹)</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="salePrice"
                                    name="salePrice"
                                    placeholder="0.00"
                                    value={formData.salePrice}
                                    onChange={handleChange}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormLabel htmlFor="cookingTime" className="fw-semibold">Cooking Time (mins)</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="cookingTime"
                                    name="cookingTime"
                                    placeholder="e.g. 15-20"
                                    value={formData.cookingTime}
                                    onChange={handleChange}
                                />
                            </CCol>
                            {/* <CCol md={4}>
                                <CFormLabel htmlFor="type" className="fw-semibold">Type</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="type"
                                    name="type"
                                    placeholder="e.g. Gravy, Dry"
                                    value={formData.type}
                                    onChange={handleChange}
                                />
                            </CCol> */}

                            {/* Rich Text Editors Section */}
                            <CCol md={12} className="mt-5">
                                <h6 className="text-muted border-bottom pb-2 mb-3 fw-bold">Detailed Content</h6>
                            </CCol>

                            <CCol md={12} className="mb-4">
                                <CFormLabel className="fw-semibold">Description</CFormLabel>
                                <div className="">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.description}
                                        onChange={handleQuillChange('description')}
                                        modules={quillModules}
                                        style={{ height: '200px', marginBottom: '50px' }}
                                    />
                                </div>
                            </CCol>

                            <CCol md={6} className="mb-4">
                                <CFormLabel className="fw-semibold">Key Details</CFormLabel>
                                <div className="">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.keyDetails}
                                        onChange={handleQuillChange('keyDetails')}
                                        modules={quillModules}
                                        style={{ height: '150px', marginBottom: '50px' }}
                                    />
                                </div>
                            </CCol>

                            <CCol md={6} className="mb-4">
                                <CFormLabel className="fw-semibold">Pack Contain</CFormLabel>
                                <div className="">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.packContain}
                                        onChange={handleQuillChange('packContain')}
                                        modules={quillModules}
                                        style={{ height: '150px', marginBottom: '50px' }}
                                    />
                                </div>
                            </CCol>

                            <CCol md={6} className="mb-4">
                                <CFormLabel className="fw-semibold">Ingredients</CFormLabel>
                                <div className="">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.ingredients}
                                        onChange={handleQuillChange('ingredients')}
                                        modules={quillModules}
                                        style={{ height: '150px', marginBottom: '50px' }}
                                    />
                                </div>
                            </CCol>

                            <CCol md={6} className="mb-4">
                                <CFormLabel className="fw-semibold">Instructions</CFormLabel>
                                <div className="">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.instructions}
                                        onChange={handleQuillChange('instructions')}
                                        modules={quillModules}
                                        style={{ height: '150px', marginBottom: '50px' }}
                                    />
                                </div>
                            </CCol>

                            <CCol md={12} className="mb-4">
                                <CFormLabel className="fw-semibold">Nutritional Value</CFormLabel>
                                <div className="">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.nutritionalValue}
                                        onChange={handleQuillChange('nutritionalValue')}
                                        modules={quillModules}
                                        style={{ height: '150px', marginBottom: '50px' }}
                                    />
                                </div>
                            </CCol>

                            {/* Media Section */}
                            <CCol md={12} className="mt-5">
                                <h6 className="text-muted border-bottom pb-2 mb-3 fw-bold">Media Assets</h6>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="image" className="fw-semibold">Main Image</CFormLabel>
                                <CFormInput
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleChange}
                                    required
                                />
                                {imagePreview && (
                                    <div className="mt-2 text-center border p-1 rounded bg-light" style={{ width: 'fit-content' }}>
                                        <img src={imagePreview} alt="Main Preview" style={{ maxWidth: '60px', height: '60px', objectFit: 'contain' }} />
                                    </div>
                                )}
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="gallery" className="fw-semibold">Gallery (Multiple)</CFormLabel>
                                <CFormInput
                                    type="file"
                                    id="gallery"
                                    name="gallery"
                                    multiple
                                    onChange={handleChange}
                                />
                                {galleryPreviews.length > 0 && (
                                    <div className="mt-2 d-flex flex-wrap gap-2 p-1 border rounded bg-light" style={{ width: 'fit-content' }} >
                                        {galleryPreviews.map((preview, index) => (
                                            <div key={index} className="border rounded bg-white overflow-hidden" style={{ width: '60px', height: '60px' }}>
                                                <img src={preview} alt={`Gallery ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CCol>

                            {/* Configuration Section */}
                            <CCol md={12} className="mt-5">
                                <h6 className="text-muted border-bottom pb-2 mb-3 fw-bold">Product Settings</h6>
                            </CCol>
                            <CCol md={6}>
                                <div className="border rounded p-3">
                                    <CFormCheck
                                        id="isBestseller"
                                        name="isBestseller"
                                        label="Is Bestseller"
                                        checked={formData.isBestseller}
                                        onChange={handleChange}
                                    />
                                </div>
                            </CCol>
                            <CCol md={6}>
                                <div className="border rounded p-3">
                                    <CFormCheck
                                        id="isShowAtHome"
                                        name="isShowAtHome"
                                        label="Show at Home Screen"
                                        checked={formData.isShowAtHome}
                                        onChange={handleChange}
                                    />
                                </div>
                            </CCol>

                            {/* Reviews Section */}
                            {isEditMode && (
                                <CCol md={12} className="mt-5">
                                    <h6 className="text-muted border-bottom pb-2 mb-3 fw-bold">Product Reviews</h6>
                                    {reviews.length > 0 ? (
                                        <div className="reviews-list">
                                            {reviews.map((review) => (
                                                <div key={review._id} className="review-item mb-3 p-3 border rounded">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <div className="fw-bold text-white">
                                                                {review.name.charAt(0).toUpperCase() + review.name.slice(1)}
                                                            </div>
                                                            <div className="mb-2 text-muted italic">
                                                                "{review.message}"
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="fw-bold d-flex gap-1">
                                                                Rating:
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <span key={star}>
                                                                        <CIcon
                                                                            icon={cilStar}
                                                                            className={star <= review.rating ? 'text-warning' : 'text-secondary'}
                                                                            size="sm"
                                                                        />
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <div className="small text-muted text-end">
                                                                {timeAgo(review.createdAt)}
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-muted italic">No reviews yet for this product.</p>
                                    )}
                                </CCol>
                            )}

                            {/* Submit Section */}
                            <CCol xs={12} className="mt-5 border-top pt-4 text-end">
                                <CButton color="secondary" variant="outline" className="me-2 px-4" onClick={() => window.history.back()}>
                                    Cancel
                                </CButton>
                                <CButton color="primary" type="submit" className="px-5" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Product'}
                                </CButton>
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default CreateProduct
