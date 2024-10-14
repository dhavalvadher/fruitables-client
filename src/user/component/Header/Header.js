import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import DayNightToggle from 'react-day-and-night-toggle';
import { getProducts } from '../../../redux/action/products.action';
import { getCategories } from '../../../redux/action/category.action';
import { getSubData } from '../../../redux/slice/subcategory.slice';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { logout } from '../../../redux/slice/auth.slice';
function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [subcat, setSubcat] = useState([]);
  const [showSubcat, setShowSubcat] = useState(false);

  const cart = useSelector(state => state.cart);
  const products = useSelector(state => state.products.products);
  const categories = useSelector(state => state.categories.categories);
  const subcategories = useSelector(state => state.subcategories.subcategories);
 


  const totalQuantity = cart.cart.reduce((acc, item) => acc + item.qty, 0);

  

  const themeContext = useContext(ThemeContext);

  const handleThemeToggle = () => {
    themeContext.toggleTheme(themeContext.theme);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getSubData());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleCategory = (category_id) => {
    const subdata = subcategories.filter((v) => v.category_id === category_id);
    setSubcat(subdata);
    setShowSubcat(true);
  };

  const handleDisplay = (subcategory_id) => {
    const produtdata = products.filter((v) => v.subcategory_id === subcategory_id);
    console.log(produtdata);
    navigate('/Shop', { state: { subcategory_id } });
  };

  const {isAuthentication,users} = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout(users._id));
  }

  return (
    <div>
      <div className={`container-fluid fixed-top ${themeContext.theme}`}>
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-secondary" />
                <a href="#" className="text-white">123 Street, New York</a>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-secondary" />
                <a href="#" className="text-white">Email@Example.com</a>
              </small>
            </div>
            <div className="top-link pe-2">
              <a href="#" className="text-white">
                <small className="text-white mx-2">Privacy Policy</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white mx-2">Terms of Use</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white ms-2">Sales and Refunds</small>
              </a>
            </div>
          </div>
        </div>

        <div className={`container px-0 ${themeContext.theme}`}>
          <nav className={`navbar navbar-light bg-white navbar-expand-xl ${themeContext.theme}`}>
            <NavLink to="/" className={`navbar-brand light ${themeContext.theme}`}>
              <h1 className={`text-primary display-6 ${themeContext.theme}`}>Fruitables</h1>
            </NavLink>
            <button className={`navbar-toggler py-2 px-3 ${themeContext.theme}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="fa fa-bars text-primary" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <NavLink to="/" className={`nav-item nav-link active  ${themeContext.theme}`}>Home</NavLink>
                <NavLink to="/Shop" className="nav-item nav-link">Shop</NavLink>
                <NavLink to="/Chat" className="nav-item nav-link">Chat</NavLink>
                <NavLink to="/Shop_Detail" className="nav-item nav-link">Shop Detail</NavLink>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0 ">
                    <NavLink to="/Cart" className="dropdown-item ">Cart</NavLink>
                    <NavLink to="/Checkout" className="dropdown-item ">Checkout</NavLink>
                    <NavLink to="/Testimonial" className="dropdown-item ">Testimonial</NavLink>
                    <NavLink to="/404" className="dropdown-item ">404 Page</NavLink>
                  </div>
                </div>
                <div className="nav-item dropdown main">
                  <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Categories</a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    {categories.map((v) => (
                      <a
                        href="#"
                        key={v._id}
                        onMouseEnter={() => handleCategory(v._id)}
                        className="dropdown-item light"
                      >
                        {v.name}
                      </a>
                    ))}
                  </div>
                  {/* {handleAddtoCartshowSubcat && (
                    <div className="dropdown-menu m-0 bg-secondary rounded-0 " id='subright'>
                      {subcat.map((v) => (
                        <a
                          href="#"
                          key={v._id}
                          onClick={() => handleDisplay(v._id)}
                          className="dropdown-item"
                        >
                          {v.name}
                        </a>
                      ))}
                    </div>
                  )} */}
                </div>
                <NavLink to="/Contact" className={`nav-item nav-link ligh ${themeContext.theme}`}>Contact</NavLink>
                <NavLink to='/Register' className={`nav-item nav-link light ${themeContext.theme}`}>Register</NavLink>
                <NavLink to='/Login' className={`nav-item nav-link light ${themeContext.theme}`}>Login</NavLink>
              </div>
              <div className="d-flex m-3 me-0">
                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal">
                  <i className="fas fa-search text-primary" />
                </button>
                <NavLink to="/Card" className={`position-relative me-4 my-auto ${themeContext.theme}`}>
                  <i className="fa fa-shopping-bag fa-2x" />
                  <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: '-5px', left: '15px', height: '20px', minWidth: '20px' }}>
                    {totalQuantity}
                  </span>
                </NavLink>
                {
                  isAuthentication ?
                    <IconButton onClick={handleLogout} className="position-relative me-4 my-auto">
                    <LogoutIcon/>
                  </IconButton>:
                    <NavLink to={`/authForm`} href="#" className="my-auto">
                      <i className="fas fa-user fa-2x" />
                    </NavLink>
                }

              </div>
            </div>
            <div>
              <DayNightToggle
                onChange={() => setIsDarkMode(!isDarkMode)}
                checked={isDarkMode}
                onClick={handleThemeToggle}
              />
            </div>
          </nav>
        </div>
      </div>

      <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="searchModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="searchModalLabel">Search by keyword</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon" />
                <span id="search-icon" className="input-group-text p-3"><i className="fa fa-search" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;



