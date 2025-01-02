import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <>
      <div className="container">
        <div className='error-section flex-center'>
          <img src="../../images/error.png" alt="" />
          <h2>404</h2>
          <p className='msg'>Oops, This Page Not Found</p>
          <p className='go-back-home'><Link to="/">Go back home</Link></p>
        </div>
      </div>
    </>
  )
}

export default Error404
