import { React} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  let location =  useLocation();
  let navigate = useNavigate();
  const showAlert = props.showAlert;
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    showAlert("Login to use the App","primary");
    setTimeout(()=>{
      navigate('/login');
    },1500)
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark"  >
      {/* style={{ backgroundColor: "deepskyblue", color: "white" }} */}
      <div className="container-fluid">
        <a className="navbar-brand" href="/">iNoteBook</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? "active":"" }`}aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? "active":"" }`} to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex" role="search">
          <Link className="btn btn-primary" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
          </form>: <form className="d-flex" role="search">
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
          </form>}
        </div>
      </div>
    </nav>
  )
}
