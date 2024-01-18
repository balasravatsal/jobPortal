import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Wrapper from "../../assets/wrappers/JobsContainer";
import Loading from "../Loading";
import {getAllJobs} from "../../features/allJobs/allJobsSlice";
import Job from "./Job";

const JobContainer = () => {

    const { jobs, isLoading, search, searchStatus, searchType } = useSelector(store => store.allJobs)
    const dispatch = useDispatch()


    useEffect(() =>{
        dispatch(getAllJobs())
    // }, [dispatch, search, searchStatus, searchType])
    }, [])

    if(isLoading) {
        return(
            <Loading/>
        )
    }

    if(jobs.length === 0) {
        return (
            <Wrapper>
                <h3>No Jobs Found</h3>
            </Wrapper>
        )
    }


    return (
        <>
            <Wrapper style={{margin: '3rem'}}>
                <h5>Jobs Info</h5>
                <div className={'jobs'}>
                    { jobs.map((job) => {
                        // console.log(job)
                        return <Job key={job.job_id} {...job} />
                    }) }
                </div>
            </Wrapper>
        </>
    );
};

export default JobContainer;