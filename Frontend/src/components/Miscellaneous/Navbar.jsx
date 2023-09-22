import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SlideDrawer from './SlideDrawer';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from '../Modals/ProfileModal'; // Use uppercase 'P' in the import


const Navbar = () => {

    // eslint-disable-next-line
    const [getUser, setGetUser] = useState({});

    // Populate showSlideDrawer when clicked
    const [showSlideDrawer, setShowSlideDrawer] = useState(false);

    const closePopup = () => {
        console.log("close method called");
        setShowSlideDrawer(false);
    }
    
    // Import user from context API
    const { user } = ChatState();
    // console.log(user.pic);


    // Show profile react component
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const openProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    const closeProfileModal = () => {
        setIsProfileModalOpen(false);
    };


    useEffect(()=>{
        setGetUser(user);
        console.log(user);
    },[user])

    return (
        <>
            {/* If true then show */}
            {showSlideDrawer && <SlideDrawer onClose={closePopup} />}

            {/* This is the container of the whole navbar */}
            <nav className="h-[65px] navbar_container flex items-center justify-between px-5 py-2 bg-slate-200">
                {/* Search box inside the navbar */}
                <div className="search_box flex items-center justify-around cursor-pointer ">
                    <SearchIcon style={{ fontSize: '2rem' }} />
                    <Tooltip title="Search User">
                        <Button
                            onClick={() => {
                                setShowSlideDrawer(true);
                            }}
                            variant="text"
                            style={{
                                fontWeight: 'bold',
                                color: 'black',
                                textTransform: 'capitalize',
                                fontSize: '1.3rem',
                                fontFamily: 'signika negative',
                            }}
                        >
                            Search User
                        </Button>
                    </Tooltip>
                </div>

                {/* Heading of navbar section */}
                <div className="heading_box flex items-center justify-center ">
                    <h1 className="heading text-2xl font-signika font-semibold opacity-80 ">Your-Chat-App</h1>
                </div>

                {/* Edit profile and notification section */}
                <div className="profile_and_message flex gap-5">
                    {/* This is the section of notification */}
                    <div className="notification_icon">
                        <CircleNotificationsIcon style={{ fontSize: '1.8rem', cursor: 'pointer' }} />
                    </div>

                    {/* This section includes show profile button */}
                    <div className="show_profile_button flex items-center   ">

                        <div className="show_profile flex cursor-pointer ">
                            <img className='w-8 h-8 rounded-full border-[1px] border-gray-800' src={(user?user.pic:"")} alt={user?user.name:""} srcSet="" />

                            <div className="down_arrow">
                                <KeyboardArrowDownIcon onClick={openProfileModal} />
                                {/* Render the profile modal when it's open */}
                                {isProfileModalOpen && <ProfileModal isOpen={isProfileModalOpen} onClose={closeProfileModal} />}
                            </div>
                        </div>
                    </div>
                </div>

            </nav>
        </>
    );
}

export default Navbar;
