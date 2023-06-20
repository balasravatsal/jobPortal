import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
// import Logo from './Logo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {loginUser} from "../features/user/UserSlice";
import {logoutUser, toggleSidebar} from '../features/user/UserSlice';

const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const toggle = () => {
        dispatch(toggleSidebar());
    };

    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={toggle}>
                    <FaAlignLeft />
                </button>
                <div>
                    {/*<Logo />*/}
                    <h3 className='logo-text'>dashboard</h3>
                </div>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => setShowLogout(!showLogout)}
                    >
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button
                            type='button'
                            className='dropdown-btn'
                            onClick={() => dispatch(logoutUser())}
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};
export default Navbar;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Sidebar.css';
//
// const Navbar = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//
//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };
//
//     return (
//         <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//             <div className="sidebar-header">
//                 <button className="sidebar-toggle" onClick={toggleSidebar}>
//                     <i className="fa fa-bars"></i>
//                 </button>
//             </div>
//             <ul className="sidebar-menu">
//                 <li>
//                     <Link to="/all-jobs">
//                         <i className="fa fa-briefcase"></i>
//                         <span>All Job</span>
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/add-job">
//                         <i className="fa fa-plus"></i>
//                         <span>Add Job</span>
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/profile">
//                         <i className="fa fa-user"></i>
//                         <span>Profile</span>
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/">
//                         <i className="fa fa-chart-bar"></i>
//                         <span>Stats</span>
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//     );
// };
//
// export default Navbar;
