import React, { useEffect, useState } from 'react'
// we need component and css 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    // getting name
    const [name, setName] = useState('');
    // getting  email
    const [email, setEmail] = useState('');
    // getting  password
    const [password, setPassword] = useState('');
    // // getting  cpassword
    const [cpassword, setCPassword] = useState('');

    // getting login email and password
    const [userDetail, setUserDetail] = useState([{ name: "", email: "", password: "", cpassword: "" }]);


    // when userDetails state update then print new value
    useEffect(() => {
        console.log(userDetail);
    }, [userDetail]);

    // when clicked to sign up then handle
    const handleSignup = (e) => {
        // our page is not refresh so
        e.preventDefault();
        // check all is valid  or not
        if(name && email && password && cpassword){
            // update from previous data
            setUserDetail((prevData)=> ({
                ...userDetail,
                name, email, password, cpassword 
            }))
            console.log(userDetail);
            toast.success("Signup Successfully");
            // now emptpy all values
            setName("");
            setEmail("");
            setPassword("");
            setCPassword("");
        }else
        toast.warn("Enter Right Values");
    }


    // when clicked to choose file for image then handle that
    const postDeatail = () => {

    }


    // toggle password value
    const [showPass, setShowPass] = useState(true);
    const toggleShow = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    }


    return (
        <>
            {/*👉 CREATE ACCOUNT FOROM */}

            <form action="" className="create_form  w-[35rem]  px-16 flex flex-col gap-5 py-9" >

                {/* for input name */}
                <div className="name_box flex flex-col gap-2">
                    <label htmlFor="create_input_name" className='text-xl  font-[600] opacity-70'>Name *</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)} // set value when change
                        type="text" name="create_input_name" id="create_input_name" className='py-1 px-3 w-full bg-gray-100' placeholder='Enter Your Name' />
                </div>

                {/* for input type email */}
                <div className="email_box flex flex-col gap-2">
                    <label htmlFor="create_input_email" className='text-xl  font-[600] opacity-70'>Email Address *</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // set value when change
                        type="email" name="create_input_email" id="create_input_email" className='py-1 px-3 w-full bg-gray-100' placeholder='Enter Your Email Address' autoComplete="on" />
                </div>

                {/* for input type password */}
                <div className="password_box flex flex-col gap-2">
                    <label htmlFor="create_input_password" className='text-xl  font-[600] opacity-70'>Password *</label>
                    <div className="password flex items-center ">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // set value when change
                            type={showPass ? 'text' : 'password'} name="create_input_password" id="create_input_password" className='py-1 px-3 w-full bg-gray-100' placeholder='Enter Password' autoComplete="new-password" />
                        <button onClick={toggleShow} className="show_button bg-gray-200 py-1 px-2 rounded-md">{showPass ? 'Hide' : 'Show'}</button>
                    </div>
                </div>

                {/* for confirm input type password */}
                <div className="password_box flex flex-col gap-2">
                    <label htmlFor="create_input_cpassword" className='text-xl  font-[600] opacity-70'>Confirm Password *</label>
                    <div className="password flex items-center ">
                        <input
                            value={cpassword}
                            onChange={(e) => setCPassword(e.target.value)} // set value when change
                            type={showPass ? 'text' : 'password'} name="create_input_cpassword" id="create_input_cpassword" className='py-1 px-3 w-full bg-gray-100' placeholder='Confirm Password' autoComplete="new-password" />
                        <button onClick={toggleShow} className="show_button bg-gray-200 py-1 px-2 rounded-md">{showPass ? 'Hide' : 'Show'}</button>
                    </div>
                </div>

                {/* upload your picture */}
                <div className="password_box flex flex-col gap-2">
                    <label htmlFor="create_input_picture" className='text-xl  font-[600] opacity-70'>Upload Your Picture </label>
                    {/* only accept image */}
                    <input type="file" accept='image/*'
                        onChange={(e) => postDeatail(e.target.files[0])}
                        name="create_input_picture" id="create_input_picture" className='py-1 px-3 w-full bg-gray-100' placeholder='Confirm Password' />
                </div>

                {/* input button which is login */}
                <div className="button_box flex flex-col justify-center py-4 items-center gap-4">
                    <button
                        // signup button
                        onClick={handleSignup}
                        className='bg-blue-600 w-full py-[5px] rounded opacity-90 text-white text-xl hover:bg-blue-700 text-opacity-90 ' >Sign Up</button>
                </div>

            </form>


            {/* the toastify alert is added here */}
            <ToastContainer />
        </>
    )
}

export default Signup
