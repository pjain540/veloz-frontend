import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'

import { AuthProvider, useAuth } from './context/AuthContext'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Protected route wrapper: redirects to /login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Login guard: if already logged in, redirect to dashboard
const GuestRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route
              path="/login"
              name="Login Page"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              path="*"
              name="Home"
              element={
                <ProtectedRoute>
                  <DefaultLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </HashRouter>
  )
}

export default App
