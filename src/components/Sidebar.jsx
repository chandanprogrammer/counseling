import React from 'react'
import { use } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigator = useNavigate();
  return (
    <div className="dashboard-sidebar">
    <div className="dashboard-sidebar-heading " onClick={()=>{
      navigator('/dashboard');
    }}>
      <img
        className="home-icon icon"
        src="../../images/home_1.png"
        alt=""
      />
      <span className='active-link'>Dashboard</span>
    </div>
    <ul>
      <li>
        <img
          className=" icon"
          src="../../images/group.png"
          alt=""
        />
        <Link to="/dashboard/all-students-list">All Students List</Link>
      </li>
      <li>
        <img
          className=" icon"
          src="../../images/check.png"
          alt=""
        />
        <Link to="/dashboard/selection"> Selection</Link>
      </li>
      <li>
        <img
          className=" icon"
          src="../../images/selected_list.png"
          alt=""
        />
        <Link to="/dashboard/students-selection">Registrated Students</Link>
      </li>
      <li>
        <img
          className=" icon"
          src="../../images/email.png"
          alt=""
        />
        <Link to="/dashboard/send-mail">Send Mail</Link>
      </li>
      
    </ul>
  </div>
  )
}

export default Sidebar
