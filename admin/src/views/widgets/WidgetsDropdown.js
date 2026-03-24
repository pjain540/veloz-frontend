import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol, CCard, CCardBody, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilCart,
  cilPeople,
  cilEnvelopeClosed,
  cilBasket,
} from '@coreui/icons'
import { getDashboardCounts } from 'src/api'

const StatCard = ({ title, value, icon, gradient, loading }) => (
  <CCard
    className="border-0 shadow-sm"
    style={{
      background: gradient,
      borderRadius: '16px',
      overflow: 'hidden',
      minHeight: '130px',
    }}
  >
    <CCardBody className="d-flex align-items-center justify-content-between p-4">
      <div>
        <div
          className="text-white fw-semibold mb-1"
          style={{ fontSize: '0.85rem', opacity: 0.85, letterSpacing: '0.5px', textTransform: 'uppercase' }}
        >
          {title}
        </div>
        {loading ? (
          <CSpinner color="light" size="sm" className="mt-2" />
        ) : (
          <div className="text-white fw-bold" style={{ fontSize: '2.2rem', lineHeight: 1.1 }}>
            {value ?? '—'}
          </div>
        )}
      </div>
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <CIcon icon={icon} style={{ width: 28, height: 28, color: '#fff' }} />
      </div>
    </CCardBody>
  </CCard>
)

const CARDS = [
  {
    key: 'productCounts',
    title: 'Products',
    icon: cilBasket,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    key: 'orderCounts',
    title: 'Orders',
    icon: cilCart,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    key: 'customerCounts',
    title: 'Customers',
    icon: cilPeople,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    key: 'contactCounts',
    title: 'Contacts',
    icon: cilEnvelopeClosed,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
]

const WidgetsDropdown = ({ className }) => {
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardCounts()
      .then((res) => setCounts(res.data || {}))
      .catch((err) => console.error('Failed to load dashboard counts', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <CRow className={className} xs={{ gutter: 4 }}>
      {CARDS.map((card) => (
        <CCol key={card.key} xs={12} sm={6} xl={3}>
          <StatCard
            title={card.title}
            value={counts[card.key]}
            icon={card.icon}
            gradient={card.gradient}
            loading={loading}
          />
        </CCol>
      ))}
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
}

export default WidgetsDropdown
