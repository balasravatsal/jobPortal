import React from 'react';
import links from "../../utils/links";
import {NavLink} from "react-router-dom";

const NavLinks = ({ toggleSidebar, role }) => {
    return (
        <div className="nav-links">
            {links.map((link) => {
                const { text, path, id, icon } = link;

                if (role === 'employee' && id === 3) {
                    // Skip rendering the "Add Job" link for employees
                    return null;
                }
                else {
                    return (
                        <NavLink
                            to={path}
                            className={({isActive}) => {
                                return isActive ? 'nav-link active' : 'nav-link';
                            }}
                            key={id}
                            onClick={toggleSidebar}
                        >
                            <span className={'icon'}>{icon}</span>
                            {text}
                        </NavLink>
                    );
                }
            })}
        </div>
    );
};


export default NavLinks;