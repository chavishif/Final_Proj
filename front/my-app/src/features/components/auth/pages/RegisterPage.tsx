import { Link } from 'react-router-dom'

import '../../../../../src/App.css'
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import {
    loginAsync, registerAsync, selectRegistered

} from '../../../login/loginSlice';
import styles from './Counter.module.css';
import { CompletionTriggerKind } from 'typescript';
import { useNavigate } from 'react-router-dom';


export default function RegisterPage() {
    const navigate = useNavigate();

    const notify = () => toast("new  " + username + "  added!");
    const notregister = () => toast("please fill all the fields");
    const registered = useAppSelector(selectRegistered);
    const dispatch = useAppDispatch();
    const [username, setusername] = useState("")
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [email, setemail] = useState("")

    const handleClick = () => {
        if (username !== "" && passwordInput !== "" && email !== "") {
            dispatch(registerAsync({ username:username, password: passwordInput,email: email }))
                .then((result) => {
                   
                        notify();
                        navigate('/login');
                    
                })
        } else {
            notregister();
        }
    };
    
    const handlePasswordChange = (evnt: any) => {
        setPasswordInput(evnt.target.value);
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }


    // useEffect(() => {
    //     if (registered === true) {
    //         notify()
    //     }
    //     else {
    //         console.log("not registered")
    //     }
    // }, [])


    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>

            <p>
            Username: 
            <input style={{ width: "17rem" }} placeholder="Enter Username" onChange={(e)=> setusername(e.target.value)}></input><br></br>
            </p>
            <p>
            Password: 
            <input type={passwordType} onChange={handlePasswordChange} value={passwordInput}
                    name="password" placeholder="Enter Password" /> <></>

                <button className="btn btn-outline-dark" onClick={togglePassword}>
                    {passwordType === "password" ? <i className="fa fa-eye-slash" ></i> :
                        <li className='fa fa-eye'></li>}
                </button>
            </p>
            <p>
            Email: <input style={{ width: "18rem" }} placeholder="Enter Email"onChange={(e)=> setemail(e.target.value)}></input><br></br>
            </p>
            <p>
                <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
            </p>
            <p>
                <button className="button-33" onClick={handleClick}>Register</button>

                <ToastContainer />

            </p>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
