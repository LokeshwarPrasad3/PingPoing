import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SlideDrawer from './SlideDrawer';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from '../Modals/ProfileModal'; // Use uppercase 'P' in the import
import { getSender } from '../../config/ChatLogics';
import Badge from '@mui/material/Badge';

const Navbar = ({ setShowChat, windowWidth, hideNavbar }) => {

    // eslint-disable-next-line
    const [getUser, setGetUser] = useState({});

    // Populate showSlideDrawer when clicked
    const [showSlideDrawer, setShowSlideDrawer] = useState(false);

    // Show hide notification
    const [showNotification, setShowNotification] = useState(false);

    const closePopup = () => {
        console.log("close method called");
        setShowSlideDrawer(false);
    }

    // Import user from context API
    const { user, notification, setNotification, setSelectedChat } = ChatState();
    // console.log(user.pic);


    // Show profile react component
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const openProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    const closeProfileModal = () => {
        setIsProfileModalOpen(false);
    };


    useEffect(() => {
        
        setGetUser(user);
        

    }, [user, getUser])

    return (
        <>
            {/* If true then show */}
            {showSlideDrawer && <SlideDrawer onClose={closePopup} />}


            {/* This is the container of the whole navbar */}
            <nav className={`h-[65px] navbar_container ${hideNavbar?'hidden':'flex'} items-center justify-between px-5 py-2 bg-slate-200`}>
                {/* Search box inside the navbar */}
                <div className="search_box flex items-center justify-around cursor-pointer ">
                    <SearchIcon style={{ fontSize: '1.2rem' }} />
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
                                fontSize: '1rem',
                                fontFamily: 'signika negative',
                            }}
                        >
                            Search User
                        </Button>
                    </Tooltip>
                </div>

                {/* Heading of navbar section */}
                <div className="heading_box flex items-center justify-center ">
                    <h1 className="heading text-xl font-signika font-semibold opacity-80 ">Chat-App</h1>
                </div>

                {/* Edit profile and notification section */}
                <div className="profile_and_message flex gap-2">

                    {/* show notificaiton when clicked */}

                    <div className="show_notifications absolute top-12 right-[8vw] border-[1px] bg-blue-200 rounded-md flex flex-col gap-[2px] justify-center items-start overflow-hidden max-w-[20rem]">

                        

                    {
                        showNotification && (
                            (!notification.length > 0) ? (
                                <div className="box_notification w-full font-overpass bg-blue-300 cursor-pointer shadow-sm shadow-gray-400 px-2 h-8 flex items-center">
                                    <h1 className='text-black'>No New Notification</h1>
                                </div>
                            ) : (
                                notification.map((notif) => {
                                    return (
                                        <React.Fragment key={notif._id}>
                                            <div
                                                onClick={() => {
                                                    setSelectedChat(notif.chat);

                                                    // Filter out the clicked notification and related notifications based on chat ObjectId.
                                                    const updatedNotifications = notification.filter(
                                                        (n) => n.chat._id !== notif.chat._id
                                                    );

                                                    // Update the state to reflect the changes.
                                                    setNotification(updatedNotifications);
                                                    setShowNotification(false);
                                                    if(windowWidth<=821){ setShowChat(true);  }
                                                }}
                                                className="box_notification bg-blue-300 cursor-pointer hover:bg-blue-400 custom-transition w-full font-overpass shadow-sm shadow-gray-400 px-2 h-8 flex items-center"
                                            >
                                                <h1 className='text-black'>
                                                    {
                                                        notif.chat.isGroupChat ?
                                                            `New Message in ${(notif.chat.chatName)}`
                                                            : `New Message from ${getSender(user, notif.chat.users).substring(0, 15)}..`
                                                    }
                                                </h1>
                                            </div>
                                        </React.Fragment>
                                    );
                                })
                            )
                        )
                    }

                    </div>


                    {/* This is the section of notification */}
                    <div className="notification_icon">
                        <Badge
                            badgeContent={
                                (notification.length)
                            }
                            color="success">
                            <CircleNotificationsIcon
                                color="action"
                                onClick={() => setShowNotification(!showNotification)}
                                style={{ fontSize: '2rem', cursor: 'pointer' }} />
                        </Badge>
                    </div>

                    {/* This section includes show profile button */}
                    <div className="show_profile_button flex items-center   ">

                        <div className="show_profile flex cursor-pointer ">
                            <img className='w-8 h-8 rounded-full border-[1px] border-gray-800' src={getUser ? getUser.pic : ""} alt={getUser?getUser.name:""} srcSet="" />

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
