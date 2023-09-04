import { Tooltip } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { ChatState } from '../../Context/ChatProvider';
// we need component and css 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import UserLoadStack from '../Modals/UserLoadStack';
import UserListItem from './UserListItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const SideDrawer = ({ onClose }) => {

  //  // getting details from contextAPI
  const { user, setSelectedChat, chats, setChats } = ChatState();

// search is getting input search user data 
  const [search, setSearch] = useState("");
  // after search user it store that users
  const [searchResult, setSearchResult] = useState([]);
  // when searching users names then loading stacks
  const [loading, setLoading] = useState(false);
  // after clicking the user chat will load
  const [loadingChat, setLoadingChat] = useState();


// after input username clicked to go then perform search
  const handleSearchUser = async (e) => {
    e.preventDefault();

    // Check if the search input is empty
    if (!search) {
      toast.warn("Enter User Name");
      return;
    }

    // Use try-catch to handle potential errors during user searching
    try {
      setLoading(true);

      // Create a configuration object with an authorization header
      const config = {
        headers: {
          "Authorization": `Bearer ${user.token}` // Corrected "Authrization" to "Authorization"
        }
      }
      // Make an HTTP GET request to search for users based on the input
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false); // Set loading to false when the request is complete
      setSearchResult(data); // Store the search result in state
    } catch (error) {
      // Handle errors by displaying a warning message
      toast.warn("Error Occurred");
    }
  }


  // click on list of users
  const accessChat = async () => {
    // loading till not getting data chat
    setLoadingChat(true);

    // sending headers data
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      },
    }

    try {
      // show all chats
      const { data } = await axios.post('/api/chat', { userId: user._id }, config);

      // if newlly comed chat then simply push to chats
      if (!chats.find((c) => c._id === data._id))
        setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      // close the drawer slider
      onClose();
    }

    catch (error) {
      toast.warn("Error fetchig data");
    }

  }


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
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text" name="user" value={search} id="user" className='w-52 rounded px-2 flex py-1 font-signika' placeholder='Enter username ' />
          <Tooltip title="Search">
            <button
              onClick={handleSearchUser}
              className="go_button cursor-pointer px-2 py-1 bg-gray-200 font-bold font-signika opacity-95 rounded-md h-9 w-11 ">Go</button>
          </Tooltip>
        </form>



      
        {/* all search cards inside that */}
        <div className="cards_search_user flex items-center justify-center flex-col gap-2">

          {/* when not shows user then show that skeleton */}
          {
            loading ? <UserLoadStack /> :
              (
                searchResult.map((element) => {
                  return (
                    <>

                      <UserListItem
                        key={element._id}
                        user={element}
                        handleFunction={() => accessChat(user._id)}
                      />


                    </>
                  )
                })
              )
          }


          {/* when clicked to any chat then load their chats */}
          {loadingChat && <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>}

        </div>
      </div>


      <ToastContainer />
    </>
  )
}

export default SideDrawer
