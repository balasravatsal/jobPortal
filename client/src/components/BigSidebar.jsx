import React from 'react';
import Wrapper from "../assets/wrappers/BigSidebar";
import {useSelector} from "react-redux";
import {Logo} from "./index";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
    const { isSideBarOpen } = useSelector((store) => store.user)

    return (
        <Wrapper>
            <div className={isSideBarOpen? 'sidebar-container' : 'sidebar-container show-sidebar'}>
            {/*<div className="sidebar-container show-sidebar">*/}
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    );
};

export default BigSidebar;