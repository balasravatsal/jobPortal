import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllJobs} from "../../features/allJobs/allJobsSlice";
import Wrapper from "../../assets/wrappers/JobsContainer";
import Job from "./Job";

const MyJobs = () => {
    const [myJobs, setMyJobs] = useState([])
    const { jobs } = useSelector(store => store.allJobs)
    const {user_id} = useSelector(store=>store.user.user)
    const dispatch = useDispatch()


    useEffect(() =>{
        dispatch(getAllJobs())
        setMyJobs(jobs.filter(job => job.created_by === user_id))
    // }, [dispatch, jobs, search, searchStatus, searchType, user_id])
    // eslint-disable-next-line
    }, [])


    if(myJobs.length === 0) {
        return (
            <Wrapper>
                <h3>No Jobs Found</h3>
            </Wrapper>
        )
    }


    return (
        <>
            <Wrapper>
                <h5>Jobs Posted by You</h5>
                <div className={'jobs'}>
                    { myJobs.map((myJob) => {
                        return <Job key={myJob.job_id} {...myJob} />
                    }) }
                </div>
            </Wrapper>
        </>
    );

};

export default MyJobs;