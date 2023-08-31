import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Login from './Login';
import Signup from './Signup';



const HomePage = () => {

  // if login then true and create then false
  const [toggleMode, setToggleMode] = useState(true);

  //PreDefine Material Component code to changing tabs code
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>

      <div className="login_container font-signika flex flex-col justify-center items-center pt-7 gap-4  ">

        {/* this includes heading part */}
        <div className="login_heading bg-white rounded-md w-[35rem]  py-3 flex justify-center items-center ">
          <h1 className=' text-3xl font-semibold  opacity-80 tracking-wide' >Your-Chat-App</h1>
        </div>


        {/*  this includes login content part */}
        <div className="login_contenet bg-white rounded-sm  w-[35rem]  py-3 flex justify-center items-center flex-col ">
          <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
            <Tab icon={<LockOpenIcon />} label="LOGIN-ACCOUNT"
              onClick={() => setToggleMode(true)}
            />
            <Tab icon={<PersonPinIcon />} label="CREATE-ACCOUNT"
              onClick={() => setToggleMode(false)}
            />
          </Tabs>


          {/*👉 LOGIN FOROM of login user */}
          {
            toggleMode && <Login /> // if true then login mode
          }
          {/*👉 CREATE ACCOUNT FOROM */}
          {
            (!toggleMode) && <Signup /> // if false then signup mode
          }

        </div>
      </div>

    </>
  )
}

export default HomePage
