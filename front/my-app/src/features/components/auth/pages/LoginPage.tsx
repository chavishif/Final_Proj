
import '../../../../../src/App.css'
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import {
    loginAsync, registerAsync, selectRegistered, selectLooged

} from '../../../login/loginSlice';
// import styles from './Counter.module.css';
import { CompletionTriggerKind } from 'typescript';
import { Link, useNavigate } from 'react-router-dom'
import '../../../../styles/details.css';


export default function LoginPage() {
    const navigate = useNavigate();
    const notlogin = () => toast("please fill all the fields");
    const logged = useAppSelector(selectLooged)

    const setRemember = () => {
        let reme = localStorage.getItem("remember")
        if (reme !== null)

            return JSON.parse(reme)
        else {
            return null
        }

    }

    const dispatch = useAppDispatch();
    const registerd = useAppSelector(selectRegistered);
    const [username, setusername] = useState("")
    const [remember, setremember] = useState(setRemember())
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");


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


    useEffect(() => {
        if (remember !== undefined)
            localStorage.setItem("remember", JSON.stringify(remember))
    }, [remember])

    const handleClick = async () => {
        if (username !== "" && passwordInput !== "") {
            const response = await dispatch(loginAsync({ username: username, password: passwordInput }));
            console.log(response )
            if (!response.payload) {
                alert('Incorrect username or password');
            } else {
                navigate('/');
            }
        }
        else {
            alert('Please enter both username and password');
        }
    };
    

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>

            <br></br>
            <p>Username:
                <input style={{ width: "17rem" }} onChange={(e) =>
                    setusername(e.target.value)} placeholder="Enter Username"></input>
                <br></br>
            </p>
            <p> Password:

                <input type={passwordType} onChange={handlePasswordChange} value={passwordInput}
                    name="password" placeholder="Enter Password" /> <></>

                <button className="btn btn-outline-dark" onClick={togglePassword}>
                    {passwordType === "password" ? <i className="fa fa-eye-slash" ></i> :
                        <li className='fa fa-eye'></li>}
                </button>
            </p>

            {/* <p>  Remember me :
                <input style={{outline:"none"}} onChange={(e) =>
                    setremember(e.target.checked)} type={'checkbox'}></input><br></br>
            </p> */}
            <p>
            <input name="checkbox" id="checkbox"  style={{ outline: "none" }} onChange={(e) =>
                setremember(e.target.checked)} type="checkbox" required /> <span>Remember me </span>
                </p>
            <br></br>
            <button className="button-33" onClick={handleClick}>Login</button><br></br>
            <br></br>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
            <ToastContainer />

        </div>

    );
}