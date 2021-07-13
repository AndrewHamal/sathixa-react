import React, {useEffect, useState} from "react";
import {hasUpper, hasLower, hasNumber, hasSpecialCharacter, isValidated, hasEightString, loggedIn} from "../../helper/helper";
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { apiRegister } from "@/api/rider/register";
import { setToken } from "@/reducers/rider/reducers"
import { apiLogin, apiGoogleRedirect, apiGoogleCallback } from "../../api/vendor/login";
import { Toast } from "antd-mobile"
import { useDispatch } from "react-redux"
import '@/assets/css/login.css'
import { Helmet } from "react-helmet";


const Login = (props) => {
    const [data, setState] = useState({email:'', password:''})
    const loggedIn = sessionStorage.getItem('loggedIn')
    const history = useHistory()

    const dispatch = useDispatch()

    const [upperError, setUpperError] = useState(1)
    const [lowerError, setlowerError] = useState(1)
    const [numberError, setNumberError] = useState(1)
    const [emailError, setEmailError] = useState(false)
    const [eightStrError, setEightStrError] = useState(false)
    const [specialCharError, setSpecialCharError] = useState(1)
    const [disableSubmit, setDisableSubmit] = useState(true)
    const [passwordError, setPasswordError] = useState(false)
    const [emailStatus, setEmailStatus] = useState(true)
    const [phoneStatus, setPhoneStatus] = useState(false)

    const[loader, setLoader] = useState(false);

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        setLoader(true)
        setDisableSubmit(false)

        apiLogin(data)
            .then(res => {
                setLoader( false)
                setDisableSubmit( false)
                dispatch(setToken(true))
                localStorage.setItem('_riderToken', res.data.token)
                history.push('/dashboard')

            }).catch(err => {
                setLoader(false)
                setDisableSubmit(false)
                if (err.data.errors.email)
                    setEmailError(true)
                else
                    setEmailError(false)

                if (err.data.errors.password)
                    setPasswordError(true)
                else
                    setPasswordError(false)
            })
    }

    useEffect(() => {
        let url = new URL( (window.location.href).replace('#', '?'));
        let search_params = url.searchParams
        let access_token = search_params.get('access_token')
        if(access_token !== null){
            apiGoogleCallback(access_token)
                .then(res => {
                    props.login(res.data.data.token)
                    history.push('/dashboard')
                }).catch(err => {
                    if (err.data.errors.email)
                        setEmailError(true)
                    else
                        setEmailError(false)


                    if (err.data.errors.password)
                        setPasswordError(true)
                    else
                        setPasswordError(false)
                })
        }
    }, []);

    const handleSignupSubmit = (event) => {
        event.preventDefault()
        let formData = new FormData(event.target)
        setLoader(true)
        setDisableSubmit(true)

        apiRegister(formData).then(resp => {
            setLoader(false)
            setDisableSubmit(false)
            dispatch(setToken(true))
            localStorage.setItem('_riderToken', resp?.data?.access_token)
            history.push('/dashboard')
        }).catch(err => {
            setLoader(false)
            setDisableSubmit(false)
            if(err.data){
                if(err.data.errors.email)
                    setEmailStatus(true)
                else
                    setEmailStatus(false)

                if(err.data.errors.phone)
                    setPhoneStatus(true)
                else
                    setPhoneStatus(false)   
            }
        })
    }

    const handleChange = (event) => {

        let name = event.target.name
        let value = event.target.value

        if(name === 'password') {
            setEightStrError(false)
            // password validation
            hasUpper(value) ? setUpperError(false) : setUpperError(true)
            hasLower(value) ? setlowerError(false) :  setlowerError(true)
            hasNumber(value) ? setNumberError(false) : setNumberError(true)
            hasSpecialCharacter(value) ? setSpecialCharError( false) : setSpecialCharError(true)

            if (isValidated(value)) {
                hasEightString(value) ? setEightStrError(false) : setEightStrError(true)

                setDisableSubmit(false)
            }
            else {
                setDisableSubmit(true)
            }
        }

        setState((data) => {
            return { ...data, [name] : value }
        })

        // setState((data) => {
        //     return { ...data, value: { ...data.value, [name]: value } }
        // });
    }

    const redirect = () => {
        let googleRedirect =  apiGoogleRedirect()

        googleRedirect
            .then(res => {
                if(res.status == 200) {
                    let url = new URL(res.data);
                    let search_params = url.searchParams
                    search_params.set('response_type', 'token');
                    url.search = search_params.toString()
                    window.location.href = url.toString()
                    return
                }
            })
    }

    const emptyState = () => {
        document.getElementById("form").reset();
        setState({email:'', password: '', first_name: '', last_name :''})
        setUpperError(1)
        setlowerError(1)
        setNumberError(1)
        setPasswordError(false)
        setEightStrError(false)
        setEmailError(false)
        setEmailStatus(false)
        setSpecialCharError(1)
        setDisableSubmit(false)
    }

    if (loggedIn) {
        return <Redirect to='/dashboard' />
    }

    return (
        <>
        <div>
            <section className="container pt-4 px-2">
                <div className="col-md-12 text-center">
                    <ul className="nav nav-pills mb-5" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" onClick={emptyState} id="pills-home-tab" data-toggle="pill" href="#pills-home"
                               role="tab" aria-controls="pills-home" aria-selected="true">Signin</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={emptyState} id="pills-profile-tab" data-toggle="pill" href="#pills-profile"
                               role="tab" aria-controls="pills-profile" aria-selected="false">Signup</a>
                        </li>
                    </ul>

                    <div className="tab-content " id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                             aria-labelledby="pills-home-tab">
                            <div className="mt-4">

                                <form onSubmit={handleLoginSubmit}>
                                    <div className="input-group mb-4">
                                        <input type="email"
                                               className="login-input"
                                               name={"email"}
                                               value={data.email}
                                               onChange={handleChange}
                                               required/>
                                        <span className="highlight"/>
                                        <span className="bar"/>
                                        <label className="login-label">Email</label>
                                        <small className={'font-11 text-danger mt-2'} >{ emailError ? `The given email not found` : '' }</small>

                                    </div>

                                    <div className="input-group ">
                                        <input type="password"
                                               className="login-input"
                                               name={"password"}
                                               value={data.password}
                                               onChange={handleChange}
                                               required/>
                                        <span className="highlight"/>
                                        <span className="bar"/>
                                        <label className="login-label">Password</label>
                                        <small className={'font-11 text-danger my-2'} >{ passwordError ? `The given password didn't match` : '' }</small>

                                        <div className="d-flex flex-column text-align-start">
                                            <p className={`font-10 mt-2 ${upperError === true ? 'text-danger' : !upperError ? 'text-success' : '' }`}>
                                                <span className={`dot-small my-auto ${upperError === true ? 'bg-danger' : !upperError  ? 'bg-success' : ''}`}/> Must contain at least one
                                                uppercase
                                            </p>

                                            <p className={`font-10 mt-2 ${lowerError === true ? 'text-danger' : !lowerError ? 'text-success' : ''}`}><span
                                                className={`dot-small my-auto ${lowerError === true ? 'bg-danger' : !lowerError ? 'bg-success' : ''}`}/> Contain at least one lowercase</p>

                                            <p className={`font-10 mt-2 ${numberError === true ? 'text-danger' : !numberError ? 'text-success' : ''}`}><span
                                                className={`dot-small my-auto ${numberError === true ? 'bg-danger' : !numberError ? 'bg-success' : ''}`}/> Contain at least one number</p>

                                            <p className={`font-10 mt-2 ${specialCharError === true ? 'text-danger' : !specialCharError ? 'text-success' : ''}`}><span
                                                className={`dot-small my-auto ${specialCharError === true ? 'bg-danger' : !specialCharError ? 'bg-success' : ''}`}/> Contain at least one special character</p>

                                            {/*<p className={`font-10 mt-2 ${eightString ? 'text-danger' : 'text-success'}`}><span*/}
                                            {/*    className={`dot-small my-auto ${eightString ? 'bg-danger' : ''}`}/> Contain at least 8 letter</p>*/}
                                        </div>
                                    </div>
                                    <div className="btn-container mb-2 mt-4">
                                        <button className="w-100 btn btn-primary text-white" disabled={ disableSubmit ? 'disabled' : '' }>
                                            { loader ? <i className="fas fa-circle-notch fa-spin text-white fa-lg"></i>
                                                : 'Submit'}
                                        </button>
                                    </div>                               
                                </form>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                             aria-labelledby="pills-profile-tab">
                            <div className="mt-0">
                                <form onSubmit={handleSignupSubmit} id={"form"}>
                                    <div className="input-group mb-4">
                                        <input type="text"
                                               className="login-input"
                                               name={"first_name"}
                                               onChange={handleChange}
                                               required/>
                                        <span className="highlight"/>
                                        <span className="bar"/>
                                        <label className="login-label">First Name <span
                                            className="color-red">*</span></label>
                                    </div>
                                    <div className="input-group mb-4">
                                        <input type="text"
                                               className="login-input"
                                               name={"last_name"}
                                               onChange={handleChange}
                                               required/>
                                        <span className="highlight"/>
                                        <span className="bar"/>
                                        <label className="login-label">Last Name <span
                                            className="color-red">*</span></label>
                                    </div>

                                    <div className="input-group mb-4">
                                        <input type="text"
                                               className="login-input"
                                               name={"phone"}
                                               minLength={8}
                                               onChange={handleChange}
                                               required/>
                                        <span className="highlight"/>
                                        <span className="bar"/>
                                        <label className="login-label">Phone Number</label>
                                        { phoneStatus ? <small className={"font-11 text-danger mt-2"}>The phone number has already been taken.</small> : '' }
                                    </div>

                                    <div className="input-group mb-4">
                                        <input type="email"
                                               className="login-input"
                                               name={"email"}
                                               onChange={handleChange}
                                               required/>
                                                <span className="highlight"/>
                                                <span className="bar"/>
                                                <label className="login-label">Email <span
                                            className="color-red">*</span></label>


                                        { emailStatus ? <small className={"font-11 text-danger mt-2"}>The email has already been taken.</small> : '' }
                                     
                                    </div>
                                    <div className="input-group mb-4">
                                        <input type="password"
                                               className="login-input"
                                               name={"password"}
                                               onChange={handleChange}
                                               required/>
                                        <span className="highlight"/>
                                        <span className="bar"/>

                                        <label className="login-label">Password <span
                                            className="color-red">*</span></label>
                                        { eightStrError ? <p className={'font-10 mt-1 text-warning'}> Seems good, we suggest to make it stronger!</p> : '' }

                                        <div className="d-flex flex-column mt-2 text-align-start">
                                            <p className={`font-10 mt-2 ${upperError === true ? 'text-danger' : !upperError ? 'text-success' : '' }`}>
                                                <span className={`dot-small my-auto ${upperError === true ? 'bg-danger' : !upperError  ? 'bg-success' : ''}`}/> Must contain at least one
                                                uppercase
                                            </p>

                                            <p className={`font-10 mt-2 ${lowerError === true ? 'text-danger' : !lowerError ? 'text-success' : ''}`}><span
                                                className={`dot-small my-auto ${lowerError === true ? 'bg-danger' : !lowerError ? 'bg-success' : ''}`}/> Contain at least one lowercase</p>

                                            <p className={`font-10 mt-2 ${numberError === true ? 'text-danger' : !numberError ? 'text-success' : ''}`}><span
                                                className={`dot-small my-auto ${numberError === true ? 'bg-danger' : !numberError ? 'bg-success' : ''}`}/> Contain at least one number</p>

                                            <p className={`font-10 mt-2 ${specialCharError === true ? 'text-danger' : !specialCharError ? 'text-success' : ''}`}><span
                                                className={`dot-small my-auto ${specialCharError === true ? 'bg-danger' : specialCharError ? 'bg-success' : ''}`}/> Contain at least one special character</p>
                                        </div>
                                    </div>

                                    <div className="btn-container mb-2 mt-4">
                                        <button type={"submit"} className="btn btn-primary w-100 " disabled={ disableSubmit ? 'disabled' : '' } >
                                            { loader ? <i className="fas fa-circle-notch fa-spin text-white fa-lg"></i>
                                            : 'Submit'}
                                            <div className="ripple"></div>
                                        </button>
                                    </div>                                
                                </form>
                            </div>
                            <div className="mt-5">
                                <p className="font-12">By clicking button above you agree our <a href="#"
                                                                                                 className="terms-color">terms
                                    of use </a>
                                    and
                                    <a href="#" className="terms-color"> privacy
                                        policies</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}

export default Login;