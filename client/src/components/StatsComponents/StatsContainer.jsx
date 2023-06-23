import { FaWpforms} from 'react-icons/fa';
import Wrapper from '../../assets/wrappers/StatsContainer';
import { useSelector } from 'react-redux';
import {BsPersonCircle} from "react-icons/bs";
import {FcCancel} from "react-icons/fc";
import RegisteredApplicationModal from "./RegisteredApplicationModal";

const StatsContainer = () => {
    const { stats } = useSelector((store) => store.allJobs);

    const defaultStats = [
        {
            title: 'Registration applications',
            count: stats.Registration || 0,
            icon: <FaWpforms />,
            color: '#e9b949',
            bcg: '#fcefc7',
        },
        {
            title: 'interviews scheduled',
            count: stats.Interview || 0,
            icon: <BsPersonCircle />,
            color: '#647acb',
            bcg: '#e0e8f9',
        },
        {
            title: 'Jobs Closed',
            count: stats.Closed || 0,
            icon: <FcCancel />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        },
    ];

    return (
        <Wrapper style={{padding: '4rem 4rem 0 4rem'}}>
            {defaultStats.map((item, index) => {
                return <RegisteredApplicationModal key={index} {...item}/>
                // return <StatsItem key={index} {...item} />;
            })}
        </Wrapper>
    );
};
export default StatsContainer;