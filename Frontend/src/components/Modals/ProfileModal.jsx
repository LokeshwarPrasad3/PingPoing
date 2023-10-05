import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AlertDialog from './AlertDialog';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';




function ProfileModal({ isOpen, onClose }) {

    const {user} = ChatState();

    // to use navigation
    const navigate = useNavigate();

    // Define the anchor element for the menu
    const anchorEl = isOpen ? document.body : null;


    // for when clicked in profile modal menuItem
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    // when clicked to MyProfile modal menuIcon then open alert Modal
    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };
    
    // when clicked to logout then remove user and goto login page
    const handleLogout= () =>{
        localStorage.removeItem("userInfo");
        onClose();
        navigate("/auth");
    }


        // when clicked to MyProfile modal menuIcon then Show Profile details Modal
    const handleProfileShow = () =>{
        openModal();
    }

    return (
        <>

            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                style={{ position: 'absolute', top: '50px', left: '-20px' }} // Add margin from the top
            >
                <MenuItem onClick={handleProfileShow}>My Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            <AlertDialog isOpen={isModalOpen} user={user} onClose={closeModal} />
        </>
    );
}

export default ProfileModal;
