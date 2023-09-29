import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../Miscellaneous/UserListItem';
import UserLoadStack from './UserLoadStack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Badge } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function CreateGroupChat({ setShowCreateGroup }) {

    // MAKing groupchat
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);


    const { user, chats, setChats } = ChatState();

    // search name when add user s in group
    const handleSearch = async (event) => {
        const query = event.target.value;
        console.log(search);
        setSearch(query);

        if (query === '') {
            setSearchResult([]);
            toast.warn("Enter username");
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            // getting data from api of search
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setLoading(false);
            console.log(data);
            setSearchResult(data);

        }
        catch (error) {
            toast.error("Failed to load users");
        }

    }

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUser) {
            toast.warn("Fill Inputs");
            return;
        }
        if (selectedUser.length < 2) {
            toast.warn("At least 2 member required");
            return;
        }
        try {
            console.log(selectedUser.length);

            const config = {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }

            const { data } = await axios.post('/api/chat/group', {
                name: groupChatName,
                users: JSON.stringify(selectedUser.map((u) => u._id)), //give with return array IMP
            }, config);

            // set chats
            setChats([data, ...chats])
            setShowCreateGroup(false);
            toast.success("Group Created!");
        }
        catch (error) {

        }
    }

    const handleGroup = (userToAdd) => {
        if (selectedUser.includes(userToAdd)) {
            toast.warn("User already added");
            return;
        }

        // set in selectedUser
        setSelectedUser([...selectedUser, userToAdd]);

    }


    const handleClose = () => {
        setShowCreateGroup(false);
    };

    return (
        <div>
            <Dialog open={true} onClose={handleClose} >
                <DialogTitle>Create Group Chat</DialogTitle>
                <DialogContent>
                    {/* <div className="change_chat_name flex justify-center items-center w-full"> */}

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Chat Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        autoComplete='off'
                        onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    {/* <Button className="bg-green-600 p-2" >Update</Button>
                    </div> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Add User in Group"
                        type="text"
                        fullWidth
                        variant="standard"
                        autoComplete='off'
                        onChange={handleSearch}
                    />

                    {/* Redner search user */}
                    {/* when not shows user then show that skeleton */}
                    <div className="cards_search_user flex items-center justify-center flex-col mt-2 gap-2">
                        <div className="choosed_ flex justify-center items-center gap-1">

                            {
                                selectedUser.map((user) => {
                                    return (
                                        <div className="flex justify-center bg-slate-500 gap-1 rounded-md items-center h-5">
                                            <div className='pl-1 text-gray-100' >{user.name.split(" ")[0]}</div>
                                            <CloseIcon
                                                onClick={
                                                    () => {

                                                        const filteredUser = selectedUser.filter((element) => {
                                                            return element.name !== user.name;
                                                        });
                                                        setSelectedUser(filteredUser)
                                                    }
                                                }
                                                className=' custom-transition' style={{ height: '1.2rem', width: '1.2rem' }}

                                            />
                                        </div>
                                    )
                                })
                            }

                        </div>
                        {
                            loading ?
                                (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <CircularProgress color="inherit" size={28} />
                                    </Box>
                                )
                                :
                                // show only start 4 user 
                                searchResult?.slice(0, 4).map((user) => {
                                    return (
                                        <>
                                            <UserListItem
                                                key={user._id}
                                                user={user}
                                                handleFunction={() => handleGroup(user)}
                                            />
                                        </>
                                    )
                                })
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button> */}
                    <Button onClick={handleSubmit} variant="contained" >Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
