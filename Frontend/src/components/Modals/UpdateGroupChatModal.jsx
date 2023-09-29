import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import UserListItem from '../Miscellaneous/UserListItem';

export default function UpdateGroupChatModal(props) {
    const { onClose, fetchAgain, setFetchAgain } = props;

    // Getting from contextAPI
    const { selectedChat, setSelectedChat, user } = ChatState();
    // States
    const [groupChatName, setGroupChatName] = useState("");
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const handleRemove = () => {

    }

    // Rename the grup
    const handleGroupRename = async () => {
        if (!groupChatName) return;
        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            };
            const { data } = await axios.put('/api/chat/rename', {
                chatId: selectedChat._id,
                chatName: groupChatName,
            }, config);

            console.log(data);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        }
        catch (error) {
            console.error("Error Occurred:", error);
            toast.error("Error Occurred: Rename group");
        }

        setGroupChatName('');

    }

    // add for search user
    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        }
        catch (error) {
            toast.error("Error occured search user to add grp");
            setLoading(false);
        }
    }

    const handleAddUser = async (userToAdd) => {
        if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
            toast.warn("User already in group");
            return;
        }

        // if check admin or not
        if (selectedChat.groupAdmin._id !== user._id) {
            toast.warn("Only admin can add friend");
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.put("/api/chat/groupadd", {
                chatId: selectedChat._id,
                userId: userToAdd._id,
            }, config);
            console.log(data);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        }
        catch (error) {
            toast.error("FAilded add user");
            setLoading(false);
        }
    }

    // remove user from group
    const handleRemoveUser = async (userToRemove) => {

        // if check admin or not
        if (selectedChat.groupAdmin._id !== user._id && userToRemove._id !== user._id) {
            toast.warn("Only admin can add friend");
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.put("/api/chat/groupremove", {
                chatId: selectedChat._id,
                userId: userToRemove._id,
            }, config);
            console.log(data);

            // this is for when admin delte self or leave butotn clicked
            if (userToRemove._id === user._id) {
                onClose();
                setSelectedChat();
            }
            else {
                setSelectedChat(data);
            }

            setFetchAgain(!fetchAgain);
            setLoading(false);

        }
        catch (error) {
            toast.error("failed to remove user");
        }
    }



    return (
        <>

            <Dialog
                onClose={onClose}
                open={true}
                style={{
                    minWidth: '24rem',
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2, textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center' }} id="customized-dialog-title">
                    {selectedChat.chatName}
                </DialogTitle>
                <DialogContent dividers
                    className='flex flex-col items-center gap-3'
                >

                    <div className="flex  flex-wrap w-fit  gap-1">

                        {
                            selectedChat.users?.map((user) => {
                                return (
                                    <div
                                        key={user.name}
                                        className="flex justify-between px-2 rounded-md  items-center bg-blue-500">
                                        <div className=" text-white text-sm font-semibold h-9 flex justify-between items-center">
                                            {user.name}
                                        </div>
                                        <CloseIcon
                                            onClick={() => handleRemoveUser(user)}
                                            className="cursor-pointer text-gray-200 transition-all duration-300 hover:bg-blue-300 rounded-lg hover:scale-110 hover:text-slate-800" />
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* Can change group name */}
                    <div className="change_group_name flex items-center gap-2 min-w-[22rem] ">
                        <input
                            className='bg-gray-300 px-1 h-8 w-52 rounded text-black'
                            type="text" name="" id=""
                            placeholder=' New Group Name'
                            value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)}
                        />
                        <button
                            onClick={handleGroupRename}
                            className="update bg-green-600 hover:bg-green-700 custom-transition px-2 py-1 rounded text-gray-100 font-semibold">UPDATE</button>
                    </div>

                    {/* Add usres in the group */}
                    <div className="add_in_group min-w-[22rem]">
                        <input
                            onChange={(e) => handleSearch(e.target.value)}
                            className='bg-gray-300 px-1 h-8 w-52 rounded text-black'
                            type="text" name="" id=""
                            placeholder=' Add Person'
                        />
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
                                            handleFunction={() => handleAddUser(user)}
                                        />
                                    </>
                                )
                            })
                    }

                </DialogContent>
                <DialogActions>
                    <button
                        className='bg-red-600 hover:bg-red-500 custom-transition font-overpass mx-2 px-2 py-1 rounded text-white '
                        onClick={() => { onClose(); handleRemoveUser(user) }}
                        >
                        Leave Group
                    </button>
                </DialogActions>
            </Dialog>


            <ToastContainer />
        </>
    );
}