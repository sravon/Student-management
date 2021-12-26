import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const his = useNavigate();
    const logout = () =>{
        localStorage.removeItem('user_id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        his("/");;
    }

    return (
       
<nav className="navbar navbar-expand-lg navbar-light bg-warning">
  <Link className="navbar-brand" to="/home">ccse299</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <Link className="nav-item nav-link active" to="/home">Home <span className="sr-only">(current)</span></Link>
      <Link className="nav-item nav-link" to="/grade">Grades</Link>
      <Link className="nav-item nav-link" to="/course">Courses</Link>
      <Link className="nav-item nav-link" to="/customers">Customers</Link>
      <Link className="nav-item nav-link" to="/students">Students</Link>
      <Link className="nav-item nav-link" to="/clients">Clients</Link>
    </div>
  </div>
  <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
</nav>
    )
}
