import React from 'react';
import Wrapper from "../assets/wrappers/ErrorPage";
import image from '../assets/images/not-found.svg'
import {Link} from "react-router-dom";


const Error = () => {
    return (
        <>
            <Wrapper classname={'full-page'}>
                <div>
                    <img src={image} alt="Result not found"/>
                    <h3>Error while loading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto dolor fugiat mollitia nam natus quae? Ab esse non pariatur?</p>
                    <Link to={'/'}>Back to Dashboard</Link>
                </div>
            </Wrapper>
        </>
    );
};

export default Error;