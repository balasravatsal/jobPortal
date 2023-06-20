import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/UserSlice';

const Profile = () => {
    const { isLoading, user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        company: user?.company_name || '',
        location: user?.location || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, company, location } = userData;
        if (!name || !email || !company || !location) {
            toast.error('please fill out all fields');
            return;
        }
        dispatch(updateUser(userData));
        // console.log(localStorage.user)
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value });
    };
    const containerStyle = {
        margin: '0.5rem', // Set margin value as per your requirement
    };
    return (
        <Wrapper style={containerStyle}>
            <form className='form' onSubmit={handleSubmit}>
                <h3>profile</h3>
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='name'
                        value={userData.name}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type='text'
                        labelText='company'
                        name='company'
                        value={userData.company}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type='email'
                        name='email'
                        value={userData.email}
                        handleChange={handleChange}
                    />
                    <FormRow
                        type='text'
                        labelText='location'
                        name='location'
                        value={userData.location}
                        handleChange={handleChange}
                    />
                    <button type='submit' className='btn btn-block' disabled={isLoading}>
                        {isLoading ? 'Please Wait...' : 'save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default Profile;