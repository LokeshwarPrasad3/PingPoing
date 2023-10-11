import React from 'react'
import SingleChat from './SingleChat';

const ChatBox = (props) => {


    const { 
        fetchAgain, setFetchAgain
        , setShowChat, showChat, windowWidth, setHideNavbar } = props;

    return (
        <>
            <div
                // className={`messages_container ${windowWidth <= 821 ? 'min-h-screen h-screen' :''} chat_container_height flex bg-slate-600  font-overpass flex-col justify-between border-r-[1px] border-t-[1px] border-b-[1px] border-blue-900 rounded-md`}>
                className={`messages_container ${windowWidth <= 821 ? '' :''} chat_container_height flex bg-slate-600  font-overpass flex-col justify-between border-r-[1px] border-t-[1px] border-b-[1px] border-blue-900 rounded-md`}>
                {/* Here all chats are displayed */}
                <SingleChat
                    {...{
                        fetchAgain,
                        setFetchAgain,
                        showChat,
                        setShowChat, 
                        setHideNavbar,
                        windowWidth
                    }}
                />

            </div>
        </>
    )
}

export default ChatBox
