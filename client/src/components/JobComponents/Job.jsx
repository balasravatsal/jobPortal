import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/Job';
import {useDispatch, useSelector} from 'react-redux';
import JobInfo from './JobInfo';
import moment from 'moment';
import { deleteJob, setEditJob } from '../../features/job/jobSlice';
import {toast} from "react-toastify";

const Job = ({job_id, position, company, job_location, job_type, created_at, status, created_by}) => {
    const { user_id } = useSelector(store => store.user.user)
    
    const dispatch = useDispatch()
    const date = moment(created_at).format('MMM Do, YYYY');

    return (
        <Wrapper>
            <header>
                <div className="info">
                    <h4>{position}</h4>
                    <p>{company}</p>
                </div>
            </header>
            <div className={'content'}>
                <div className="content">
                    <JobInfo icon={<FaLocationArrow />} text={job_location}/>
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={job_type} />
                    <div className={`status interview`}>
                        {status}
                    </div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad at cum cupiditate delectus eos expedita in ipsam iusto nam nesciunt non, nulla praesentium provident quibusdam rem repudiandae sapiente similique?</p>
                <footer>
                    { user_id === created_by &&
                    <div className={'actions'}>
                        <Link
                            to={`/add-job`}
                            className={'btn edit-btn'}
                            onClick={() => {
                                dispatch(setEditJob({
                                    editJobId: job_id,
                                    position,
                                    company,
                                    job_location,
                                    job_type,
                                    status
                                }))
                            }}
                        >
                            Edit Job
                        </Link>
                        <button type={'button'}
                                className={'btn delete-btn'}
                                onClick={() => {
                                    dispatch(deleteJob(job_id))
                                    toast.success('Job Deleted')
                                }}
                        >
                            Delete
                        </button>
                    </div>
                    }
                </footer>
            </div>
        </Wrapper>

    );
};

export default Job;