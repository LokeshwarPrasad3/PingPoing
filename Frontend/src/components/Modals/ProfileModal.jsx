import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AlertDialog from './AlertDialog';



function ProfileModal({ isOpen, onClose }) {
    // Define the anchor element for the menu
    const anchorEl = isOpen ? document.body : null;


    // for when clicked in profile modal menuItem
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };


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
                <MenuItem onClick={onClose}>Logout</MenuItem>
            </Menu>

            <AlertDialog isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}

export default ProfileModal;
