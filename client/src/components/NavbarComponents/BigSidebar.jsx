import React from 'react';
import Wrapper from "../../assets/wrappers/BigSidebar";
import { useSelector} from "react-redux";
import {Logo} from "../index";
import NavLinks from "./NavLinks";
import {toggleSidebar} from "../../features/user/UserSlice";

const BigSidebar = () => {
    const {isSideBarOpen, user} = useSelector((store) => store.user)

    return (
        <Wrapper>
            <div className={isSideBarOpen? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSidebar={toggleSidebar} role={user.role}/>
                </div>
            </div>
        </Wrapper>
    );
};

export default BigSidebar;