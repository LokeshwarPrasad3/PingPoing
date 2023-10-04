import axios from 'axios';
import React, { useState } from 'react'
// we need component and css 
import { ToastContainer, toast } from 'react-toastify';

// circular progress
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { host } from '../config/api';

const Login = () => {

    const navigate = useNavigate();

    // getting login email
    const [email, setEmail] = useState('');
    // getting login password
    const [password, setPassword] = useState('');

    // new state for loading to upload picture of user
    const [loading, setLoading] = useState(false);

    // toggle password value
    const [showPass, setShowPass] = useState(false);
    const toggleShow = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    }

    // handle login when clicked loginbutton
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        // check values empty 
        if (!email || !password) {
            toast.warn("Please fill All Inputs");
            setLoading(false);
            return;
        }
        // if all values is filled
        try {
            // making headers inside the config
            const config = {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
            // post on api /login
            const { data } = await axios.post(`${host}/api/user/login`, { email, password }, config);
            toast.success('Successfully Login', {
                autoClose: 1000,
            });
            console.log(data);

            // when user is valid then set that data in localStorage
            localStorage.setItem("userInfo", JSON.stringify(data));

            // make empty values of input fields
            setEmail("");
            setPassword("");

            setTimeout(() => {
                setLoading(false);
                // navigate to chat section successfully done
                navigate('/chats');
            }, 2000);
        } catch (error) {
            toast.error("Invalid User");
            setLoading(false);
        }

    }


    return (
        <>

            {/*👉 LOGIN FOROM of login user */}
            <form action="" className="login_form w-[35rem]  px-16 flex flex-col gap-5 py-9" >
                {/* for input type email */}
                <div className="email_box flex flex-col gap-2">
                    <label htmlFor="login_input_email" className='text-xl  font-[600] opacity-70'>Email Address *</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" name="login_input_email" id="login_input_email" className='py-1 px-3 w-full bg-gray-100' placeholder='Enter Your Email Address' autoComplete="on" />
                </div>
                {/* for input type password */}
                <div className="password_box flex flex-col gap-2">
                    <label htmlFor="login_input_password" className='text-xl  font-[600] opacity-70'>Password *</label>
                    <div className="password flex items-center ">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPass ? 'text' : 'password'} name="login_input_password" id="login_input_password" className='py-1 px-3 w-full bg-gray-100' placeholder='Enter Password' autoComplete="new-password" />
                        <button tabIndex="-1" onClick={toggleShow} className="show_button bg-gray-200 py-1 px-2 rounded-md">{showPass ? 'Hide' : 'Show'}</button>
                    </div>
                </div>
                {/* input button which is login */}
                <div className="button_box flex flex-col justify-center py-4 items-center gap-4">
                    <button
                        onClick={handleLogin}
                        className='bg-blue-600 w-full py-[5px] rounded opacity-90 text-white text-xl hover:bg-blue-700 text-opacity-90 ' >
                        {/* button content is changing when upload image */}
                        {loading ?
                            (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress color="inherit" size={28} />
                            </Box>
                            ) : ('Login')}
                    </button>
                    <button className='bg-red-600 w-full py-[5px] rounded opacity-90 text-white text-xl hover:bg-red-700 text-opacity-90 ' >Get Guest User Credential</button>
                </div>
                {/* get guest user credentials */}
            </form>


            {/* the toastify alert is added here */}
            <ToastContainer />

        </>
    )
}

export default Login
