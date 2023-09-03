import React from 'react'

// import ChatState which get context API
import { ChatState } from '../Context/ChatProvider';
import Navbar from '../components/Miscellaneous/Navbar';
import MyChats from '../components/Miscellaneous/MyChats';
import ChatBox from '../components/Miscellaneous/ChatBox';

const ChatPage = () => {
    // Get (ChatState) method which is return Context
    const { user } = ChatState(); // desctruture user
    console.log("IN the chatPage : " + user);


    return (
        <>

            {/* {user && <sideDrawer/>} */}

            {/* user && <MyChat/> */}
            {/* user && <ChatBox/> */}


            <Navbar />
            {/* <div className="full_window flex items-center px-1 w-full " > */}
            <div className="full_window flex min-h-screen items-center px-1 w-full " style={{ minHeight: 'calc(100vh - 65px)' }}>
                <MyChats />
                <ChatBox />
            </div>
        </>
    )
}

export default ChatPage
