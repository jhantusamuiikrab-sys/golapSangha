import React from 'react'
import BillsDashboard from './BillsDashboard'

function Dashboard({baseUrl}) {
  return (
    <>
      <BillsDashboard baseUrl={baseUrl}/>
    </>
  )
}

export default Dashboard
