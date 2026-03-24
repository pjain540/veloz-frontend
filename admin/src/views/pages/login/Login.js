import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilEnvelopeClosed } from '@coreui/icons'
import { useAuth } from '../../../context/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (value && !EMAIL_REGEX.test(value)) {
      setEmailError('Please enter a valid email address.')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    if (emailError) {
      return
    }

    setIsLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1>Admin Login</h1>
                  <p className="text-body-secondary">Sign in to your admin account</p>

                  {error && <CAlert color="danger">{error}</CAlert>}

                  <CInputGroup className="mb-1">
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={handleEmailChange}
                      invalid={!!emailError}
                      required
                    />
                  </CInputGroup>
                  {emailError && (
                    <div className="text-danger small mb-3" style={{ paddingLeft: 4 }}>
                      {emailError}
                    </div>
                  )}
                  {!emailError && <div className="mb-3" />}

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>

                  <CButton color="primary" type="submit" className="px-4 w-100" disabled={isLoading}>
                    {isLoading ? <CSpinner size="sm" /> : 'Login'}
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
