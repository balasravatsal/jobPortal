import React from 'react';
import {JobContainer, SearchContainer} from "../../components";

const AllJobs = () => {
    const containerStyle = {
        margin: '20px', // Set margin value as per your requirement
    };

    return (
        <div style={containerStyle}>
            <SearchContainer/>
            <JobContainer/>
        </div>
    );
};

export default AllJobs;
