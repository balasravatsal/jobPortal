import React, {useEffect, useState} from 'react';
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo} from "../components";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser} from "../features/user/UserSlice";
import {useNavigate} from "react-router-dom";
import FormRowSelect from "../components/FormRowSelect";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: false,
    showAlert: false,
    role: ''
}

const Register = () => {
    const [values, setValues] = useState(initialState)

    const {user, isLoading} = useSelector(store => store.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()

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
        }else{
        dispatch(registerUser({name, email, password}))
    }}

    useEffect(() => {
        if(user) {
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }, [user, navigate])

    return (
        <Wrapper classname={'full-page'}>
            <form className={'form'} onSubmit={onSubmit}>
                <Logo/>
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
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
                {/*<FormRowSelect*/}
                {/*    name='status'*/}
                {/*    value={status}*/}
                {/*    handleChange={handleJobInput}*/}
                {/*    list={statusOptions}*/}
                {/*/>*/}

                <button type={'submit'}
                        className={'btn btn-block'}
                        disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already Registered?'}
                    <button type={'button'}
                            onClick={toggleMember}
                            className={'member-btn'}
                    >
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )


};

export default Register;