import { Tooltip } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const SideDrawer = ({ onClose }) => {


  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();






  return (
    <>
      <div className=" z-50 side_drawer w-96 bg-slate-100 h-screen absolute top-0 left-0 px-7 flex flex-col gap-4 py-5 ">

        {/* heading of that Search user */}
        <div className="heading_section flex items-center justify-between pb-3">
          <h2 className="text-xl font-bold font-signika opacity-95">Search Users</h2>
          {/* close icon which close popup */}
          <div className="close_button cursor-pointer bg-gray-200 px-1 rounded ">
            <Tooltip title="Close">
              <CloseIcon
                onClick={onClose}
              />
            </Tooltip>
          </div>
        </div>

        {/* a form section where user give name of user */}
        <form action="" className="search_user_forom flex justify-center gap-3 py-1 ">
          {/* input field where user search */}
          <input type="text" name="user" id="user" className='w-52 rounded px-2 flex py-1 font-signika' placeholder='Enter username ' />
          <Tooltip title="Search">
            <button className="go_button cursor-pointer px-2 py-1 bg-gray-200 font-bold font-signika opacity-95 rounded-md h-9 w-11 ">Go</button>
          </Tooltip>
        </form>



        {/* all search cards inside that */}
        <div className="cards_search_user flex flex-col gap-2">

          {/* a small card */}
          <div className="user_card  flex items-center  py-1 rounded-md px-3 pl-4 bg-green-600 gap-3 ">
            {/* image section of card */}
            <div className="user_card_image flex items-center ">
              <img className='w-9 rounded-full' src="./lokeshwar.jpg" alt="" srcSet='' />
            </div>
            <div className="info font-signika text-gray-100">
              <h3 className="user_name text-sm font-500 ">Lokeshwar</h3>
              <h4 className="user_email text-[13px] "> <span className='font-300' >Email : </span> lokeshwar@gmail.com</h4>
            </div>
          </div>

          {/* a 2nd small card */}
          <div className="user_card  flex items-center  py-1 rounded-md px-3 pl-4 bg-green-600 gap-3 ">
            {/* image section of card */}
            <div className="user_card_image flex items-center ">
              <img className='w-9 rounded-full' src="./lokeshwar.jpg" alt="" srcSet='' />
            </div>
            <div className="info font-signika text-gray-100">
              <h3 className="user_name text-sm font-500 ">Lokeshwar</h3>
              <h4 className="user_email text-[13px] "> <span className='font-300' >Email : </span> lokeshwar@gmail.com</h4>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default SideDrawer
