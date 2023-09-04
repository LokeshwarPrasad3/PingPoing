import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { ChatState } from '../../Context/ChatProvider';
// we need component and css 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { getSender } from '../../config/ChatLogics';
// import UserLoadStack from '../Modals/UserLoadStack';

const MyChats = () => {

    // making state to stored loggedUser details
    const [loggedUser, setLoggedUser] = useState();

    // getting details from contextAPI
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();


    const fetchChats = async () => {
        // console.log(user._id)
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);
            console.log(data);
            setChats(data);
        }
        catch (error) {
            toast.warn("Failed to load the chats");
            return;
        }
    }

    useEffect(() => {
        console.log(chats);
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // need chats, fetchChats dependencies


    return (
        <>

            {/* chat section where all the chat are visible */}
            <div
                //  style={{ display: selectedChat ? 'none' : 'flex' }}
                className={`side_drawer w-[70%] bg-slate-200 min-h-screen m-2 rounded px-7 flex-col gap-4 py-5 `}>


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
                    {/* a small card */}


                    {/* if chats is there then show if not then chatLoading */}


                    {
                        chats && // if exist then only
                        (
                            chats.map((chat) => {

                                return (
                                    <>

                                        <div key={chat._id}
                                            style={{ backgroundColor: (selectedChat === chat) ? '#38B2AC' : '#E8E8E8', color: (selectedChat === chat) ? 'white' : 'black' }}
                                            onClick={() => setSelectedChat(chat)}
                                            className="user_card  flex items-center cursor-pointer py-1 rounded-md px-3 pl-4 gap-3 ">
                                            <div className="info font-signika">
                                                <h3 className="user_name text-sm font-500 ">
                                                    {!chat.isGroundChat
                                                        ? getSender(loggedUser, chat.users)
                                                        : chat.chatName
                                                    }
                                                </h3>
                                                <h4 className="user_email text-[13px] "> <span className='font-300' >Email : </span> lokeshwar@gmail.com</h4>
                                            </div>
                                        </div>
                                    </>

                                )
                            })
                        )
                    }



                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default MyChats
