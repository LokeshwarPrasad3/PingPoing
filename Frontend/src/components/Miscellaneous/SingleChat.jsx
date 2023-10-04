import React, { useEffect, useState, useRef } from 'react'
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
import typingAmimation from '../../Animation/chat-animation.json';



import io from 'socket.io-client'
import Lottie from 'react-lottie';
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = (props) => {

    const {
        fetchAgain, setFetchAgain,
        setShowChat, showChat
    } = props;

    const typingTimeoutRef = useRef(null);
    const chatContainerRef = useRef(null);

    // State for socket
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    // typig indicator options 
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: typingAmimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
    }

    // Showing group profiles
    const [showProfile, setShowProfile] = useState(false);

    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();

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
            socket.emit('stop typing', selectedChat._id);
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
            // fetchMessages();
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
                socket.on('connected', () => setSocketConnected(true));
                socket.on('typing', () => setIsTyping(true));
                socket.on('stop typing', () => setIsTyping(false));
            } 
            else {
                // Handle the case where the user is not loaded
                console.log("User is not loaded, unable to emit 'setup' event.");
            }
            // eslint-disable-next-line
        }, []);
    
    
        // main useEffect
        useEffect(() => {
            fetchMessages();
    
            selectedChatCompare = selectedChat;
            // eslint-disable-next-line
        }, [selectedChat]);
    
    
        // socket 
        useEffect(() => {
            socket.on('message received', (newMessageReceived) => {
                if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                    // fetchMessages();
    
                    if (!notification.includes(newMessageReceived)) {
                        setNotification([...notification, newMessageReceived]);
                        setFetchAgain(!fetchAgain);
                    }
                } else {
                    setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
                    // fetchMessages();
    
                }
            })
    
            // Scroll to the bottom whenever messages change
            scrollToBottom();
    
        }, [messages, selectedChat]);
        // });

    // Scroll to the bottom function
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            // Scroll to the bottom of the messages container
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        // Typing indicator logic
        if (!socketConnected || !selectedChat) return;

        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        }

        // When to stop typing after 3 seconds of inactivity
        const timerLength = 2000;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            if (typing) {
                socket.emit('stop typing', selectedChat._id);
                setTyping(false);
            }
        }, timerLength);

    };


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
                                                    <img className='h-11 w-11 rounded-full cursor-pointer' src='./Images/default_group.png' alt="" srcSet="" />
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

                            <div ref={chatContainerRef} className="messagesb_box_container bg-slate-600 px-2 pr-5 overflow-x-auto min-h-[79vh] max-h-[80vh]">
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
                                {/* show typing indeicator */}
                                {
                                    isTyping ? (
                                        <Lottie
                                            options={defaultOptions}
                                            width={70}
                                        />

                                    ) : ""
                                }
                                <input
                                    onKeyDown={handleKeyDown}
                                    value={newMessage}
                                    onChange={typingHandler}
                                    className='w-full bg-slate-700 border-gray-500 px-2 py-2 border-[1px] rounded-xl  focus:outline-none placeholder:text-gray-200'
                                    type="text"
                                    name=""
                                    id="input_message"
                                    placeholder=' Enter Message'
                                />
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
