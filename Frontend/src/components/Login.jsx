import React, { useEffect, useState } from 'react'
// we need component and css 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    // getting login email
    const [email, setEmail] = useState('');
    // getting login password
    const [password, setPassword] = useState('');

    // getting login email and password
    // eslint-disable-next-line
    const [userDetail, setUserDetail] = useState({ email: "", password: "" });


    // toggle password value
    const [showPass, setShowPass] = useState(true);
    const toggleShow = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    }


    // when userDetails  state update then print new value
    useEffect(() => {
        console.log(userDetail);
    }, [userDetail]);

    // handle login when clicked loginbutton
    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            setUserDetail((prevDetails) => ({
                ...prevDetails,
                email: email,
                password: password
            }));
            toast.success("Login Successfully");
            setEmail("");
            setPassword("");
        } else {
            toast.warn("Please enter valid input");
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
                        <button onClick={toggleShow} className="show_button bg-gray-200 py-1 px-2 rounded-md">{showPass ? 'Hide' : 'Show'}</button>
                    </div>
                </div>
                {/* input button which is login */}
                <div className="button_box flex flex-col justify-center py-4 items-center gap-4">
                    <button
                        onClick={handleLogin}
                        className='bg-blue-600 w-full py-[5px] rounded opacity-90 text-white text-xl hover:bg-blue-700 text-opacity-90 ' >Login</button>
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
