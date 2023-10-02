import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ChatMessages from './ChatMessages';
import ScrollableChat from './ScrollableChat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { getSender, getSenderImage } from '../../config/ChatLogics';
import PreviewIcon from '@mui/icons-material/Preview';
import UpdateGroupChatModal from '../Modals/UpdateGroupChatModal';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { host } from '../../config/api';


import io from 'socket.io-client'
const ENDPOINT = host;
var socket, selectedChatCompare;

const SingleChat = (props) => {

    const { messagesContainerRef,
        // sendMessage, 
        inputRef,
        chatMessages, messageInput, setMessageInput,
        fetchAgain, setFetchAgain,
        setShowChat, showChat
    } = props;

    // State for socket
    const [socketConnected, setSocketConnected] = useState(false);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState([]);

    // Showing group profiles
    const [showProfile, setShowProfile] = useState(false);


    const { user, selectedChat, setSelectedChat } = ChatState();



    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            setLoading(true);
            const { data } = await axios.get(`${host}/api/message/${selectedChat._id}`, config);
            setMessages(data);
            setLoading(false);

            // socket connection
            socket.emit('join chat', selectedChat._id);

            console.log(messages);
        }
        catch (error) {
            toast.error("Error during fetching message");
        }
    }

    // send message
    const sendMessage = async (e) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
            };
            setNewMessage("");

            const { data } = await axios.post(`${host}/api/message`, {
                content: newMessage,
                chatId: selectedChat // change
            }, config);

            // socket
            socket.emit('new message', data);
            // apend messages
            setMessages([...messages, data]); // changed
            fetchMessages();
        }
        catch (error) {
            toast.error("Error during sending messages");

        }

    }



    // For established socket connection
    useEffect(() => {
        socket = io(ENDPOINT);

        if (user) {
            socket.emit("setup", user);
            socket.on('connection', () => setSocketConnected(true));
        } else {
            // Handle the case where the user is not loaded
            console.log("User is not loaded, unable to emit 'setup' event.");
        }
        fetchMessages();
    }, []);

    // main useEffect
    useEffect(() => {
        fetchMessages();

        // socket 
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    // socket 
    useEffect(() => {
        socket.on('message received', (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                fetchMessages();
                // give notification
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        })

    }, [messages]);

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
        // typing indicator logic
    }

    // if clcked to enter then go send
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage(e);
        }
    }

    // Close group info popup
    const closeGroupPopup = () => {
        setShowProfile(!showProfile);
    }

    return (
        <>
            {
                selectedChat ? (
                    <>

                        {/* receiver details */}
                        <div className="receiver_box flex items-center justify-between text-white h-14 bg-slate-400 py-2 ">
                            <div className="flex justify-between items-center px-5 gap-4" >
                                <ArrowCircleLeftIcon
                                    onClick={() => {
                                        setShowChat(false);
                                        setSelectedChat("")
                                    }}
                                    className='text-slate-100'
                                    style={{ fontSize: '3rem', color: '#f2f2f2', cursor: 'pointer' }} />
                                {
                                    !selectedChat.isGroupChat ? (
                                        <>
                                            <div className="receiver_details flex items-center gap-2  px-3">
                                                <img className='h-11 w-11 rounded-full cursor-pointer' src={getSenderImage(user, selectedChat.users)} alt="" srcSet="" />
                                                <div className="person_online flex flex-col justify-center ">
                                                    <h3 className="text-lg" >{getSender(user, selectedChat.users)}</h3>
                                                    <h5 className='text-sm' >Online</h5>
                                                </div>
                                            </div>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <div className="receiver_details flex items-center gap-2  px-3">
                                                    <img className='h-11 w-11 rounded-full cursor-pointer' src={getSenderImage(user, selectedChat.users)} alt="" srcSet="" />
                                                    <div className="person_online flex flex-col justify-center ">
                                                        <h3 className='text-2xl uppercase font-bree' >{selectedChat.chatName}</h3>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                }

                            </div>
                            {
                                selectedChat.isGroupChat &&
                                <PreviewIcon
                                    onClick={() => setShowProfile(true)}
                                    className="cursor-pointer custom-transition mr-6 rounded-full text-slate-100" style={{ fontSize: '2.6rem' }} />
                            }
                        </div>
                        {/* messages adn send message box */}
                        <div className='overflow-y-auto bg-slate-600 px-2 flex text-gray-200 opacity-90 h-full flex-col justify-center gap-2' >

                            <div ref={messagesContainerRef} className="messagesb_box_container bg-red-500 px-2 pr-5 overflow-x-auto min-h-[79vh] max-h-[80vh]">
                                {
                                    loading ? (
                                        <div className='relative h-[80vh] flex justify-center items-center'>
                                            <CircularProgress color="inherit" size={64} />
                                        </div>
                                    ) : (
                                        <>
                                            {/* <ChatMessages chatMessages={messages} /> */}
                                            <ScrollableChat chatMessages={messages} />
                                        </>
                                    )
                                }

                            </div>

                            <div className="send_message_container flex justify-between h-fit pr-5 items-center gap-2 ">
                                <input
                                    ref={inputRef}
                                    onKeyDown={handleKeyDown}
                                    value={newMessage}
                                    onChange={typingHandler}
                                    className='w-full bg-slate-700 border-gray-500 px-2 py-2 border-[1px] rounded-xl  focus:outline-none placeholder:text-gray-200' type="text" name="" id="input_message " placeholder=' Enter Message' />
                                {/* when enter then go send message */}

                                <SendIcon
                                    onClick={sendMessage}
                                    style={{ fontSize: '2.1rem' }} className='text-white bg-green-600 p-1 rounded-full hover:text-slate-100 custom-transition cursor-pointer ' />
                            </div>
                        </div>

                    </>
                ) : (
                    <>
                        <div className="flex pt-96 justify-center items-center " >
                            <h1 className="text-white text-3xl font-overpass text-">Click user to start Chat</h1>
                        </div>
                    </>
                )
            }



            {/* Show group info when clicked */}
            {
                showProfile && <UpdateGroupChatModal
                    onClose={closeGroupPopup}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                />
            }


            <ToastContainer />
        </>
    )
}

export default SingleChat
