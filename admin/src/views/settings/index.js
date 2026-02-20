import React, { useState, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CRow,
    CSpinner,
} from '@coreui/react'
import { createSetting, updateSetting, getSettingBySlug, getAllSetting } from 'src/api'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const Settings = () => {
    const [price, setPrice] = useState('')
    const [shippingPrice, setShippingPrice] = useState('')
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [settingId, setSettingId] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const SETTING_NAME = 'free shipping above'
    const SETTING_SLUG = slug

    const fetchAllSettings = async () => {
        try {
            const res = await getAllSetting()
            if (res.success && res.data) {
                const freeShipping = res.data.find(s => s.name === SETTING_NAME)
                if (freeShipping) {
                    setSettingId(freeShipping._id)
                    setPrice(freeShipping.value?.price || '')
                    setShippingPrice(freeShipping.value?.shippingPrice || '')
                    // If we are on the base route but the setting exists, we could navigate to the slugged route
                    if (!SETTING_SLUG && freeShipping.slug) {
                        navigate(`/settings/index/${freeShipping.slug}`, { replace: true })
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching all settings:', error)
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        fetchAllSettings()
    }, [SETTING_SLUG])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            name: SETTING_NAME,
            value: {
                price: Number(price),
                shippingPrice: Number(shippingPrice)
            }
        }

        try {
            if (SETTING_SLUG) {
                const res = await updateSetting(SETTING_SLUG, payload)
                toast.success(res.message || 'Setting updated successfully')
                navigate(`/settings/index/${res.data.slug}`)

            } else {
                const res = await createSetting(payload)

                toast.success(res.message || 'Setting created successfully')
                navigate(`/settings/index/${res.data.slug}`)
                if (res.data?._id) {
                    setSettingId(res.data._id)
                }
            }
        } catch (error) {
            console.error('Error saving setting:', error)
            toast.error(error.message || 'Failed to save setting')
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className="text-center p-5">
                <CSpinner color="primary" />
            </div>
        )
    }

    return (
        <CRow>
            <CCol xs={12} md={6}>
                <CCard className="mb-4 shadow-sm border-0">
                    <CCardBody className="p-4">
                        <h5 className="mb-4 fw-bold text-white">Free Shipping Above</h5>
                        <CForm onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <CFormInput
                                    type="number"
                                    id="freeShippingPrice"
                                    placeholder="Enter free shipping threshold price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    size="lg"
                                    required
                                />
                            </div>
                            <h5 className="mb-4 fw-bold text-white">Shipping Price</h5>
                            <div className="mb-3">
                                <CFormInput
                                    type="number"
                                    id="shippingPrice"
                                    placeholder="Enter shipping price"
                                    value={shippingPrice}
                                    onChange={(e) => setShippingPrice(e.target.value)}
                                    size="lg"
                                    required
                                />
                            </div>
                            <div className="text-end">
                                <CButton color="primary" type="submit" className="px-5" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </CButton>
                            </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Settings
