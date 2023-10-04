import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../components/Miscellaneous/Navbar';
import '../CSS/style.css';
import MyChats from '../components/Miscellaneous/MyChats';
import ChatBox from '../components/Miscellaneous/ChatBox';
import { ChatState } from '../Context/ChatProvider';

const ChatPage = () => {
    const { user } = ChatState();

    const [fetchAgain, setFetchAgain] = useState(false);

    // chat show or not
    const [showChat, setShowChat] = useState(false);

    // always open keyboard for typing
    const inputRef = useRef(null);

    // Using state to set innerWidth of Windows
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // state which input typed by user
    const [messageInput, setMessageInput] = useState("");

    const messagesContainerRef = useRef(null); // Create a ref for the messages container

    // all chat messages stored here
    // const [chatMessages, setChatMessages] = useState(tempMessages);

    const scrollToBottom = () => {
        if (messagesContainerRef.current && showChat) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
       

        scrollToBottom(); // Initial scroll to the bottom when chat loads

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            scrollToBottom(); // Scroll to the bottom on window resize
        };

        // Add an event listener to listen for window resize
        window.addEventListener("resize", handleResize);

        // Scroll to the bottom whenever chatMessages change
        scrollToBottom();

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [showChat, windowWidth]);




    // Send message to friend
    // const sendMessage = () => {
    //     if (messageInput.trim() === "") {
    //         toast.warn("Please Enter input!");
    //         return; // Exit early if input is empty
    //     }

    //     const currentMessage = {
    //         sender: 'user',
    //         message: messageInput,
    //         time: new Date().toISOString(), // Use a unique timestamp
    //     }

    //     const currDate = new Date().toLocaleDateString();
    //     const todayMessageIndex = chatMessages.findIndex(message => message.date === currDate);

    //     if (todayMessageIndex !== -1) {
    //         // Create a copy of chatMessages to update the state
    //         // const updatedChatMessages = [...chatMessages];
    //         // updatedChatMessages[todayMessageIndex].messages.push(currentMessage);

    //         // Update the state to trigger a re-render
    //         setChatMessages(updatedChatMessages);
    //     }

    //     // Clear the message input after sending
    //     setMessageInput(' ');
    //     inputRef.current.focus();
    // }

    return (
        <>
            <Navbar />
            <div className="communication_message_container font-signika flex items-center justify-center w-full min-h-full ">
                {/* not show when showing chatsContent */}
                {
                    user ? user && (
                        <>
                            <MyChats windowWidth={windowWidth} setShowChat={setShowChat} showChat={showChat} 
                            scrollToBottom={scrollToBottom} 
                            fetchAgain={fetchAgain} />
                        </>
                    ) : ""
                }

                {/* mesage person and all messages */}
                {
                    ((windowWidth >= 821) || (windowWidth <= 821 && showChat)) &&
                    <ChatBox

                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}

                        setShowChat={setShowChat}
                        showChat={showChat}
                    />
                }
            </div>

            <ToastContainer />


        </>
    )
}

export default ChatPage

