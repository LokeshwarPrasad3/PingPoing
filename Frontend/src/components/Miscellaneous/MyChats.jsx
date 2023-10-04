import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { ChatState } from '../../Context/ChatProvider';
// we need component and css 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { getSender, getSenderEmail, getSenderImage } from '../../config/ChatLogics';
import UserLoadStack from '../Modals/UserLoadStack';
import CreateGroupChat from '../Modals/CreateGroupChat'
import { host } from '../../config/api';


const MyChats = ({ windowWidth, setShowChat, showChat, scrollToBottom, fetchAgain }) => {

    // making state to stored loggedUser details
    const [loggedUser, setLoggedUser] = useState();

    // getting details from contextAPI
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

    // show hide group making modal
    const [showCreateGroup, setShowCreateGroup] = useState(false);

    // fetching all the chats
    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`${host}/api/chat`, config);
            setChats(data);
            console.log(data);
        }
        catch (error) {
            toast.warn("Failed to load the chats");
            return;
        }
    }

    useEffect(() => {
        // getting loggedUser data from localstorage
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        console.log(chats);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAgain]); // need chats, fetchChats dependencies


    return (
        <>

            {/* contact message list  */}
            <div className={`all_person_list font-overpass ${showChat ? 'hidden' : 'flex'} flex-col w-full min-h-[90vh] min-w-[25rem] max-w-[50rem] px-3 gap-1 border-[1px] border-blue-900 rounded-md `}>
                <div className="heading_section flex items-center justify-between pt-5 px-9">
                    <h2 className="text-xl font-bold font-signika text-white">My Chats</h2>

                    <div className="close_button flex items-center justify-around gap-1 px-2 py-1 cursor-pointer bg-gray-300 rounded ">
                        <h2 className="font-signika "
                            onClick={() => setShowCreateGroup(true)}
                        >New Group Chat</h2>
                        <AddIcon
                        />
                    </div>
                </div>

                {/* three filters connect group */}
                <div className="person_filters flex justify-center gap-3 items-center py-2 h-16">
                    <button className='fav_button' >All</button>
                    <button className='fav_button' >Friends</button>
                    <button className='fav_button' >Groups</button>
                </div>

                {/* list of persons */}
                <div
                    className="person_list flex flex-col gap-2 px-1 font-overpass justify-center items-center py-1 rounded h-full ">

                    {/* render chat particular users */}
                    {
                        chats ? (
                            chats.map((chat, index) => {

                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            if (windowWidth <= 821) {
                                                scrollToBottom();
                                                setShowChat(true);
                                            }
                                            setSelectedChat(chat);
                                        }}
                                        className="person_details cursor-pointer w-full text-gray-100 hover:text-slate-100 gap-3 rounded hover:bg-slate-500 flex custom-transition h-14 bg-slate-400 px-5 items-center"
                                        style={{
                                            backgroundColor: selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                                            color: selectedChat === chat ? "white" : "black",
                                        }}
                                    >
                                        {/* image of chatlist user */}
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={chat.isGroupChat ? "./Images/default_group.png" : getSenderImage(loggedUser, chat.users)}
                                            alt="lokeshwar"
                                        />
                                        <div className="person_box flex flex-col py-1">
                                            <h3 className="user_name text-sm font-500">{chat.isGroupChat?chat.chatName:getSender(user,chat.users)}</h3>
                                            <h4 className="user_email user-select-none text-[13px]">
                                                <span className="font-300">{chat.isGroupChat ? "" : 'Email : '}</span>{chat.isGroupChat ? "": getSenderEmail(user, chat.users)}
                                            </h4>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            // display loading stack 
                            <UserLoadStack />
                        )
                    }
                </div>
            </div>
            {
                // create group popup
                showCreateGroup && <CreateGroupChat setShowCreateGroup={setShowCreateGroup} />
            }
            
            <ToastContainer />
        </>
    )
}

export default MyChats



