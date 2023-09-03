import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const MyChats = () => {
  return (
    <>

    {/* chat section where all the chat are visible */}
          <div className=" side_drawer w-[70%] bg-slate-200 min-h-screen m-2 rounded px-7 flex flex-col gap-4 py-5 ">

              
              <div className="heading_section flex items-center justify-between pb-3">
                  <h2 className="text-3xl font-bold font-signika opacity-60">My Chats</h2>
                  {/* close icon which close popup */}
                  <div className="close_button flex items-center justify-around gap-1 px-2 py-1 cursor-pointer bg-gray-300 rounded ">
                      <h2 className="font-signika " >New Group Chat</h2>
                      <AddIcon
                      />
                  </div>
              </div>

              {/* all search cards inside that */}
              <div className="cards_search_user flex flex-col gap-2">

                  {/* a small card */}
                  <div className="user_card  flex items-center  py-1 rounded-md px-3 pl-4 bg-slate-400 gap-3 ">
                      <div className="info font-signika">
                          <h3 className="user_name text-sm font-500 ">Lokeshwar</h3>
                          <h4 className="user_email text-[13px] "> <span className='font-300' >Email : </span> lokeshwar@gmail.com</h4>
                      </div>
                  </div>


                  {/* a small card */}
                  <div className="user_card  flex items-center  py-1 rounded-md px-3 pl-4 bg-slate-400 gap-3 ">
                      <div className="info font-signika">
                          <h3 className="user_name text-sm font-500 ">Lokeshwar</h3>
                          <h4 className="user_email text-[13px] "> <span className='font-300' >Email : </span> lokeshwar@gmail.com</h4>
                      </div>
                  </div>


              </div>
          </div>
    </>
  )
}

export default MyChats
