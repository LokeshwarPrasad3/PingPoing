// AlertDialog.jsx
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { ChatState } from '../../Context/ChatProvider';

function AlertDialog({ isOpen, onClose, user }) {


    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ position: 'absolute', top: '-40vh' }} // Add margin from the top
            >
                <DialogTitle id="alert-dialog-title"
                    style={{ fontSize: '200%', textAlign: 'center', fontFamily: 'signika negative', fontWeight: 'bold' }}
                >
                    {user.name}
                </DialogTitle>
                <DialogContent
                    style={{ display: 'flex', gap:'1rem', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                    <img
                        src={user.pic} // Replace with the actual path to your image
                        alt={user.name}
                        style={{ width: '160px', height: '160px', borderRadius: '100px' }} // Adjust the width as needed
                    />
                    <DialogContentText id="alert-dialog-description"
                        style={{ fontSize: '200%', textAlign: 'center', fontFamily: 'signika negative' }}
                    >
                        {user.email}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={onClose}>Disagree</Button> */}
                    <Button onClick={onClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;
