import React, {useState} from 'react';
import Wrapper from "../assets/wrappers/RegisterPage";
import {Alert, FormRow, Logo} from "../components";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser} from "../features/users/UserSlice";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: false,
    showAlert: false,
}

const Register = () => {
    const [values, setValues] = useState(initialState)

    const {user, isLoading} = useSelector(store => store.user)
    const dispatch = useDispatch()

    const toggleMember = () => {
        setValues({...values, isMember: !values.isMember})
    }
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setValues({...values, [name]: value})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const {name, email, password, isMember} = values
        if(!email || !password || (!isMember && !name)) {
            toast.error('Please fill all details')
            return;
        }
        if(isMember) {
            dispatch(loginUser({email: email, password: password}))
            return;
        }
        dispatch(registerUser({name, email, password}))
    }

    return (
        <Wrapper classname={'full-page'}>
            <form className={'form'} onSubmit={onSubmit}>
                <Logo/>
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {values.showAlert && <Alert/>}
                {!values.isMember && <FormRow type={'text'}
                                              name={'name'}
                                              value={values.name}
                                              handleChange={handleChange}
                />
                }
                <FormRow type={'email'}
                         name={'email'}
                         value={values.email}
                         handleChange={handleChange}
                />
                <FormRow type={'password'}
                         name={'password'}
                         value={values.password}
                         handleChange={handleChange}
                />

                <button type={'submit'} className={'btn btn-block'}>Submit</button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already Registered?'}
                    <button type={'button'} onClick={toggleMember} className={'member-btn'}>{values.isMember ? 'Register' : 'Login'}</button>
                </p>
            </form>
        </Wrapper>
    )


};

export default Register;