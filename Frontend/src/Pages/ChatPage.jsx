import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { previousTempMessages } from './tempMessage';
import Navbar from '../components/Miscellaneous/Navbar';
import '../CSS/style.css';
import MyChats from '../components/Miscellaneous/MyChats';
import ChatBox from '../components/Miscellaneous/ChatBox';

const ChatPage = () => {

    // chat show or not
    const [showChat, setShowChat] = useState(false);

    // always open keyboard for typing
    const inputRef = useRef(null);

    // Using state to set innerWidth of Windows
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // state which input typed by user
    const [messageInput, setMessageInput] = useState("");

    const messagesContainerRef = useRef(null); // Create a ref for the messages container



    // store all messages of user
    const tempMessages = [
        ...previousTempMessages,

        {
            date: new Date().toLocaleDateString(),
            messages: [
                {
                    sender: 'user',
                    message: 'Hii Bro Good Morning!',
                    time: '1'
                },
                {
                    sender: 'friend',
                    message: 'Hii Bro Good Morning!',
                    time: '2'
                },
                {
                    sender: 'user',
                    message: 'What are you doing!',
                    time: '3'
                },
                {
                    sender: 'friend',
                    message: 'I am making backend api from whole night!',
                    time: '4'
                },
            ]
        }
    ]

    // all chat messages stored here
    const [chatMessages, setChatMessages] = useState(tempMessages);


    useEffect(() => {
        // Use useEffect to scroll to the bottom when chatMessages change and showChat is true
        if (messagesContainerRef.current && showChat) {
            // Scroll to the bottom of the messages container
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            console.log(windowWidth); // Log the updated windowWidth value
        };

        // Add an event listener to listen for window resize
        window.addEventListener("resize", handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [chatMessages, showChat, windowWidth]); // Include chatMessages and showChat as dependencies


    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            // Scroll to the bottom of the messages container
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };




    // Send message to friend
    const sendMessage = () => {
        if (messageInput.trim() === "") {
            toast.warn("Please Enter input!");
            return; // Exit early if input is empty
        }

        const currentMessage = {
            sender: 'user',
            message: messageInput,
            time: new Date().toISOString(), // Use a unique timestamp
        }

        const currDate = new Date().toLocaleDateString();
        const todayMessageIndex = chatMessages.findIndex(message => message.date === currDate);

        if (todayMessageIndex !== -1) {
            // Create a copy of chatMessages to update the state
            const updatedChatMessages = [...chatMessages];
            updatedChatMessages[todayMessageIndex].messages.push(currentMessage);

            // Update the state to trigger a re-render
            setChatMessages(updatedChatMessages);
        }

        // Clear the message input after sending
        setMessageInput(' ');
        inputRef.current.focus();
    }

    return (
        <>
            <Navbar />
            <div className="communication_message_container font-signika flex items-center justify-center w-full min-h-full ">
                {/* not show when showing chatsContent */}
                {
                    !showChat && (
                        <>
                            <MyChats windowWidth={windowWidth} setShowChat={setShowChat} scrollToBottom={scrollToBottom} />
                        </>
                    )
                }

                {/* mesage person and all messages */}
                {
                    ((windowWidth >= 821) || (windowWidth <= 821 && showChat)) &&
                    <ChatBox
                        messagesContainerRef={messagesContainerRef}
                        sendMessage={sendMessage}
                        chatMessages={chatMessages}
                        messageInput={messageInput}
                        setMessageInput={setMessageInput}
                        inputRef={inputRef}

                    />
                }
            </div>

            <ToastContainer />


        </>
    )
}

export default ChatPage

