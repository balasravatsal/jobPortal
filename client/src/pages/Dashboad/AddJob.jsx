import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FormRowSelect from "../../components/FormRowSelect";
import {clearInput, createJob, editJob, handleChange} from "../../features/job/jobSlice";
import {getUserFromLocalStorage} from "../../utils/localStorage";
import {useEffect} from "react";
import {loginUser} from "../../features/user/UserSlice";

const AddJob = () => {
    let {
        isLoading,
        position,
        company,
        job_location: job_location,
        job_type,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        editJobId,
    } = useSelector((store) => store.job);
    const dispatch = useDispatch();
    // const { job_location } = useSelector(store => store.allJobs)        //#todo
    const { user } = useSelector(store => store.user)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!position || !company || !job_location) {
            toast.error('Please Fill Out All Fields');
            return
        }
        if(isEditing){
            dispatch(editJob({
                job_id: editJobId,
                job: {position, company, job_location: job_location, job_type, status}
            }))
            // console.log(editJobId)
            isEditing = !isEditing
            return
        }
        dispatch(createJob({position, company, job_location: job_location, job_type, status}))
    };
    const handleJobInput = (e) => {
        // console.log(job_location)
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleChange({name, value}))
    };

    useEffect(() => {
        if(!isEditing) {
            dispatch(handleChange({name: 'job_location', value: user.location}))
        }
    }, [dispatch, isEditing, user.location])

    const containerStyle = {
        margin: '0.5rem', // Set margin value as per your requirement
    };
    return (
        <Wrapper style={containerStyle}>
            <form className='form'>
                <h3>{isEditing ? 'edit job' : 'add job'}</h3>

                <div className='form-center'>
                    {/* position */}
                    <FormRow
                        type='text'
                        name='position'
                        value={position}
                        handleChange={handleJobInput}
                    />
                    {/* company */}
                    <FormRow
                        type='text'
                        name='company'
                        value={company}
                        handleChange={handleJobInput}
                    />
                    {/* location */}
                    <FormRow
                        type='text'
                        labelText='job location'
                        name='job_location'
                        value={job_location}        // #todo
                        handleChange={handleJobInput}
                    />

                    <FormRowSelect
                        name='status'
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />

                    <FormRowSelect
                        name='jobType'
                        labelText='job type'
                        value={job_type}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />

                    {/* btn container */}
                    <div className='btn-container'>
                        <button
                            type='button'
                            className='btn btn-block clear-btn'
                            onClick={() => dispatch(clearInput())}
                        >
                            clear
                        </button>
                        <button
                            type='submit'
                            className='btn btn-block submit-btn'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;