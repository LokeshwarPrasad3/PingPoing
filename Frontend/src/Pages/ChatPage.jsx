import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Miscellaneous/Navbar';
import '../CSS/style.css';
import MyChats from '../components/Miscellaneous/MyChats';
import ChatBox from '../components/Miscellaneous/ChatBox';
import { ChatState } from '../Context/ChatProvider';

const ChatPage = () => {
    // Getting from context api
    const { user } = ChatState();

    const [fetchAgain, setFetchAgain] = useState(false);

    // chat show or not
    const [showChat, setShowChat] = useState(false);

    // Using state to set innerWidth of Windows
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const messagesContainerRef = useRef(null); // Create a ref for the messages container

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
        // eslint-disable-next-line
    }, [showChat, windowWidth]);


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
                {/* handle when mobile then clicked to chat then show chatBox */}
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
        </>
    )
}

export default ChatPage

